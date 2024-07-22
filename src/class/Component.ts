import type { NonNullableObject } from '../types';
import { isEqual } from '../utils';

type SetStateCallback<S> = (state: S) => void;
export class Component<Props = Record<string, unknown>, State = Record<string, unknown>> {
  props: Props;
  state: State;
  element: HTMLElement | null = null;

  constructor(props: Props) {
    this.props = props;
    this.state = {} as State;
  }

  protected setState = (newState: Partial<State>, callback?: SetStateCallback<State>) => {
    const prevState = { ...this.state };
    this.state = { ...this.state, ...newState };

    if (
      !isEqual<NonNullableObject<State>>(prevState as NonNullableObject<State>, newState as NonNullableObject<State>)
    ) {
      this.update();
    }
    if (callback) {
      callback(this.state);
    }
  };

  mount() {}
  unmount() {}

  protected update() {
    const oldElement = this.element;
    const newElement = this.render() as unknown as HTMLElement | null; //TODO: Fix me

    if (oldElement && newElement && oldElement.parentNode) {
      this.updateElement(oldElement, newElement);
    } else if (newElement) {
      this.element = newElement;
      this.mount();
    }
  }

  private updateElement(mountedElement: HTMLElement, newElement: HTMLElement) {
    this.updateAttributes(mountedElement, newElement);
    this.updateChildren(mountedElement, newElement);
  }

  private updateAttributes(mountedElement: HTMLElement, newElement: HTMLElement) {
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

    const isInputElement =
      (mountedElement.tagName === 'INPUT' && newElement.tagName === 'INPUT') ||
      (mountedElement.tagName === 'TEXTAREA' && newElement.tagName === 'TEXTAREA');

    if (isInputElement) {
      const newInput = newElement as HTMLInputElement | HTMLTextAreaElement;
      const mountedInput = mountedElement as HTMLInputElement | HTMLTextAreaElement;
      if (newInput.type === 'text' || newInput.tagName === 'TEXTAREA') {
        if (mountedInput.value !== newInput.value) {
          mountedInput.value = newInput.value;
        }
      } else if (mountedInput instanceof HTMLInputElement && newInput instanceof HTMLInputElement) {
        if (mountedInput.type === 'checkbox' || mountedInput.type === 'radio') {
          mountedInput.checked = newInput.checked;
        }
      }
    }
  }

  private updateChildren(mountedElement: HTMLElement, newElement: HTMLElement) {
    const mountedChildren = Array.from(mountedElement.childNodes);
    const newChildren = Array.from(newElement.childNodes);

    while (mountedChildren.length > newChildren.length) {
      const lastChild = mountedChildren.pop();
      if (lastChild) {
        mountedElement.removeChild(lastChild);
      }
    }

    newChildren.forEach((newChild, index) => {
      const existingChild = mountedChildren[index];

      if (!existingChild) {
        mountedElement.appendChild(newChild);
      } else if (existingChild.nodeType === newChild.nodeType) {
        if (existingChild.nodeType === Node.ELEMENT_NODE) {
          // if (oldChild.nodeType === newChild.nodeType && oldChild.nodeName === newChild.nodeName) {
          this.updateElement(existingChild as HTMLElement, newChild as HTMLElement);
        } else if (existingChild.nodeValue !== newChild.nodeValue) {
          mountedElement.replaceChild(newChild, existingChild);
          this.unmount();
        }
      } else {
        mountedElement.replaceChild(newChild, existingChild);
        this.unmount();
      }
    });
  }

  render(): JSX.Element | null {
    return null;
  }
}
