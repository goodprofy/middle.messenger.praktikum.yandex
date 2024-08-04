import type { ClassComponent, DOMElement, VNode } from '../types';
import { isDefined, isNull, isObject } from '../utils';
import { createElement } from './createElement';
import { updateProps } from './updateProps';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isClassComponent(type: any): type is ClassComponent {
  return typeof type.prototype?.render === 'function';
}

export function updateElement(
  parentNode: HTMLElement,
  newNode: VNode | VNode['type'],
  oldNode: VNode | VNode['type'],
  index: number = 0
): DOMElement | null {
  console.group('updateElement');
  console.log('Updating element at index:', index);
  console.log('New node:', newNode);
  console.log('Old node:', oldNode);

  if (Object.is(newNode, oldNode)) {
    console.log('====');
    console.groupEnd();
    return null;
  }

  if (isNull(newNode) && !isNull(oldNode)) {
    console.log('isNull newNode');
    const element = parentNode.childNodes[index];
    if (isObject(oldNode)) {
      removeChildren(oldNode.children);
    }
    element?.remove();
    console.groupEnd();
    return null;
  }

  if (!isNull(newNode) && isNull(oldNode)) {
    console.log('isNull oldNode');
    const element = createElement(newNode);
    parentNode.append(element);
    console.groupEnd();
    return element;
  }

  if (isNull(newNode) || isNull(oldNode)) {
    console.log('isNull newNode || oldNode');
    console.groupEnd();
    return null;
  }

  if (!isDefined(parentNode) || !isDefined(parentNode.childNodes)) {
    console.warn('Parent element or its childNodes are undefined');
    console.groupEnd();
    return null;
  }

  if (index >= parentNode.childNodes.length) {
    console.warn('Index is out of bounds for childNodes');
    console.groupEnd();
    return null;
  }

  const element = parentNode.childNodes[index] as HTMLElement | Text;

  if (typeof newNode === 'boolean') {
    console.log('isBoolean');

    if (isObject(oldNode)) {
      removeChildren(oldNode.children);
    }

    element.remove();
    console.groupEnd();
    return null;
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
    parentNode.replaceChild(newElement, element);
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
    parentNode.replaceChild(newElement, element);
    console.groupEnd();
    return newElement;
  }

  if (typeof newNode.type === 'function') {
    if (isClassComponent(newNode.type)) {
      console.info('isComponent');
    } else {
      console.log('isFunction');
      console.log(JSON.stringify(newNode, null, 2));
      const props = { ...newNode.props, children: newNode.children };
      const renderedNode = newNode.type(props);
      const newElement = createElement(renderedNode);
      if (isObject(oldNode)) {
        removeChildren(oldNode.children);
      }
      parentNode.replaceChild(newElement, element);
      return newElement;
    }
  }

  console.info('isVNode');

  updateProps(element, newNode.props, oldNode.props);

  const newChildren = newNode.children;
  const oldChildren = oldNode.children;
  const maxLength = Math.max(newChildren.length, oldChildren.length);

  for (let i = 0; i < maxLength; i++) {
    updateElement(element, newChildren[i], oldChildren[i], i);
  }

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
