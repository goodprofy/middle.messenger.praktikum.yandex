import { isDefined } from './isDefined';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type StringIndexed = Record<string, any>;

export function queryStringify(data: StringIndexed): string | undefined {
  if (typeof data !== 'object' || data === null) {
    return;
  }

  const result = Object.entries(data).reduce<string[]>((acc, [key, value]) => {
    if (typeof value === 'object' && value !== null) {
      if (Array.isArray(value)) {
        const newArr: string[] = [];
        value.forEach((v, idx) => {
          newArr.push(`${key}[${idx}]=${v}`);
        });
        return [...acc, ...newArr];
      }

      const newObj: string[] = [];
      for (const k in value) {
        const newValue = value[k];
        if (typeof newValue === 'object' && newValue !== null) {
          const n = queryStringify(newValue);
          if (isDefined(n)) {
            const n2 = n.split('=');
            newObj.push(`${key}[${k}][${n2[0]}]=${n2[1]}`);
          }
        } else {
          newObj.push(`${key}[${k}]=${value[k]}`);
        }
      }

      return [...acc, ...newObj];
    }

    return [...acc, `${key}=${value}`];
  }, []);

  return result.join('&');
}
