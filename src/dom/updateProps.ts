import { VNode } from '../types';
import { isDefined } from '../utils';

export function updateProps(element: HTMLElement | Text, newProps: VNode['props'], oldProps: VNode['props']) {
  if (!(element instanceof HTMLElement)) {
    return;
  }

  const allProps = { ...oldProps, ...newProps };

  console.log({ allProps });

  Object.keys(allProps).forEach((name) => {
    if (name === 'children') {
      return;
    }

    const oldValue = oldProps[name];
    const newValue = newProps[name];

    if (name === 'ref') {
      newProps[name](element);
    } else if (name.startsWith('on') && name.toLowerCase() in window) {
      const eventName = name.toLowerCase().substring(2);
      if (newProps[name] !== oldProps[name]) {
        if (isDefined(oldValue)) {
          element.removeEventListener(eventName, oldValue);
        }
        if (isDefined(newValue)) {
          console.log({ newValue });
          element.addEventListener(eventName, newValue);
        }
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
}
