import { isDefined } from './isDefined';

export function clsx(...classNames: (string | undefined | null | false | Record<string, boolean>)[]) {
  const newClassNames = classNames.reduce<string[]>((acc, className) => {
    if (!isDefined(className) || className === false) {
      return acc;
    }
    if (typeof className === 'object') {
      const keys = Object.keys(className).filter((key) => className[key]);
      return [...acc, ...keys];
    }
    return [...acc, className];
  }, []);

  return newClassNames.length > 0 ? newClassNames.join(' ') : undefined;
}
