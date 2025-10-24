import { getChatResponse, getChatResponseStream } from './openAiChat';
import { Message } from '../messages/messages';
import { Configuration, OpenAIApi } from 'openai';

// Mock openai module
jest.mock('openai');

// Mock global fetch
global.fetch = jest.fn();

describe('getChatResponse', () => {
  const mockMessages: Message[] = [
    { role: 'user', content: 'Hello' },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    // Suppress console.log in tests
    jest.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should throw error when API key is not provided', async () => {
    await expect(getChatResponse(mockMessages, undefined)).rejects.toThrow('Invalid API Key');
  });

  it('should throw error when API key is empty string', async () => {
    await expect(getChatResponse(mockMessages, '')).rejects.toThrow('Invalid API Key');
  });

  it('should return message from OpenAI response', async () => {
    const mockApiKey = 'test-api-key';
    const mockResponse = {
      data: {
        choices: [
          {
            message: {
              content: 'Hello! How can I help you?',
            },
          },
        ],
      },
    };

    const mockCreateChatCompletion = jest.fn().mockResolvedValue(mockResponse);
    (Configuration as jest.MockedClass<typeof Configuration>).mockImplementation(() => ({
      apiKey: mockApiKey,
      baseOptions: { headers: {} },
    } as any));
    (OpenAIApi as jest.MockedClass<typeof OpenAIApi>).mockImplementation(() => ({
      createChatCompletion: mockCreateChatCompletion,
    } as any));

    const result = await getChatResponse(mockMessages, mockApiKey);

    expect(result.message).toBe('Hello! How can I help you?');
    expect(mockCreateChatCompletion).toHaveBeenCalledWith({
      model: 'gpt-3.5-turbo',
      messages: mockMessages,
    });
  });

  it('should return error message when response content is empty', async () => {
    const mockApiKey = 'test-api-key';
    const mockResponse = {
      data: {
        choices: [
          {
            message: {
              content: null,
            },
          },
        ],
      },
    };

    const mockCreateChatCompletion = jest.fn().mockResolvedValue(mockResponse);
    (Configuration as jest.MockedClass<typeof Configuration>).mockImplementation(() => ({
      apiKey: mockApiKey,
      baseOptions: { headers: {} },
    } as any));
    (OpenAIApi as jest.MockedClass<typeof OpenAIApi>).mockImplementation(() => ({
      createChatCompletion: mockCreateChatCompletion,
    } as any));

    const result = await getChatResponse(mockMessages, mockApiKey);

    expect(result.message).toBe('エラーが発生しました');
  });
});

describe('getChatResponseStream', () => {
  const mockMessages: Message[] = [
    { role: 'user', content: 'Hello' },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should throw error when API key is not provided', async () => {
    await expect(getChatResponseStream(mockMessages, '')).rejects.toThrow('Invalid API Key');
  });

  it('should throw error when response status is not 200', async () => {
    const mockApiKey = 'test-api-key';

    (global.fetch as jest.Mock).mockResolvedValue({
      status: 400,
      body: null,
    });

    await expect(getChatResponseStream(mockMessages, mockApiKey)).rejects.toThrow('Something went wrong');
  });

  it('should throw error when response body is null', async () => {
    const mockApiKey = 'test-api-key';

    (global.fetch as jest.Mock).mockResolvedValue({
      status: 200,
      body: null,
    });

    await expect(getChatResponseStream(mockMessages, mockApiKey)).rejects.toThrow('Something went wrong');
  });

  it('should create ReadableStream from successful response', async () => {
    const mockApiKey = 'test-api-key';
    const mockChunk = 'data: {"choices":[{"delta":{"content":"Hello"}}]}\n\ndata: [DONE]\n\n';

    const mockReader = {
      read: jest
        .fn()
        .mockResolvedValueOnce({
          done: false,
          value: new TextEncoder().encode(mockChunk),
        })
        .mockResolvedValueOnce({
          done: true,
        }),
      releaseLock: jest.fn(),
    };

    (global.fetch as jest.Mock).mockResolvedValue({
      status: 200,
      body: {
        getReader: () => mockReader,
      },
    });

    const stream = await getChatResponseStream(mockMessages, mockApiKey);

    expect(stream).toBeInstanceOf(ReadableStream);
    expect(global.fetch).toHaveBeenCalledWith(
      'https://api.openai.com/v1/chat/completions',
      expect.objectContaining({
        method: 'POST',
        headers: expect.objectContaining({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${mockApiKey}`,
        }),
        body: expect.stringContaining('"stream":true'),
      })
    );
  });

  it('should use gpt-3.5-turbo model with stream and max_tokens', async () => {
    const mockApiKey = 'test-api-key';
    const mockReader = {
      read: jest.fn().mockResolvedValue({ done: true }),
      releaseLock: jest.fn(),
    };

    (global.fetch as jest.Mock).mockResolvedValue({
      status: 200,
      body: {
        getReader: () => mockReader,
      },
    });

    await getChatResponseStream(mockMessages, mockApiKey);

    const fetchCall = (global.fetch as jest.Mock).mock.calls[0];
    const body = JSON.parse(fetchCall[1].body);

    expect(body.model).toBe('gpt-3.5-turbo');
    expect(body.stream).toBe(true);
    expect(body.max_tokens).toBe(200);
    expect(body.messages).toEqual(mockMessages);
  });

  it('should handle stream with multiple chunks', async () => {
    const mockApiKey = 'test-api-key';
    const chunk1 = 'data: {"choices":[{"delta":{"content":"Hello"}}]}\n\n';
    const chunk2 = 'data: {"choices":[{"delta":{"content":" World"}}]}\n\n';
    const chunk3 = 'data: [DONE]\n\n';

    const mockReader = {
      read: jest
        .fn()
        .mockResolvedValueOnce({
          done: false,
          value: new TextEncoder().encode(chunk1),
        })
        .mockResolvedValueOnce({
          done: false,
          value: new TextEncoder().encode(chunk2),
        })
        .mockResolvedValueOnce({
          done: false,
          value: new TextEncoder().encode(chunk3),
        })
        .mockResolvedValueOnce({
          done: true,
        }),
      releaseLock: jest.fn(),
    };

    (global.fetch as jest.Mock).mockResolvedValue({
      status: 200,
      body: {
        getReader: () => mockReader,
      },
    });

    const stream = await getChatResponseStream(mockMessages, mockApiKey);
    const reader = stream.getReader();

    const results: string[] = [];
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      results.push(value);
    }

    expect(results).toEqual(['Hello', ' World']);
  });
});
