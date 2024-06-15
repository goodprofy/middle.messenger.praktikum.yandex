import { clsx } from './clsx';

describe('clsx', () => {
  it('should be undefined', () => {
    expect(clsx()).toBeUndefined();
    expect(clsx(undefined, null)).toBeUndefined();
    expect(clsx(false && 'class1')).toBeUndefined();
  });

  it('should be class1', () => {
    expect(clsx('class1', 'class2')).toBe('class1 class2');
    expect(clsx(true && 'class1', 'class2')).toBe('class1 class2');
    expect(clsx('class1', 'class2', false && 'class3')).toBe('class1 class2');
    expect(clsx('class1', null, undefined, false, 'class2')).toBe('class1 class2');
  });

  it('should be class1 class3 class4', () => {
    expect(clsx({ class1: true, class2: false, class3: true }, 'class4')).toBe('class1 class3 class4');
  });
});
