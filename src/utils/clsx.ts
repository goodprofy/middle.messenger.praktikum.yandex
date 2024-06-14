export function clsx(...classNames: (string | undefined | null | false | { [className: string]: boolean })[]) {
  let result = '';
  for (const className of classNames) {
    if (className === undefined || className === null || className === false) {
      continue;
    }
    if (typeof className === 'object') {
      for (const key in className) {
        if (className[key]) {
          result += `${key} `;
        }
      }
    } else {
      result += `${className} `;
    }
  }
  return result.trim();
}
