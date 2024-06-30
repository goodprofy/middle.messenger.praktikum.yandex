import { isDefined } from '../utils';

type SetStateCallback<S> = (state: S) => void;
type Key = symbol | string;

export class Component<P = {}, S = {}> {
  key: Key;
  props: P;
  state: S;
  element: HTMLUnknownElement | null = null;

  constructor(props: P, key?: Key) {
    this.props = props;
    this.state = {} as S;
    this.key = key || Math.random().toString(36).substring(2);
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
    const newElement = this.render();

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

    newExistingChildren.forEach((newChild, index) => {
      const existingChild = mountedExistingChildren[index];
      if (!isDefined(newChild)) {
        if (existingChild) {
          mountedElement.removeChild(existingChild);
        }
      } else if (!existingChild) {
        appendChildToElement(mountedElement, newChild);
      } else if (!compareNodes(existingChild, newChild)) {
        if (mountedElement.contains(existingChild)) {
          mountedElement.replaceChild(newChild, existingChild);
        }
      }
    });
  }

  public render(): HTMLUnknownElement | null {
    return null;
  }
}

function compareNodes(node1: Node, node2: Node) {
  if (node1 === node2) {
    return true;
  }

  if (node1.nodeType !== node2.nodeType) {
    return false;
  }

  switch (node1.nodeType) {
    case Node.ELEMENT_NODE:
      if (node1.tagName !== node2.tagName || node1.namespaceURI !== node2.namespaceURI) {
        return false;
      }
      break;

    case Node.TEXT_NODE:
    case Node.COMMENT_NODE:
      if (node1.textContent !== node2.textContent) {
        return false;
      }
      break;
  }

  if (node1.childNodes.length !== node2.childNodes.length) {
    return false;
  }

  for (let i = 0; i < node1.childNodes.length; i++) {
    if (!compareNodes(node1.childNodes[i], node2.childNodes[i])) {
      return false;
    }
  }

  return true;
}

function appendChildToElement(element: HTMLElement, child: any) {
  if (typeof child === 'string' || typeof child === 'number') {
    element.appendChild(document.createTextNode(String(child)));
  } else if (child instanceof Node) {
    element.appendChild(child);
  }
}

function createElementFromVirtual(virtual: any): Node {
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

function createFragmentFromVirtual(children: any[]): DocumentFragment {
  const fragment = document.createDocumentFragment();
  children.forEach((child) => {
    const childElement = createElementFromVirtual(child);
    fragment.appendChild(childElement);
  });
  return fragment;
}
