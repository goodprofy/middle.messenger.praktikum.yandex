import { Component } from './class';
import type { VNode } from './types';

export function createDOMElement(vnode: VNode): HTMLElement | Text {
  if (vnode.type === 'TEXT_ELEMENT') {
    return document.createTextNode(vnode.props.nodeValue);
  }

  if (typeof vnode.type === 'function') {
    if (vnode.type.prototype instanceof Component) {
      const component = new (vnode.type as any)(vnode.props);
      vnode.component = component;
      const renderedNode = component.render();
      vnode.renderedNode = renderedNode;
      const element = createDOMElement(renderedNode);
      component.vnode = { ...vnode, element };
      component.isMounted = true;
      setTimeout(() => {
        component.componentDidMount();
      }, 0);
      return element;
    } else {
      const renderedNode = (vnode.type as Function)(vnode.props);
      vnode.renderedNode = renderedNode;
      return createDOMElement(renderedNode);
    }
  }

  const element = document.createElement(vnode.type as string);

  Object.entries(vnode.props).forEach(([name, value]) => {
    if (name.startsWith('on') && name.toLowerCase() in window) {
      element.addEventListener(name.toLowerCase().substr(2), value as EventListener);
    } else if (name !== 'children') {
      if (name === 'value' && element instanceof HTMLInputElement) {
        element.value = value as string;
      } else {
        element.setAttribute(name, value as string);
      }
    }
  });

  vnode.children.forEach((child) => {
    element.appendChild(createDOMElement(child));
  });

  return element;
}

export function updateElement(element: HTMLElement | Text, newNode: VNode | undefined, oldNode: VNode | undefined) {
  if (!newNode && oldNode) {
    element.remove();
    return;
  }

  if (newNode && !oldNode) {
    element.parentNode?.appendChild(createDOMElement(newNode));
    return;
  }

  if (!newNode || !oldNode) {
    return;
  }

  if (newNode.type !== oldNode.type) {
    while (element.firstChild) {
      element.removeChild(element.firstChild);
    }
    const newElement = createDOMElement(newNode);
    while (newElement.firstChild) {
      element.appendChild(newElement.firstChild);
    }
    updateProps(element as HTMLElement, newNode.props, oldNode.props);
    return;
  }

  if (typeof newNode.type === 'function') {
    if (newNode.type.prototype instanceof Component) {
      const component = oldNode.component as Component;
      component.props = newNode.props;
      const renderedNode = component.render();
      updateElement(element as HTMLElement, renderedNode, oldNode.renderedNode);
      component.componentDidUpdate();
    } else {
      const renderedNode = (newNode.type as Function)(newNode.props);
      updateElement(element as HTMLElement, renderedNode, oldNode.renderedNode);
    }
  } else if (newNode.type === 'TEXT_ELEMENT') {
    if (newNode.props.nodeValue !== oldNode.props.nodeValue) {
      (element as Text).nodeValue = newNode.props.nodeValue;
    }
  } else {
    updateProps(element as HTMLElement, newNode.props, oldNode.props);

    const newChildren = newNode.children || [];
    const oldChildren = oldNode.children || [];
    const maxLength = Math.max(newChildren.length, oldChildren.length);
    for (let i = 0; i < maxLength; i++) {
      if (i < newChildren.length && i < oldChildren.length) {
        updateElement((element as HTMLElement).childNodes[i] as HTMLElement | Text, newChildren[i], oldChildren[i]);
      } else if (i < newChildren.length) {
        (element as HTMLElement).appendChild(createDOMElement(newChildren[i]));
      } else {
        (element as HTMLElement).removeChild((element as HTMLElement).childNodes[i]);
      }
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
    updateElement(container.firstChild as HTMLElement | Text, vnode, oldVNode);
  } else {
    const element = createDOMElement(vnode);
    container.appendChild(element);
  }
  container._vnode = vnode;
}
