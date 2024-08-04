import { getChildIndex, updateElement } from '../dom';
import type { DOMElement, Props, VNode } from '../types';
import { deepEqual, isDefined } from '../utils';

export abstract class Component<P = Props, S = Props> {
  props: P;
  state: S;
  prevState: S;
  vnode: VNode | null = null;
  element: DOMElement | null = null;
  parentNode: HTMLElement | null = null;
  indexInParent = 0;
  isMounted = false;
  updateScheduled = false;

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
    return true;
    //return !deepEqual(this.props, nextProps) || !deepEqual(this.state, nextState);
  }

  mounted() {
    console.info('component mounted');
  }

  updated() {
    console.info('component updated');
  }

  unmount() {
    console.info('component unmount');
  }

  unmounted() {
    console.info('component unmounted');
  }

  update() {
    console.group('component update');

    if (this.isMounted && isDefined(this.parentNode) && isDefined(this.vnode) && this.element) {
      const nextVNode = this.render();

      this.element = updateElement(this.parentNode, this.element, nextVNode, this.vnode);

      this.vnode = { ...this.vnode, ...nextVNode };

      this.updated();
    }
    console.groupEnd();
  }

  abstract render(): VNode['type'];
}
