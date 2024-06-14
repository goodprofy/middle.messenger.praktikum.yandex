import { isDefined } from '../utils';

export function usePortal<T extends JSX.Element[]>(
  element: T,
  target: HTMLElement
): {
  unmount: () => void;
} {
  const node = element[0] as unknown as Node | null | undefined;
  if (isDefined(node)) {
    target.appendChild(node);
  }

  return {
    unmount: () => {
      if (isDefined(node)) {
        target.removeChild(node);
      }
    }
  };
}
