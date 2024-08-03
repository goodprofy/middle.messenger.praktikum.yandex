/* eslint-disable @typescript-eslint/no-explicit-any */
/// <reference types="vitest" />
/// <reference types="vite/client" />

declare namespace JSX {
  interface Element extends VNode {}

  interface IntrinsicElements extends IntrinsicElementMap {
    svg: any;
  }

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

type Props = Record<string, unknown>;
declare type FC<P = Props> = (props: P) => VNode;
declare type PropsWithChildren<P = Props> = P & { children?: VNode['children'] };
