import { Component } from './class';
import { FC, PropsWithChildren } from './vite-env';

export type Props = Record<string, unknown>;
export type DOMElement = HTMLElement | SVGSVGElement | DocumentFragment | Text;
export type FunctionalComponent = FC<PropsWithChildren>;
export type ClassComponent = {
  new (props: PropsWithChildren): Component;
  prototype: Component;
};

export interface VNode {
  type: FunctionalComponent | ClassComponent | string | number | boolean | null | 'FRAGMENT'; //TODO HTMLElementTagNameMap
  props: Props;
  children: VNode[];
  element?: DOMElement;
  component?: Component;
  renderedNode?: VNode;
}
