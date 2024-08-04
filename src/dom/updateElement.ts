import type { ClassComponent, DOMElement, VNode } from '../types';
import { isDefined, isNull, isObject } from '../utils';
import { createElement } from './createElement';
import { updateProps } from './updateProps';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isClassComponent(type: any): type is ClassComponent {
  return typeof type.prototype?.render === 'function';
}

export function updateElement(
  container: HTMLElement,
  element: HTMLElement,
  newNode: VNode | VNode['type'],
  oldNode: VNode | VNode['type']
): DOMElement {
  console.group('updateElement');
  console.log('New node:', newNode);
  console.log('Old node:', oldNode);

  if (Object.is(newNode, oldNode)) {
    console.log('====');
    console.groupEnd();
    return element;
  }

  if (isNull(newNode) && !isNull(oldNode)) {
    console.log('isNull newNode');
    if (isObject(oldNode)) {
      removeChildren(oldNode.children);
    }
    element?.remove();
    console.groupEnd();
    return element;
  }

  if (!isNull(newNode) && isNull(oldNode)) {
    console.log('isNull oldNode');
    const newElement = createElement(newNode);
    container.append(newElement);
    console.groupEnd();
    return newElement;
  }

  if (isNull(newNode) || isNull(oldNode)) {
    console.log('isNull newNode || oldNode');
    console.groupEnd();
    return element;
  }

  if (!isDefined(container) || !isDefined(container.childNodes)) {
    console.warn('Parent element or its childNodes are undefined');
    console.groupEnd();
    return newElement;
  }

  if (typeof newNode === 'boolean') {
    console.log('isBoolean');

    if (isObject(oldNode)) {
      removeChildren(oldNode.children);
    }

    element.remove();
    console.groupEnd();
    return element;
  }

  if (typeof newNode === 'string' || typeof newNode === 'number') {
    console.log('isText');
    /* if (typeof oldNode === 'string' || typeof oldNode === 'number') {
    } else {
    } */

    if (isObject(oldNode)) {
      removeChildren(oldNode.children);
    }

    const newElement = createElement(newNode);
    container.replaceChild(newElement, element);
    console.groupEnd();
    return newElement;
  }

  if (isObject(oldNode) && newNode.type !== oldNode.type) {
    console.info('newNode.type !== oldNode.type');
    removeChildren(oldNode.children);
    if (isClassComponent(oldNode.type)) {
      if (isDefined(oldNode.component)) {
        oldNode.component.isMounted = false;
        oldNode.component.element?.remove();
        oldNode.component.unmounted();
      }
    }

    const newElement = createElement(newNode);
    container.replaceChild(newElement, element);
    console.groupEnd();
    return newElement;
  }

  if (typeof newNode.type === 'function') {
    let renderedNode: VNode;
    let newElement: HTMLElement;
    if (isClassComponent(newNode.type)) {
      console.info('isComponent');
      console.groupEnd();
      return element;
    } else {
      console.log('isFunction');
      console.log({ newNode, oldNode });
      const props = { ...newNode.props, children: newNode.children };
      renderedNode = newNode.type(props);
    }

    if (typeof oldNode.type === 'function') {
      newElement = updateElement(container, element, renderedNode);
    } else {
      newElement = createElement(renderedNode);
      container.replaceChild(newElement, element);
      removeChildren(oldNode.children);
    }

    console.groupEnd();
    return newElement;
  }

  console.info('isVNode');

  if (element instanceof HTMLElement) {
    updateProps(element, newNode?.props, oldNode?.props);
  }

  const newChildren = newNode?.children;
  const oldChildren = oldNode?.children;
  const maxLength = Math.max(newChildren?.length, oldChildren?.length);

  for (let i = 0; i < maxLength; i++) {
    const child = element.childNodes[i] ?? null;
    updateElement(element, child, newChildren[i], oldChildren[i]);
  }

  /* if (element && element.childNodes) {
    while (element.childNodes?.length > newChildren.length) {
      console.info('removeChild', element.lastChild?.textContent);
      element.removeChild(element.lastChild!);
    }
  } */

  console.groupEnd();
  return element;
}

function removeChildren(children: VNode['children']) {
  children?.forEach((child) => {
    if (isObject(child)) {
      if (isDefined(child.component)) {
        child.component.unmount();

        setTimeout(() => {
          if (isDefined(child.component)) {
            child.component.isMounted = false;
            child.component.element?.remove();
            child.component.unmounted();
          }
        }, 0);
      }
      removeChildren(child.children);
    }
  });
}
