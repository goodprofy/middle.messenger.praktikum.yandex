import { isDefined } from '../utils';

const svgNS = 'http://www.w3.org/2000/svg';
const xhtmlNS = 'http://www.w3.org/1999/xhtml';

type ExtendedHTMLElementTagNameMap = HTMLElementTagNameMap & {
  svg: SVGElement;
};

type Tag = keyof ExtendedHTMLElementTagNameMap;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Attrs = Record<string, any>;
type Child = string | number | null | Element;
type Children = Child[] | null;

export class Bone<T = Element> {
  static bones: Bone[] = [];
  public element: T;
  public attrs: Attrs = {};
  public children: Children = null;
  public key?: symbol | string;

  constructor(tag: Tag, attrs: Attrs, children: Children) {
    const namespace = tag === 'svg' ? svgNS : xhtmlNS;
    const element = document.createElementNS(namespace, tag);

    children?.forEach((child) => {
      this.appendChild(element, child);
    });

    this.appendAttrs(element, attrs);

    this.element = element as T;
    this.attrs = attrs;
    this.children = children;
    Bone.bones.push(this as Bone);
  }

  static getBones = () => {
    return this.bones;
  };

  static getBonesCount = () => {
    return this.bones.length;
  };

  private appendAttrs(parent: Element, props: Attrs) {
    Object.entries(props).forEach(([prop, value]) => {
      if (!isDefined(value)) {
        return;
      }

      if (prop === 'ref') {
        value(parent);
        return;
      }

      if (prop === 'key') {
        this.key = value;
        return;
      }

      if (typeof value === 'boolean') {
        if (value) {
          parent.setAttribute(prop, '');
        } else if (parent.hasAttribute(prop)) {
          parent.removeAttribute(prop);
        }
      } else if (typeof value === 'function') {
        const eventName = prop.startsWith('on') ? prop.toLowerCase().substring(2) : prop.toLowerCase();
        parent.addEventListener(eventName, value);
      } else {
        parent.setAttribute(prop, value.toString());
      }
    });
  }

  private appendChild(parent: Element | DocumentFragment, children: Child | Child[]) {
    if (children === null) {
      return;
    }

    if (typeof children === 'string' || typeof children === 'number') {
      parent.append(String(children));
    } else if (children instanceof Node) {
      parent.append(children);
    } else if (Array.isArray(children)) {
      children.forEach((child) => {
        this.appendChild(parent, child);
      });
    }
  }

  render() {
    return this.element;
  }
}
