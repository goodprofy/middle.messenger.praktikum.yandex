/* eslint-disable @typescript-eslint/no-explicit-any */
/// <reference types="vitest" />
/// <reference types="vite/client" />

import type { Props, VNode } from './types';

declare global {
  interface HTMLElement {
    _vnode?: VNode;
  }

  interface SVGSVGElement {
    _vnode?: VNode;
  }
}

declare namespace JSX {
  interface Element extends VNode {}

  interface IntrinsicElements extends IntrinsicElementMap {}

  type IntrinsicElementMap = {
    [K in keyof HTMLElementTagNameMap]: {
      [k: string]: any;
    };
  };
}

declare type ChangeEvent<T> = {
  target: {
    value: T;
    valueAsNumber: T;
  };
};

declare type ComponentProps<T extends keyof JSX.IntrinsicElements | FC<any>> =
  T extends FC<infer P>
    ? P
    : T extends keyof JSX.IntrinsicElements
      ? JSX.IntrinsicElements[T]
      : Record<string, unknown>;

declare type FC<P = Props> = (props: P) => VNode | null;
declare type PropsWithChildren<P = Props> = P & { children?: VNode[] };
