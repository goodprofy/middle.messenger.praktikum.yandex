export function clsx(...classNames: (string | undefined | null | false | { [className: string]: boolean })[]) {
  const newClassNames = classNames.reduce<string[]>((acc, className) => {
    if (!className) {
      return acc;
    }
    if (typeof className === 'object') {
      const classKeys = Object.keys(className).filter((key) => className[key]);
      return [...acc, ...classKeys];
    }
    return [...acc, className];
  }, []);

  return newClassNames.length ? newClassNames.join(' ') : undefined;
}
