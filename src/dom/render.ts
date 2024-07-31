import { VNode } from '../types';
import { createElement } from './createElement';
import { updateElement } from './updateElement';

export function render(vnode: VNode, container: HTMLElement) {
  const oldVNode = container._vnode;
  if (oldVNode) {
    updateElement(container, vnode, oldVNode);
  } else {
    const element = createElement(vnode);
    if (element) {
      container.appendChild(element);
    }
  }
  container._vnode = vnode;
}
