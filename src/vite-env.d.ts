/// <reference types="vite/client" />

declare namespace JSX {
  interface Element extends HTMLElement {}
  interface IntrinsicElements {
    [elemName: string]: any;
  }
}

declare type ElementNode =
  | JSX.Element
  | string
  | number
  | boolean
  | null
  | undefined;

declare type PropsWithChildren<P = unknown> = P & {
  children?: ElementNode | ElementNode[];
};

declare type FC<P = {}> = FunctionComponent<P>;

type FunctionComponent<P = {}> = {
  (props: P): JSX.Element | null;
};
