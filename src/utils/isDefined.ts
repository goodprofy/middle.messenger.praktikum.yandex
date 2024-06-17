export function isDefined<T extends unknown>(value: T): value is Exclude<T, undefined | null> {
  return typeof value !== 'undefined' && value !== null;
}
