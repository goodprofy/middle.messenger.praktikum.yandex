/// <reference types="vite/client" />

declare namespace JSX {
  interface Element {
    tag: keyof HTMLElementTagNameMap | FC<any>;
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

declare type FC<P = {}> = {
  (props: P): JSX.Element | null;
};

declare type PropsWithChildren<P = unknown> = P & {
  children?: JSX.Element | JSX.Element[];
};

declare type ChangeEvent<T> = {
  target: {
    value: T;
  };
};

declare type ComponentProps<T extends keyof JSX.IntrinsicElements | FC<any>> =
  T extends FC<infer P> ? P : T extends keyof JSX.IntrinsicElements ? JSX.IntrinsicElements[T] : {};
