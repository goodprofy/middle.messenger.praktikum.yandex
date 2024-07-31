import { Component } from './class';

export type Props = Record<string, any>;

export interface VNode {
  type: string | Function;
  props: Props;
  children: VNode[];
  element?: HTMLElement | Text;
  component?: Component;
  renderedNode?: VNode;
}
