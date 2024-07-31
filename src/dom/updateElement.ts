import { VNode } from '../types';
import { createElement } from './createElement';
import { updateProps } from './updateProps';

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
    parentElement.appendChild(createElement(newNode));
    return;
  }

  if (!newNode || !oldNode) {
    return;
  }

  const element = parentElement.childNodes[index] as HTMLElement | Text;

  if (newNode.type !== oldNode.type) {
    parentElement.replaceChild(createElement(newNode), element);
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
