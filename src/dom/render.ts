import type { VNode } from '../types';
import { createElement } from './createElement';

export function render(vnode: VNode, container: HTMLElement) {
  console.info('render', { vnode });
  const element = createElement(vnode);
  container.append(element);
}
