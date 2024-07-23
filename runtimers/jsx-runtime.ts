import { Bone } from '../src/class';

type ComponentConstructor = new (props: { [key: string]: any; children: any[] }) => {
  element: Element;
  render: () => Element;
};

type BoneTag = ConstructorParameters<typeof Bone>[0];

export function h(tag: BoneTag | Function, props: { [key: string]: any }, ...children: any[]): Element | null {
  if (typeof tag === 'function') {
    let result;

    const isClassComponent = tag.prototype && tag.prototype.render;

    if (isClassComponent) {
      const componentInstance = new (tag as ComponentConstructor)({ ...props, children });
      result = componentInstance.render();
      componentInstance.element = result;
    } else {
      result = tag({ ...props, children });
    }

    return result as unknown as HTMLElement;
  }

  const bone = new Bone(tag, props || {}, children || []);

  return bone.render();
}

export function Fragment(props: { children: any[] }) {
  const fragment = document.createDocumentFragment();
  props.children.flat().forEach((child) => {
    appendChild(fragment, child);
  });
  return fragment;
}

function appendChild(parent: HTMLElement | DocumentFragment, children: Node | Node[]) {
  if (children === null) {
    return;
  }

  if (typeof children === 'string' || typeof children === 'number') {
    parent.append(String(children));
  } else if (children instanceof Node) {
    const child = document.importNode(children, true);
    parent.append(child);
  } else if (Array.isArray(children)) {
    children.forEach((child) => {
      appendChild(parent, child);
    });
  }
}
