import { describe, it, expect } from 'vitest';
import { deepEqual } from './deepEqual';

describe('deepEqual', () => {
  it('should compare primitive values', () => {
    expect(deepEqual('hello', 'hello')).toBe(true);
    expect(deepEqual('Hello', 'hello')).toBe(false);
    expect(deepEqual('hello', 'world')).toBe(false);
    expect(deepEqual(true, true)).toBe(true);
    expect(deepEqual(true, false)).toBe(false);
    expect(deepEqual(1, 1)).toBe(true);
    expect(deepEqual(1, 2)).toBe(false);
    expect(deepEqual(0, '')).toBe(false);
    expect(deepEqual(-1, 1)).toBe(false);
  });

  it('should compare arrays', () => {
    expect(deepEqual([1, 2, 3], [1, 2, 3])).toBe(true);
    expect(deepEqual([1, 2, 3], [1, 2, 3, 4])).toBe(false);
    expect(deepEqual([1, 2, 3], [1, 2, 4])).toBe(false);
  });

  it('should compare nested arrays', () => {
    expect(deepEqual([1, [2, 3]], [1, [2, 3]])).toBe(true);
    expect(deepEqual([1, [2, 3]], [1, [2, 4]])).toBe(false);
    expect(deepEqual([1, [2, [3]]], [1, [2, [3]]])).toBe(true);
  });

  it('should compare objects', () => {
    expect(deepEqual({ a: 1, b: 2 }, { a: 1, b: 2 })).toBe(true);
    expect(deepEqual({ a: 1, b: 2 }, { b: 2, a: 1 })).toBe(true);
    expect(deepEqual({ a: 1, b: 2 }, { a: 1, b: 3 })).toBe(false);
    expect(deepEqual({ a: 1, b: 2 }, { a: 1, c: 2 })).toBe(false);
  });

  it('should compare nested objects', () => {
    expect(deepEqual({ a: 1, b: { c: 2 } }, { a: 1, b: { c: 2 } })).toBe(true);
    expect(deepEqual({ a: 1, b: { c: 2 } }, { a: 1, b: { c: 3 } })).toBe(false);
    expect(deepEqual({ a: { b: { c: 3 } } }, { a: { b: { c: 3 } } })).toBe(true);
  });

  it('should handle null and undefined', () => {
    expect(deepEqual(null, null)).toBe(true);
    expect(deepEqual(undefined, undefined)).toBe(true);
    expect(deepEqual(null, undefined)).toBe(false);
    expect(deepEqual({ a: null }, { a: null })).toBe(true);
    expect(deepEqual({ a: undefined }, { a: undefined })).toBe(true);
    expect(deepEqual({ a: null }, { a: undefined })).toBe(false);
  });

  it('should compare objects with different number of properties', () => {
    expect(deepEqual({ a: 1, b: 2 }, { a: 1, b: 2, c: 3 })).toBe(false);
    expect(deepEqual({ a: 1 }, { a: 1, b: undefined })).toBe(false);
  });

  it('should handle empty objects and arrays', () => {
    expect(deepEqual({}, {})).toBe(true);
    expect(deepEqual([], [])).toBe(true);
    expect(deepEqual({}, [])).toBe(false);
  });

  it('should compare objects with symbol properties', () => {
    const symbol1 = Symbol('test');
    const symbol2 = Symbol('test');
    expect(deepEqual({ [symbol1]: 1 }, { [symbol1]: 1 })).toBe(true);
    expect(deepEqual({ [symbol1]: 1 }, { [symbol2]: 1 })).toBe(false);
  });

  it('should compare objects with function properties', () => {
    const func1 = () => console.log('test');
    const func2 = () => console.log('test');
    expect(deepEqual({ a: func1 }, { a: func1 })).toBe(true);
    expect(deepEqual({ a: func1 }, { a: func2 })).toBe(false);
  });

  it('should handle circular references', () => {
    const obj1: any = { a: 1 };
    obj1.b = obj1;
    const obj2: any = { a: 1 };
    obj2.b = obj2;

    expect(() => deepEqual(obj1, obj2)).toThrow();
  });

  it('should compare Date objects', () => {
    const date1 = new Date('2023-01-01T00:00:00Z');
    const date2 = new Date('2023-01-01T00:00:00Z');
    const date3 = new Date('2023-01-02T00:00:00Z');
    const date4 = new Date('2023-01-01T00:00:00.001Z');

    expect(deepEqual(date1, date2)).toBe(true);
    expect(deepEqual(date1, date3)).toBe(false);
    expect(deepEqual(date1, date4)).toBe(false);
    expect(deepEqual(new Date(2023, 0, 1), new Date(2023, 0, 1))).toBe(true);
    expect(deepEqual(new Date(2023, 0, 1), new Date(2023, 0, 2))).toBe(false);
  });

  it('should compare RegExp objects', () => {
    expect(deepEqual(/abc/, /abc/)).toBe(true);
    expect(deepEqual(/abc/g, /abc/g)).toBe(true);
    expect(deepEqual(/abc/, /def/)).toBe(false);
    expect(deepEqual(/abc/g, /abc/i)).toBe(false);
    expect(deepEqual(/abc/gi, /abc/gi)).toBe(true);
    expect(deepEqual(new RegExp('abc'), new RegExp('abc'))).toBe(true);
    expect(deepEqual(new RegExp('abc', 'g'), new RegExp('abc', 'g'))).toBe(true);
    expect(deepEqual(new RegExp('abc', 'g'), new RegExp('abc', 'i'))).toBe(false);
  });

  it('should handle NaN values', () => {
    expect(deepEqual(NaN, NaN)).toBe(true);
    expect(deepEqual({ a: NaN }, { a: NaN })).toBe(true);
  });
});
