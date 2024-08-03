import { Component } from './class';

export type Props = Record<string, unknown>;
export type DOMElement = HTMLElement | SVGSVGElement | DocumentFragment | Text;
export type FunctionalComponent = FC<PropsWithChildren>;
export interface ClassComponent {
  new (props: PropsWithChildren): Component;
  prototype: Component;
}

export interface VNode {
  type: FunctionalComponent | ClassComponent | string | number | boolean | null | 'FRAGMENT';
  props: Props;
  children: VNode[];
  element?: DOMElement;
  component?: Component;
  renderedNode?: VNode;
}
