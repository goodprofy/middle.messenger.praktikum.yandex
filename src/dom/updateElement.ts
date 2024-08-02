import { Component } from '../class';
import { VNode } from '../types';
import { isDefined } from '../utils';
import { createElement } from './createElement';
import { updateProps } from './updateProps';

export function updateElement(
  parentElement: HTMLElement,
  newNode: VNode | undefined,
  oldNode: VNode | undefined,
  index: number = 0,
  vnode: VNode = undefined
): void {
  console.group('updateElement');
  console.log('Updating element at index:', index);
  console.log('New node:', newNode);
  console.log('Old node:', oldNode);

  if (!isDefined(newNode) && oldNode) {
    parentElement.removeChild(parentElement.childNodes[index]);
    console.groupEnd();
    return;
  }

  if (newNode && !isDefined(oldNode)) {
    parentElement.appendChild(createElement(newNode));
    console.groupEnd();
    return;
  }

  if (!isDefined(newNode) || !isDefined(oldNode)) {
    console.info('!newNode || !oldNode');
    console.groupEnd();
    return;
  }

  if (!parentElement || !parentElement.childNodes) {
    console.warn('Parent element or its childNodes are undefined');
    console.groupEnd();
    return;
  }

  if (index >= parentElement.childNodes.length) {
    console.warn('Index is out of bounds for childNodes');
    console.groupEnd();
    return;
  }

  const element = parentElement.childNodes[index] as HTMLElement | Text;

  if (newNode.type !== oldNode.type) {
    console.info('newNode.type !== oldNode.type');
    const newElement = createElement(newNode);
    parentElement.replaceChild(newElement, element);
    if (isDefined(vnode)) {
      vnode.element = newElement;
    }
    console.groupEnd();
    return;
  }

  const isText = typeof newNode === 'string' || typeof newNode === 'number' || typeof newNode === 'boolean';
  if (isText) {
    if (newNode !== oldNode) {
      element.nodeValue = newNode;
    }
    return;
  }

  if (typeof newNode.type === 'function') {
    let renderedNode: VNode;
    if (newNode.type.prototype instanceof Component) {
      console.info('isComponent');
      const component = (oldNode?.component as Component) || new (newNode.type as any)(newNode.props);
      component.props = newNode.props;
      renderedNode = component.render();
      newNode.component = component;
    } else {
      console.info('isFunction');
      renderedNode = (newNode.type as Function)(newNode.props);
    }
    updateElement(element, renderedNode, oldNode?.renderedNode, 0);
    newNode.renderedNode = renderedNode;
  } else {
    console.info('isVNode');
    updateProps(element, newNode.props, oldNode.props);

    const newChildren = newNode.children;
    const oldChildren = oldNode.children;
    const maxLength = Math.max(newChildren.length, oldChildren.length);

    for (let i = 0; i < maxLength; i++) {
      updateElement(element, newChildren[i], oldChildren[i], i);
    }

    if (element && element.childNodes) {
      while (element.childNodes?.length > newChildren.length) {
        console.info('removeChild', element.lastChild?.textContent);
        element.removeChild(element.lastChild!);
      }
    }
  }

  console.groupEnd();
}
