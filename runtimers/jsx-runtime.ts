import { isDefined } from '../src/utils';

type ComponentConstructor = new (props: { [key: string]: any; children: any[] }) => {
  element: HTMLElement;
  render: () => HTMLElement;
};

export function h(
  tag: keyof HTMLElementTagNameMap | Function,
  props: { [key: string]: any; key?: string },
  ...children: any[]
): HTMLElement | null {
  if (typeof tag === 'function') {
    let result;

    const isClassComponent = tag.prototype && tag.prototype.render;

    if (isClassComponent) {
      const componentInstance = new (tag as ComponentConstructor)({ ...props, children });
      result = componentInstance.render();
      componentInstance.element = result;
    } else {
      result = tag({ ...props, children });
    }

    return result as unknown as HTMLElement;
  }

  const element = document.createElement(tag);

  Object.entries(props || {}).forEach(([key, value]) => {
    if (key === 'ref' && typeof value === 'function') {
      value(element);
    } else if (key.startsWith('on') && typeof value === 'function' && key.toLowerCase() in window) {
      if (key.toLowerCase() === 'onchange') {
        element.addEventListener('input', props[key]);
      } else {
        element.addEventListener(key.toLowerCase().substring(2), props[key]);
      }
    } else if (key === 'className' && isDefined(value)) {
      element.classList.add(...((value as string) || '').trim().split(' '));
    } else if (isDefined(value)) {
      element.setAttribute(key, value);
    }
  });

  const appendChild = (child: Node | Node[]) => {
    if (typeof child === 'string' || typeof child === 'number') {
      element.appendChild(document.createTextNode(String(child)));
    } else if (child instanceof Node) {
      element.appendChild(child);
    } else if (Array.isArray(child)) {
      child.forEach(appendChild);
    }
  };

  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }

  children.flat().forEach(appendChild);

  return element;
}

export function Fragment(props: { children: any[] }) {
  const fragment = document.createDocumentFragment();
  props.children.flat().forEach((child) => {
    if (typeof child === 'string' || typeof child === 'number') {
      fragment.appendChild(document.createTextNode(String(child)));
    } else if (child instanceof Node) {
      fragment.appendChild(child);
    }
  });
  return fragment;
}
