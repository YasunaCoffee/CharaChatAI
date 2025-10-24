import { arrayChunk } from './arrayChunk';

describe('arrayChunk', () => {
  it('should split array into chunks of specified size', () => {
    const result = arrayChunk([1, 2, 3, 4, 5, 6], 2);
    expect(result).toEqual([[1, 2], [3, 4], [5, 6]]);
  });

  it('should handle chunks of size 1', () => {
    const result = arrayChunk([1, 2, 3], 1);
    expect(result).toEqual([[1], [2], [3]]);
  });

  it('should handle chunks of size 3', () => {
    const result = arrayChunk([1, 2, 3, 4, 5, 6, 7, 8, 9], 3);
    expect(result).toEqual([[1, 2, 3], [4, 5, 6], [7, 8, 9]]);
  });

  it('should handle arrays that do not divide evenly', () => {
    const result = arrayChunk([1, 2, 3, 4, 5], 2);
    expect(result).toEqual([[1, 2], [3, 4], [5]]);
  });

  it('should handle chunk size larger than array', () => {
    const result = arrayChunk([1, 2, 3], 5);
    expect(result).toEqual([[1, 2, 3]]);
  });

  it('should handle empty array', () => {
    const result = arrayChunk([], 2);
    expect(result).toEqual([]);
  });

  it('should handle single element array', () => {
    const result = arrayChunk([1], 2);
    expect(result).toEqual([[1]]);
  });

  it('should work with strings', () => {
    const result = arrayChunk(['a', 'b', 'c', 'd', 'e', 'f'], 2);
    expect(result).toEqual([['a', 'b'], ['c', 'd'], ['e', 'f']]);
  });

  it('should work with objects', () => {
    const obj1 = { id: 1 };
    const obj2 = { id: 2 };
    const obj3 = { id: 3 };
    const obj4 = { id: 4 };
    const result = arrayChunk([obj1, obj2, obj3, obj4], 2);
    expect(result).toEqual([[obj1, obj2], [obj3, obj4]]);
  });

  it('should handle chunk size equal to array length', () => {
    const result = arrayChunk([1, 2, 3, 4], 4);
    expect(result).toEqual([[1, 2, 3, 4]]);
  });

  it('should handle large arrays', () => {
    const largeArray = Array.from({ length: 100 }, (_, i) => i);
    const result = arrayChunk(largeArray, 10);
    expect(result.length).toBe(10);
    expect(result[0]).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
    expect(result[9]).toEqual([90, 91, 92, 93, 94, 95, 96, 97, 98, 99]);
  });

  it('should work with array-like objects', () => {
    const arrayLike = { 0: 'a', 1: 'b', 2: 'c', 3: 'd', length: 4 };
    const result = arrayChunk(arrayLike, 2);
    expect(result).toEqual([['a', 'b'], ['c', 'd']]);
  });
});
