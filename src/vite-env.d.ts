/// <reference types="vite/client" />

declare namespace JSX {
  interface Element {
    tag: keyof HTMLElementTagNameMap | FunctionComponent<any>;
    props: { [key: string]: any };
    children: any[];
  }

  interface IntrinsicElements extends IntrinsicElementMap {}

  type IntrinsicElementMap = {
    [K in keyof HTMLElementTagNameMap]: {
      [k: string]: any;
    };
  };
}

declare type FC<P = {}> = FunctionComponent<P>;
declare type PropsWithChildren<P = unknown> = P & {
  children?: JSX.Element | JSX.Element[];
};

type FunctionComponent<P = {}> = {
  (props: P): JSX.Element | null;
};
