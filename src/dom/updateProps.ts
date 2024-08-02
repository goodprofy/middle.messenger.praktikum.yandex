import { VNode } from '../types';
import { isDefined } from '../utils';

export function updateProps(
  element: HTMLElement | SVGElement | Text,
  newProps: VNode['props'] = {},
  oldProps: VNode['props'] = {}
) {
  console.group('updateProps');
  console.log('element', element.outerHTML);
  console.log({ newProps, oldProps });
  if (!(element instanceof HTMLElement)) {
    console.groupEnd();
    return;
  }

  const allProps = { ...oldProps, ...newProps };

  Object.keys(allProps).forEach((name) => {
    if (name === 'children') {
      console.groupEnd();
      return;
    }

    const oldValue = oldProps[name];
    const newValue = newProps[name];

    if (name === 'ref' && typeof newValue === 'function') {
      newValue(element);
    } else if (name.startsWith('on') && typeof newValue === 'function') {
      const eventName = name.toLowerCase().substring(2);
      if (newValue !== oldValue) {
        if (isDefined(oldValue)) {
          element.removeEventListener(eventName, oldValue as EventListener);
        }
        if (isDefined(newValue)) {
          element.addEventListener(eventName, newValue as EventListener);
        }
      }
    } else if (name === 'style') {
      if (typeof newValue === 'object') {
        Object.entries(newValue).forEach(([prop, value]) => {
          if (element.style[prop as any] !== value) {
            element.style[prop as any] = value;
          }
        });
      } else if (typeof newValue === 'string') {
        element.setAttribute('style', newValue);
      } else {
        element.removeAttribute('style');
      }
    } else if (name === 'class') {
      if (isDefined(newValue)) {
        element.setAttribute('class', newValue);
      } else {
        element.removeAttribute('class');
      }
    } else if (newValue !== oldValue) {
      if (name === 'value' && element instanceof HTMLInputElement) {
        if (element.value !== newValue) {
          element.value = newValue;
        }
      } else if (newValue != null) {
        element.setAttribute(name, newValue);
      } else {
        element.removeAttribute(name);
      }
    }
  });
  console.groupEnd();
}
