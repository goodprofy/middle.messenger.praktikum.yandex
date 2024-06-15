import { isDefined } from '../utils';

export function h(
  tag: keyof HTMLElementTagNameMap | FC<any>,
  props: { [key: string]: any },
  ...children: any[]
): HTMLElement {
  if (typeof tag === 'function') {
    const result = tag({ ...props, children });
    if (result === null) {
      throw new Error('Function component returned null.');
    }
    return result as unknown as HTMLElement;
  }

  const element = document.createElement(tag);

  Object.entries(props || {}).forEach(([key, value]) => {
    if (key.startsWith('on') && typeof value === 'function' && key.toLowerCase() in window) {
      element.addEventListener(key.toLowerCase().substring(2), props[key]);
    } else if (key === 'className' && isDefined(value)) {
      element.classList.add(...((value as string) || '').trim().split(' '));
    } else if (isDefined(value)) {
      element.setAttribute(key, value);
    }
  });

  children.forEach((child) => {
    if (typeof child === 'string') {
      element.innerText += child;
    } else if (child instanceof Node) {
      element.appendChild(child);
    } else if (Array.isArray(child)) {
      child.forEach((nestedChild) => {
        if (typeof nestedChild === 'string') {
          element.innerText += nestedChild;
        } else if (nestedChild instanceof Node) {
          element.appendChild(nestedChild);
        }
      });
    }
  });

  return element;
}
