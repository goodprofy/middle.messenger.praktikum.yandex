import { createElement } from './createElement';

export function render(vnode: JSX.Element, container: HTMLElement) {
  console.info('render', { vnode });
  const element = createElement(vnode);
  container.append(element);
}
