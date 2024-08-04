import type { VNode } from '../types';
import { isDefined } from '../utils';

export function updateProps(element: HTMLElement, newProps: VNode['props'] = {}, oldProps: VNode['props'] = {}) {
  const allProps = { ...oldProps, ...newProps };

  Object.keys(allProps).forEach((name) => {
    if (name === 'children' && newProps[name] !== oldProps[name]) {
      return;
    }

    const newValue = newProps[name];
    const oldValue = oldProps[name];
    const isFunction = typeof newValue === 'function';
    const isObject = typeof newValue === 'object' && newValue !== null;
    const isString = typeof newValue === 'string';

    if (name === 'ref' && isFunction) {
      newValue(element);
    } else if (name.startsWith('on')) {
      const eventName = name.toLowerCase().substring(2);
      if (!isDefined(newValue) && isDefined(oldValue)) {
        element.removeEventListener(eventName, oldValue as EventListener);
      } else if (isDefined(newValue) && isFunction) {
        element.addEventListener(eventName, newValue as EventListener);
      }
    } else if (name === 'style') {
      if (isObject) {
        const styles = Object.entries(newValue);
        styles.forEach(([prop, value]) => {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const styleName = prop as any;
          if (element.style[styleName] !== value) {
            element.style[styleName] = value;
          }
        });
      } else if (isString) {
        element.setAttribute('style', newValue);
      } else {
        element.style.cssText = '';
        element.removeAttribute('style');
      }
    } else if (name === 'class') {
      if (isDefined(newValue) && isString) {
        element.className = newValue;
      } else {
        element.removeAttribute('class');
      }
    } else {
      if (name === 'value' && element instanceof HTMLInputElement) {
        if (element.value !== newValue && isString) {
          element.value = newValue;
        }
      } else if (isString) {
        element.setAttribute(name, newValue);
      } else {
        element.removeAttribute(name);
      }
    }
  });
}
