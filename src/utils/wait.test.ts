import { wait } from './wait';

describe('wait', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.spyOn(global, 'setTimeout');
  });

  afterEach(() => {
    jest.useRealTimers();
    jest.restoreAllMocks();
  });

  it('should wait for the specified number of milliseconds', async () => {
    const ms = 1000;
    const promise = wait(ms);

    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), ms);

    jest.advanceTimersByTime(ms);
    await promise;
  });

  it('should work with different time values', async () => {
    const testCases = [0, 100, 500, 2000, 5000];

    for (const ms of testCases) {
      jest.clearAllMocks();
      const promise = wait(ms);
      jest.advanceTimersByTime(ms);
      await promise;
    }
  });

  it('should return a Promise', () => {
    const result = wait(100);
    expect(result).toBeInstanceOf(Promise);
  });
});
