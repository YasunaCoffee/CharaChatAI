import { splitSentence, textsToScreenplay, Screenplay } from './messages';
import { KoeiroParam } from '../constants/koeiroParam';

describe('splitSentence', () => {
  it('should split text by Japanese period (。)', () => {
    const result = splitSentence('こんにちは。元気ですか。');
    expect(result).toEqual(['こんにちは。', '元気ですか。']);
  });

  it('should split text by full-width period (．)', () => {
    const result = splitSentence('文章１．文章２．');
    expect(result).toEqual(['文章１．', '文章２．']);
  });

  it('should split text by exclamation mark (！)', () => {
    const result = splitSentence('すごい！びっくり！');
    expect(result).toEqual(['すごい！', 'びっくり！']);
  });

  it('should split text by question mark (？)', () => {
    const result = splitSentence('何ですか？どうですか？');
    expect(result).toEqual(['何ですか？', 'どうですか？']);
  });

  it('should split text by newline', () => {
    const result = splitSentence('行１\n行２\n行３');
    expect(result).toEqual(['行１\n', '行２\n', '行３']);
  });

  it('should handle mixed punctuation', () => {
    const result = splitSentence('こんにちは。元気ですか？はい！大丈夫です．');
    expect(result).toEqual(['こんにちは。', '元気ですか？', 'はい！', '大丈夫です．']);
  });

  it('should filter out empty strings', () => {
    const result = splitSentence('文章。。。');
    expect(result).toEqual(['文章。', '。', '。']);
  });

  it('should handle text without punctuation', () => {
    const result = splitSentence('こんにちは');
    expect(result).toEqual(['こんにちは']);
  });

  it('should handle empty string', () => {
    const result = splitSentence('');
    expect(result).toEqual([]);
  });

  it('should preserve punctuation in the split strings', () => {
    const result = splitSentence('文章１。文章２。');
    expect(result[0]).toBe('文章１。');
    expect(result[1]).toBe('文章２。');
  });
});

describe('textsToScreenplay', () => {
  const mockKoeiroParam: KoeiroParam = {
    speakerX: 0.5,
    speakerY: 0.5,
  };

  it('should convert simple text without emotion tags', () => {
    const texts = ['こんにちは'];
    const result = textsToScreenplay(texts, mockKoeiroParam);

    expect(result).toHaveLength(1);
    expect(result[0]).toEqual({
      expression: 'neutral',
      talk: {
        style: 'talk',
        speakerX: 0.5,
        speakerY: 0.5,
        message: 'こんにちは',
      },
    });
  });

  it('should extract and apply emotion tags', () => {
    const texts = ['[happy]嬉しいです'];
    const result = textsToScreenplay(texts, mockKoeiroParam);

    expect(result).toHaveLength(1);
    expect(result[0].expression).toBe('happy');
    expect(result[0].talk.style).toBe('happy');
    expect(result[0].talk.message).toBe('嬉しいです');
  });

  it('should remove emotion tags from message', () => {
    const texts = ['[sad]悲しいです'];
    const result = textsToScreenplay(texts, mockKoeiroParam);

    expect(result[0].talk.message).toBe('悲しいです');
    expect(result[0].talk.message).not.toContain('[sad]');
  });

  it('should persist emotion across multiple texts', () => {
    const texts = ['[happy]嬉しい', '本当に嬉しい', '[sad]でも悲しい'];
    const result = textsToScreenplay(texts, mockKoeiroParam);

    expect(result[0].expression).toBe('happy');
    expect(result[1].expression).toBe('happy'); // Persists from previous
    expect(result[2].expression).toBe('sad');
  });

  it('should handle all emotion types', () => {
    const emotions = [
      { tag: '[neutral]', expected: 'neutral' },
      { tag: '[happy]', expected: 'happy' },
      { tag: '[angry]', expected: 'angry' },
      { tag: '[sad]', expected: 'sad' },
      { tag: '[relaxed]', expected: 'relaxed' },
    ];

    for (const emotion of emotions) {
      const texts = [`${emotion.tag}テスト`];
      const result = textsToScreenplay(texts, mockKoeiroParam);
      expect(result[0].expression).toBe(emotion.expected);
    }
  });

  it('should map emotions to correct talk styles', () => {
    const tests = [
      { emotion: '[angry]', talkStyle: 'angry' },
      { emotion: '[happy]', talkStyle: 'happy' },
      { emotion: '[sad]', talkStyle: 'sad' },
      { emotion: '[neutral]', talkStyle: 'talk' },
      { emotion: '[relaxed]', talkStyle: 'talk' },
    ];

    for (const test of tests) {
      const texts = [`${test.emotion}テスト`];
      const result = textsToScreenplay(texts, mockKoeiroParam);
      expect(result[0].talk.style).toBe(test.talkStyle);
    }
  });

  it('should ignore invalid emotion tags', () => {
    const texts = ['[invalid]テスト'];
    const result = textsToScreenplay(texts, mockKoeiroParam);

    expect(result[0].expression).toBe('neutral');
    expect(result[0].talk.message).toBe('テスト');
  });

  it('should use koeiroParam for speaker coordinates', () => {
    const customParam: KoeiroParam = {
      speakerX: 0.8,
      speakerY: 0.3,
    };
    const texts = ['テスト'];
    const result = textsToScreenplay(texts, customParam);

    expect(result[0].talk.speakerX).toBe(0.8);
    expect(result[0].talk.speakerY).toBe(0.3);
  });

  it('should handle empty texts array', () => {
    const texts: string[] = [];
    const result = textsToScreenplay(texts, mockKoeiroParam);

    expect(result).toEqual([]);
  });

  it('should handle multiple emotion tags in sequence', () => {
    const texts = [
      '[neutral]普通です',
      '[happy]嬉しい',
      '[angry]怒った',
      '[sad]悲しい',
    ];
    const result = textsToScreenplay(texts, mockKoeiroParam);

    expect(result[0].expression).toBe('neutral');
    expect(result[1].expression).toBe('happy');
    expect(result[2].expression).toBe('angry');
    expect(result[3].expression).toBe('sad');
  });

  it('should handle text with emotion tag in the middle', () => {
    const texts = ['こんにちは[happy]元気です'];
    const result = textsToScreenplay(texts, mockKoeiroParam);

    expect(result[0].expression).toBe('happy');
    expect(result[0].talk.message).toBe('こんにちは元気です');
  });

  it('should default to neutral for first message without tag', () => {
    const texts = ['最初のメッセージ', '[happy]次のメッセージ'];
    const result = textsToScreenplay(texts, mockKoeiroParam);

    expect(result[0].expression).toBe('neutral');
    expect(result[1].expression).toBe('happy');
  });
});
