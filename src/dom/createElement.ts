import type { ClassComponent, DOMElement, VNode } from '../types';
import { getChildIndex } from './getChildIndex';
import { updateChildren } from './updateChildren';
import { updateProps } from './updateProps';

const SVG_NS = 'http://www.w3.org/2000/svg';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isClassComponent(type: any): type is ClassComponent {
  return typeof type.prototype?.render === 'function';
}

export function createElement(vnode: VNode | string | number | boolean | null): DOMElement {
  console.group('createElement');

  if (vnode === null) {
    console.info('isNull');
    const element = document.createTextNode('');
    console.groupEnd();
    return element;
  } else if (typeof vnode === 'boolean') {
    console.info('isBoolean');
    const element = document.createTextNode('');
    console.groupEnd();
    return element;
  } else if (typeof vnode === 'string' || typeof vnode === 'number') {
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
    console.log('prototype', vnode.type.prototype);
    if (isClassComponent(vnode.type)) {
      console.info('isComponent');

      const props = { ...vnode.props, children: vnode.children };
      const component = new vnode.type(props);
      vnode.component = component;
      const renderedNode = component.render();
      const element = createElement(renderedNode) as HTMLElement;
      console.log(element.outerHTML);
      component.element = element;
      component.vnode = renderedNode;

      setTimeout(() => {
        if (element instanceof DocumentFragment) {
          console.log('DocumentFragment');
          component.parentNode = element.childNodes[0]?.parentNode;
        } else {
          component.parentNode = element.parentNode;
        }
        if (component.parentNode) {
          component.indexInParent = 0;
          component.isMounted = true;
          component.mounted();
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
