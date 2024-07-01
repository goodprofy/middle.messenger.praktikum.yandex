import { useId } from './useId';

describe('useId', () => {
  it('should be id:0', () => {
    expect(useId()).toBe('id:0');
  });
  it('should be id:1', () => {
    expect(useId()).toBe('id:1');
  });
  it('should be id:3', () => {
    useId();
    expect(useId()).toBe('id:3');
  });
});
