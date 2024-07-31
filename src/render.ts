import { Component } from './class';
import type { VNode } from './types';

export function createDOMElement(vnode: VNode | undefined): HTMLElement | Text | null {
  if (!vnode) {
    return null;
  }

  if (vnode.type === 'TEXT_ELEMENT') {
    return document.createTextNode(vnode.props.nodeValue);
  }

  if (typeof vnode.type === 'function') {
    let renderedNode: VNode;
    if (vnode.type.prototype instanceof Component) {
      const component = new (vnode.type as any)(vnode.props);
      vnode.component = component;
      renderedNode = component.render();
      vnode.renderedNode = renderedNode;
      const element = createDOMElement(renderedNode);
      if (element) {
        component.vnode = { ...vnode, element };
        component.isMounted = true;
        setTimeout(() => {
          component.componentDidMount();
        }, 0);
      }
      return element;
    } else {
      renderedNode = (vnode.type as Function)({ ...vnode.props, children: vnode.children });
      vnode.renderedNode = renderedNode;
      return createDOMElement(renderedNode);
    }
  }

  const element = document.createElement(vnode.type as string);

  Object.entries(vnode.props || {}).forEach(([name, value]) => {
    if (name.startsWith('on') && name.toLowerCase() in window) {
      element.addEventListener(name.toLowerCase().substr(2), value as EventListener);
    } else if (name !== 'children') {
      if (name === 'className') {
        element.setAttribute('class', value as string);
      } else {
        element.setAttribute(name, value as string);
      }
    }
  });

  const children = vnode.props.children || vnode.children || [];
  (Array.isArray(children) ? children : [children]).forEach((child) => {
    if (typeof child === 'string' || typeof child === 'number') {
      element.appendChild(document.createTextNode(child.toString()));
    } else {
      const childElement = createDOMElement(child);
      if (childElement) {
        element.appendChild(childElement);
      }
    }
  });

  return element;
}

export function updateElement(
  parentElement: HTMLElement,
  newNode: VNode | undefined,
  oldNode: VNode | undefined,
  index: number = 0
) {
  if (!newNode && oldNode) {
    parentElement.removeChild(parentElement.childNodes[index]);
    return;
  }

  if (newNode && !oldNode) {
    parentElement.appendChild(createDOMElement(newNode));
    return;
  }

  if (!newNode || !oldNode) {
    return;
  }

  const element = parentElement.childNodes[index] as HTMLElement | Text;

  if (newNode.type !== oldNode.type) {
    parentElement.replaceChild(createDOMElement(newNode), element);
    return;
  }

  if (typeof newNode.type === 'function') {
    const component = (oldNode.component as Component) || new (newNode.type as any)(newNode.props);
    component.props = newNode.props;
    const renderedNode = component.render();
    updateElement(element as HTMLElement, renderedNode, oldNode.renderedNode);
    component.componentDidUpdate();
    newNode.component = component;
    newNode.renderedNode = renderedNode;
  } else if (newNode.type === 'TEXT_ELEMENT') {
    if (newNode.props.nodeValue !== oldNode.props.nodeValue) {
      element.nodeValue = newNode.props.nodeValue;
    }
  } else {
    updateProps(element as HTMLElement, newNode.props, oldNode.props);

    const newChildren = newNode.children || [];
    const oldChildren = oldNode.children || [];
    const maxLength = Math.max(newChildren.length, oldChildren.length);

    for (let i = 0; i < maxLength; i++) {
      updateElement(element as HTMLElement, newChildren[i], oldChildren[i], i);
    }

    while (element.childNodes.length > newChildren.length) {
      element.removeChild(element.lastChild!);
    }
  }
}

function updateProps(element: HTMLElement, newProps: Record<string, any>, oldProps: Record<string, any>) {
  const allProps = { ...oldProps, ...newProps };
  Object.keys(allProps).forEach((name) => {
    if (name.startsWith('on') && name.toLowerCase() in window) {
      const eventName = name.toLowerCase().substr(2);
      if (newProps[name] !== oldProps[name]) {
        if (oldProps[name]) {
          element.removeEventListener(eventName, oldProps[name] as EventListener);
        }
        if (newProps[name]) {
          element.addEventListener(eventName, newProps[name] as EventListener);
        }
      }
    } else if (name !== 'children') {
      if (newProps[name] !== oldProps[name]) {
        if (name === 'value' && element instanceof HTMLInputElement) {
          if (element.value !== newProps[name]) {
            element.value = newProps[name];
          }
        } else if (newProps[name]) {
          element.setAttribute(name, newProps[name] as string);
        } else {
          element.removeAttribute(name);
        }
      }
    }
  });
}

export function render(vnode: VNode, container: HTMLElement) {
  const oldVNode = container._vnode;
  if (oldVNode) {
    updateElement(container, vnode, oldVNode);
  } else {
    const element = createDOMElement(vnode);
    if (element) {
      container.appendChild(element);
    }
  }
  container._vnode = vnode;
}