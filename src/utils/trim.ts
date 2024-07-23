import { isDefined } from './isDefined';

export function trim(value: string, symbols?: string) {
  if (!isDefined(symbols)) {
    return value.trim();
  }

  const reg = new RegExp(`[${symbols}]`, 'gi');
  return value.replace(reg, '');
}
