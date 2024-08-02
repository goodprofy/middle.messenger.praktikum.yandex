import { Component } from '../class';
import type { VNode } from '../types';
import { updateProps } from './updateProps';

const SVG_NS = 'http://www.w3.org/2000/svg';

export function createElement(vnode: VNode): HTMLElement | SVGElement | DocumentFragment | Text {
  console.group('createElement');

  if (vnode === null) {
    console.info('isNull');
    const element = document.createTextNode('');
    element._vnode = { element };
    console.groupEnd();
    return element;
  }

  const isText = typeof vnode === 'string' || typeof vnode === 'number' || typeof vnode === 'boolean';
  if (isText) {
    console.info('isText');
    const element = document.createTextNode(String(vnode));
    element._vnode = { element };
    console.groupEnd();
    return element;
  }

  if (typeof vnode.type === 'function') {
    if (vnode.type.prototype instanceof Component) {
      console.info('isComponent');
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const props = { ...vnode.props, children: vnode.children };
      const component = new (vnode.type as Function)(props);
      vnode.component = component;
      const renderedNode = component.render();
      vnode.renderedNode = renderedNode;
      const element = createElement(renderedNode);
      vnode.element = element;
      component.vnode = vnode;
      component.isMounted = true;

      setTimeout(() => {
        component.componentDidMount();
        component.parentNode = element.parentNode;
      }, 0);

      element._vnode = vnode;

      return element;
    } else {
      console.info('isFunction');
      const props = { ...vnode.props, children: vnode.children };
      const renderedNode = vnode.type(props);
      vnode.renderedNode = renderedNode;
      const element = createElement(renderedNode);
      element._vnode = vnode;
      return element;
    }
  }

  if (vnode.type === 'FRAGMENT') {
    const element = document.createDocumentFragment();
    vnode.children.forEach((child) => {
      const newChild = createElement(child);
      element.appendChild(newChild);
    });

    element._vnode = { ...vnode, element };

    console.groupEnd();
    return element;
  }

  const element =
    vnode.type === 'svg' ? document.createElementNS(SVG_NS, vnode.type) : document.createElement(vnode.type);

  updateProps(element, vnode.props);

  vnode.children?.forEach((child) => {
    const newChild = createElement(child);
    element.appendChild(newChild);
  });

  element._vnode = { ...vnode, element };

  console.groupEnd();
  return element;
}
