import { updateElement } from '../dom';
import type { Props, VNode } from '../types';
import { deepEqual } from '../utils';

export abstract class Component<P = Props, S = Props> {
  props: P;
  state: S;
  prevState: S;
  vnode: VNode | null = null;
  element: HTMLElement | null = null;
  parentNode: ParentNode | null = null;
  updateScheduled: boolean = false;
  isMounted: boolean = false;
  component: Component | undefined;

  constructor(props: P = {} as P) {
    console.log('component constructor');
    this.props = props;
    this.state = {} as S;
    this.prevState = {} as S;
  }

  setState(newState: Partial<S>, callback?: () => void) {
    const nextState = { ...this.state, ...newState };
    if (!this.updateScheduled) {
      this.updateScheduled = true;

      //TODO vitest problem with awaits
      /* queueMicrotask(() => {
        if (this.isMounted && this.shouldUpdate(this.props, nextState)) {
          this.prevState = this.state;
          this.state = nextState;
          this.update();
          if (callback) callback();
        }
        this.updateScheduled = false;
      }); */

      if (this.isMounted && this.shouldUpdate(this.props, nextState)) {
        this.prevState = this.state;
        this.state = nextState;
        this.update();
        if (callback) callback();
      }
      this.updateScheduled = false;
    }
  }

  shouldUpdate(nextProps: P, nextState: S): boolean {
    return !deepEqual(this.props, nextProps) || !deepEqual(this.state, nextState);
  }

  componentDidMount() {
    console.info('componentDidMount');
  }

  updated() {
    console.info('component updated');
  }

  componentWillUnmount() {
    console.info('componentWillUnmount');
    this.isMounted = false;
  }

  update() {
    console.group('component update');
    if (this.isMounted && this.vnode && this.vnode.element) {
      const nextVNode = this.render();

      updateElement(
        this.vnode.element.parentElement!,
        nextVNode,
        this.vnode.renderedNode,
        Array.from(this.vnode.element.parentElement!.childNodes).indexOf(this.vnode.element),
        this.vnode
      );
      this.vnode = { ...this.vnode, renderedNode: nextVNode };

      if (this.vnode.element.parentElement == null) {
        throw new Error('Parent element lost');
      }

      this.updated();
    }
    console.groupEnd();
  }

  abstract render(): VNode;
}
