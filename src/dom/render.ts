import { VNode } from '../types';
import { createElement } from './createElement';
import { updateElement } from './updateElement';

export function render(vnode: VNode, container: HTMLElement) {
  console.info('render', { vnode });
  const oldVNode = container._vnode;
  if (oldVNode) {
    updateElement(container, vnode, oldVNode);
  } else {
    const element = createElement(vnode);
    container.appendChild(element);
  }
  container._vnode = vnode;
}
