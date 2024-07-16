type SetStateCallback<S> = (state: S) => void;
type Key = symbol | string;

export class Component<P = Record<string, unknown>, S = Record<string, unknown>> {
  key: Key;
  props: P;
  state: S;
  element: HTMLUnknownElement | null = null;

  constructor(props: P, key?: Key) {
    this.props = props;
    this.state = {} as S;
    this.key = key ?? Math.random().toString(36).substring(2);
  }

  protected setState(newState: Partial<S>, callback?: SetStateCallback<S>) {
    this.state = { ...this.state, ...newState };
    this.update();
    if (callback) {
      callback(this.state);
    }
  }

  protected update() {
    const oldElement = this.element;
    const newElement = this.render() as unknown as HTMLElement | null; //TODO: Fix me

    if (oldElement && newElement && oldElement.parentNode) {
      this.updateElement(oldElement, newElement);
    } else if (newElement) {
      this.element = newElement;
    }
  }

  private updateElement(mountedElement: HTMLElement, newElement: HTMLElement) {
    const newAttrs = Array.from(newElement.attributes);
    newAttrs.forEach((attr) => {
      mountedElement.setAttribute(attr.name, attr.value);
    });

    const oldAttrs = Array.from(mountedElement.attributes);
    oldAttrs.forEach((attr) => {
      if (!newElement.hasAttribute(attr.name)) {
        mountedElement.removeAttribute(attr.name);
      }
    });

    const mountedExistingChildren = Array.from(mountedElement.childNodes);
    const newExistingChildren = Array.from(newElement.childNodes);

    while (mountedExistingChildren.length > newExistingChildren.length) {
      const lastChild = mountedExistingChildren.pop();
      if (lastChild) {
        mountedElement.removeChild(lastChild);
      }
    }

    newExistingChildren.forEach((newChild, index) => {
      const existingChild = mountedExistingChildren[index];

      if (!existingChild) {
        appendChildToElement(mountedElement, newChild);
      } else if (existingChild.nodeType === newChild.nodeType) {
        if (existingChild.nodeType === Node.ELEMENT_NODE) {
          this.updateElement(existingChild as HTMLElement, newChild as HTMLElement);
        } else if (existingChild.nodeValue !== newChild.nodeValue) {
          const importedNode = document.importNode(newChild, true);
          mountedElement.replaceChild(importedNode, existingChild);
        }
      } else {
        mountedElement.replaceChild(document.importNode(newChild, true), existingChild);
      }
    });
  }

  public render(): JSX.Element | null {
    return null;
  }
}

function appendChildToElement(parent: HTMLElement, child: Node) {
  const importedNode = document.importNode(child, true);
  parent.appendChild(importedNode);
}

/* function createElementFromVirtual<T extends HTMLElement>(virtual: T): Node {
  if (Array.isArray(virtual)) {
    const fragment = document.createDocumentFragment();
    virtual.forEach((v) => fragment.appendChild(createElementFromVirtual(v)));
    return fragment;
  }

  if (typeof virtual === 'string' || typeof virtual === 'number') {
    return document.createTextNode(String(virtual));
  } else if (virtual instanceof Node) {
    return virtual;
  } else if (virtual && typeof virtual === 'object') {
    if (virtual.type === 'fragment') {
      return createFragmentFromVirtual(virtual.children);
    }
  }

  return document.createTextNode('');
}

function createFragmentFromVirtual<T extends HTMLElement>(children: T[]): DocumentFragment {
  const fragment = document.createDocumentFragment();
  children.forEach((child) => {
    const childElement = createElementFromVirtual(child);
    fragment.appendChild(childElement);
  });
  return fragment;
} */
