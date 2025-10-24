// Learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom'
import { TextEncoder, TextDecoder } from 'util'
import { ReadableStream } from 'stream/web'

// Mock Web Speech API
global.SpeechRecognition = jest.fn()
global.webkitSpeechRecognition = jest.fn()

// Mock AudioContext
global.AudioContext = jest.fn().mockImplementation(() => ({
  createAnalyser: jest.fn().mockReturnValue({
    fftSize: 2048,
    frequencyBinCount: 1024,
    getByteFrequencyData: jest.fn(),
  }),
  createMediaStreamSource: jest.fn(),
  close: jest.fn(),
}))

// Polyfill TextEncoder/TextDecoder for Node.js
global.TextEncoder = TextEncoder
global.TextDecoder = TextDecoder
global.ReadableStream = ReadableStream
