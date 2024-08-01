import { Component } from './class';

export type Props = Record<string, unknown>;

export interface VNode {
  type: string | Function | Component;
  props: Props;
  children: VNode[];
  element?: HTMLElement | SVGElement | DocumentFragment | Text;
  component?: Component;
  renderedNode?: VNode;
}
