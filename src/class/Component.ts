import { updateElement } from '../render';
import type { Props, VNode } from '../types';
import { deepEqual } from '../utils';

export abstract class Component<P = Props, S = Props> {
  props: P;
  state: S;
  prevState: S;
  vnode: VNode | null = null;
  updateScheduled: boolean = false;
  isMounted: boolean = false;

  constructor(props: P = {} as P) {
    this.props = props;
    this.state = {} as S;
    this.prevState = {} as S;
  }

  setState(newState: Partial<S>, callback?: () => void) {
    const nextState = { ...this.state, ...newState };
    if (!this.updateScheduled) {
      this.updateScheduled = true;
      Promise.resolve().then(() => {
        this.updateScheduled = false;
        if (this.isMounted && this.shouldComponentUpdate(this.props, nextState)) {
          this.prevState = this.state;
          this.state = nextState;
          this.update();
          if (callback) callback();
        }
      });
    }
  }

  shouldComponentUpdate(nextProps: P, nextState: S): boolean {
    return !deepEqual(this.props, nextProps) || !deepEqual(this.state, nextState);
  }

  componentDidMount() {}

  componentDidUpdate() {}

  componentWillUnmount() {
    this.isMounted = false;
  }

  update() {
    if (this.isMounted && this.vnode && this.vnode.element) {
      const nextVNode = this.render();
      updateElement(
        this.vnode.element.parentElement!,
        nextVNode,
        this.vnode.renderedNode,
        Array.from(this.vnode.element.parentElement!.childNodes).indexOf(this.vnode.element)
      );
      this.vnode = { ...this.vnode, renderedNode: nextVNode };
      this.componentDidUpdate();
    }
  }

  abstract render(): VNode;
}
