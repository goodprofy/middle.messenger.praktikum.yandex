import { Component } from '../class';
import type { ClassComponent, VNode } from '../types';
import { updateChildren } from './updateChildren';
import { updateProps } from './updateProps';

const SVG_NS = 'http://www.w3.org/2000/svg';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isClassComponent(type: any): type is ClassComponent {
  return type.prototype instanceof Component;
}

export function createElement(vnode: VNode): Exclude<VNode['element'], undefined> {
  console.group('createElement');

  if (vnode === null) {
    console.info('isNull');
    const element = document.createTextNode('');
    console.groupEnd();
    return element;
  } else if (['string', 'number', 'boolean'].includes(typeof vnode)) {
    console.info('isText');
    const element = document.createTextNode(String(vnode));
    console.groupEnd();
    return element;
  } else if (vnode.type === 'FRAGMENT') {
    console.info('isFragment');
    const fragment = document.createDocumentFragment();
    updateChildren(fragment, vnode.children);
    console.groupEnd();
    return fragment;
  } else if (typeof vnode.type === 'string') {
    const element =
      vnode.type === 'svg' ? document.createElementNS(SVG_NS, vnode.type) : document.createElement(vnode.type);

    updateProps(element, vnode.props);
    updateChildren(element, vnode.children);

    console.groupEnd();
    return element;
  } else if (typeof vnode.type === 'function') {
    if (isClassComponent(vnode.type)) {
      console.info('isComponent');

      const props = { ...vnode.props, children: vnode.children };
      const component = new vnode.type(props);
      vnode.component = component;
      const renderedNode = component.render();
      vnode.renderedNode = renderedNode;
      const element = createElement(renderedNode);
      vnode.element = element;
      component.vnode = vnode;
      component.isMounted = true;

      setTimeout(() => {
        component.componentDidMount();
        if (element?.parentNode) {
          component.parentNode = element.parentNode;
        }
      }, 0);

      return element;
    } else {
      console.info('isFunction');
      const props = { ...vnode.props, children: vnode.children };
      const renderedNode = vnode.type(props);
      const element = createElement(renderedNode);
      return element;
    }
  } else {
    throw new Error('vnode unsupported');
  }
}
