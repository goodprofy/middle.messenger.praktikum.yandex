import type { VNode } from '../types';
import { createElement } from './createElement';

export function updateChildren(parent: HTMLElement | SVGSVGElement | DocumentFragment, children: VNode['children']) {
  children?.forEach((child) => {
    const newChild = createElement(child);
    parent.append(newChild);
  });
}
