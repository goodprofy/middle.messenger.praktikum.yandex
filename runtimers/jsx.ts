import type { Props, VNode } from '../src/types';

export function h(type: string | Function, props: Props, ...children: VNode['children']): VNode {
  const result: VNode = {
    type,
    props: props || {},
    children: children || []
  };

  console.info('jsx: h', result);

  return result;
}

export function Fragment(props: { children: VNode['children'] }): VNode {
  const result: VNode = {
    type: 'FRAGMENT',
    props: props || {},
    children: props.children || []
  };

  console.info('jsx: fragment', result);

  return result;
}
