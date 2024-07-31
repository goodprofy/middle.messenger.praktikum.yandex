import { Component } from '../class';
import { VNode } from '../types';

export function createElement(vnode: VNode): HTMLElement | Text {
  if (vnode.type === 'TEXT_ELEMENT') {
    return document.createTextNode(vnode.props.nodeValue);
  }

  if (typeof vnode.type === 'function') {
    if (vnode.type.prototype instanceof Component) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const component = new (vnode.type as any)(vnode.props);
      vnode.component = component;
      const renderedNode = component.render();
      vnode.renderedNode = renderedNode;
      const element = createElement(renderedNode);
      component.vnode = { ...vnode, element };
      component.isMounted = true;
      setTimeout(() => {
        component.componentDidMount();
      }, 0);
      return element;
    } else {
      // eslint-disable-next-line @typescript-eslint/ban-types
      const renderedNode = (vnode.type as Function)(vnode.props);
      vnode.renderedNode = renderedNode;
      return createElement(renderedNode);
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
    element.appendChild(createElement(child));
  });

  return element;
}
