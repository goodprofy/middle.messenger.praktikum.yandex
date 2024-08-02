import type { VNode } from '../src/types';

export function h(type: VNode['type'], props: VNode['props'], ...children: VNode['children']) {
  const result: VNode = {
    type,
    props: props || {},
    children: children.flat() || []
  };

  console.info('jsx: h', result);

  return result;
}

export function Fragment(props: { children: VNode['children'] }) {
  const result: VNode = {
    type: 'FRAGMENT',
    props: props || {},
    children: props.children.flat() || []
  };

  console.info('jsx: fragment', result);

  return result;
}
