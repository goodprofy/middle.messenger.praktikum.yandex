import type { Props, VNode } from '../src/types';

export function h(type: string | Function, props: Props | null, ...children: any[]): VNode {
  return {
    type,
    props: { ...(props || {}), children: children.length === 1 ? children[0] : children },
    children: children
      .flat()
      .map((child) =>
        typeof child === 'string' || typeof child === 'number' || typeof child === 'boolean'
          ? { type: 'TEXT_ELEMENT', props: { nodeValue: child.toString() }, children: [] }
          : child || null
      )
      .filter((child) => child !== null && child !== undefined && child !== false)
  };
}

export function Fragment(props: Props): VNode {
  return {
    type: 'fragment',
    props,
    children: props.children || []
  };
}
