import { buildUrl } from './buildUrl';

// Mock next/config
jest.mock('next/config', () => () => ({
  publicRuntimeConfig: {
    root: '',
  },
}));

describe('buildUrl', () => {
  it('should build URL with root path from config', () => {
    const path = '/test/path';
    const result = buildUrl(path);
    expect(result).toBe('/test/path');
  });

  it('should handle paths starting with slash', () => {
    const path = '/assets/model.vrm';
    const result = buildUrl(path);
    expect(result).toBe('/assets/model.vrm');
  });

  it('should handle empty path', () => {
    const path = '';
    const result = buildUrl(path);
    expect(result).toBe('');
  });
});

describe('buildUrl with custom root', () => {
  beforeEach(() => {
    jest.resetModules();
    jest.mock('next/config', () => () => ({
      publicRuntimeConfig: {
        root: '/my-repo',
      },
    }));
  });

  afterEach(() => {
    jest.unmock('next/config');
  });

  it('should prepend root path from config', () => {
    // Re-import to get the new mock
    jest.isolateModules(() => {
      jest.mock('next/config', () => () => ({
        publicRuntimeConfig: {
          root: '/my-repo',
        },
      }));

      const { buildUrl: buildUrlWithRoot } = require('./buildUrl');
      const path = '/assets/model.vrm';
      const result = buildUrlWithRoot(path);
      expect(result).toBe('/my-repo/assets/model.vrm');
    });
  });
});
