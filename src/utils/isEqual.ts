import type { NonNullableObject } from '../types';

export function isEqual<T extends object>(lhs: NonNullableObject<T>, rhs: NonNullableObject<T>): boolean {
  if (Object.keys(lhs).length !== Object.keys(rhs).length) {
    return false;
  }

  for (const key in lhs) {
    const leftValue = lhs[key];
    const rightValue = rhs[key];
    if (leftValue !== null && rightValue !== null && typeof leftValue === 'object' && typeof rightValue === 'object') {
      if (!isEqual(leftValue, rightValue)) {
        return false;
      }
    } else if (leftValue !== rightValue) {
      return false;
    }
  }

  return true;
}
