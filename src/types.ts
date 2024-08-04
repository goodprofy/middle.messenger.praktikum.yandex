import { Component } from './class';

export type Props = Record<string, unknown>;
export type DOMElement = HTMLElement | SVGSVGElement | DocumentFragment | Text;
export type FunctionalComponent = FC<PropsWithChildren>;
export interface ClassComponent {
  new (props: PropsWithChildren): Component;
  prototype: Component;
}
type VNodeType = FunctionalComponent | ClassComponent | string | number | boolean | null | 'FRAGMENT';

export interface VNode {
  type: VNodeType;
  props: Props;
  children: VNode[];
  component?: Component;
}
