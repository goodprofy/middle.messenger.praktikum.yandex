export function deepEqual(left: unknown, right: unknown) {
  if (left === right) {
    return true;
  }

  if (left == null || right == null) {
    return false;
  }

  if (typeof left !== typeof right) {
    return false;
  }

  if (typeof left === 'number' && typeof right === 'number' && isNaN(left) && isNaN(right)) {
    return true;
  }

  if (typeof left !== 'object') {
    return left === right;
  }

  if (left instanceof Date && right instanceof Date) {
    return left.getTime() === right.getTime();
  }

  if (left instanceof RegExp && right instanceof RegExp) {
    return left.toString() === right.toString();
  }

  if (Array.isArray(left) && Array.isArray(right)) {
    if (left.length !== right.length) {
      return false;
    }
    for (let i = 0; i < left.length; i++) {
      if (!deepEqual(left[i], right[i])) {
        return false;
      }
    }
    return true;
  }

  const keys1 = Reflect.ownKeys(left);
  const keys2 = Reflect.ownKeys(right);

  if (keys1.length !== keys2.length) {
    return false;
  }

  for (const key of keys1) {
    if (!Reflect.has(right, key)) {
      return false;
    }
    if (!deepEqual(Reflect.get(left, key), Reflect.get(right, key))) {
      return false;
    }
  }

  return true;
}
