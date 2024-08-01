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
  console.info({ newNode, oldNode, index });

  if (!isDefined(newNode) && oldNode) {
    console.info('removeChild');
    parentElement.removeChild(parentElement.childNodes[index]);
    console.groupEnd();
    return;
  }

  if (newNode && !isDefined(oldNode)) {
    console.info('newNode && !oldNode');
    console.info('appendChild');
    parentElement.appendChild(createElement(newNode));
    console.groupEnd();
    return;
  }

  if (!isDefined(newNode) || !isDefined(oldNode)) {
    console.info('!newNode || !oldNode');
    console.groupEnd();
    return;
  }

  const element = parentElement.childNodes[index] as HTMLElement | Text;

  if (newNode.type !== oldNode.type) {
    console.info('newNode.type !== oldNode.type');
    const newElement = createElement(newNode) as HTMLElement;
    console.info('vnode', vnode?.element?.innerHTML);
    console.info('element', element?.innerHTML);
    console.info('newElement', newElement.innerHTML);
    console.info('parentElement old', parentElement.innerHTML);
    parentElement.replaceChild(newElement, element);
    if (isDefined(vnode)) {
      vnode.element = newElement;
    }
    console.info('parentElement new', parentElement.innerHTML);
    console.groupEnd();
    return;
  }

  const isText = typeof newNode === 'string' || typeof newNode === 'number' || typeof newNode === 'boolean';
  if (isText) {
    console.info('isText');
    console.info(newNode, oldNode);
    if (newNode !== oldNode) {
      console.info('newNode !== oldNode');
      console.info(element.textContent);
      element.nodeValue = newNode;
      console.info(element.textContent);
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

    console.log({ newNode });
    console.log({ oldNode });

    const newChildren = newNode.children;
    const oldChildren = oldNode.children;
    const maxLength = Math.max(newChildren.length, oldChildren.length);

    console.log({ newChildren });
    console.log({ oldChildren });
    console.log({ maxLength });

    for (let i = 0; i < maxLength; i++) {
      updateElement(element, newChildren[i], oldChildren[i], i);
    }

    while (element.childNodes.length > newChildren.length) {
      console.info('removeChild', element.lastChild?.textContent);
      element.removeChild(element.lastChild!);
    }
  }
  console.groupEnd();
}
