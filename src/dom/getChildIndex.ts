import { DOMElement } from '../types';

export function getChildIndex(childNodes: NodeListOf<ChildNode>, child: DOMElement) {
  return Array.from(childNodes).indexOf(child);
}
