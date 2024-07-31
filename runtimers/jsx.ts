import type { Props, VNode } from '../src/types';

export function h(type: string | Function, props: Props, ...children: any[]): VNode {
  return {
    type,
    props: props || {},
    children: children
      .flat()
      .map((child) =>
        typeof child === 'string' || typeof child === 'number'
          ? { type: 'TEXT_ELEMENT', props: { nodeValue: child }, children: [] }
          : child
      )
  };
}

export function Fragment(props: Props): VNode {
  return {
    type: 'fragment',
    props,
    children: props.children || []
  };
}
