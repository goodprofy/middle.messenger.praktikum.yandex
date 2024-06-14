type Props = Record<string, any> | null;
type Tag =
  | keyof HTMLElementTagNameMap
  | ((props: PropsWithChildren) => JSX.Element);

export function h(tag: Tag, props: Props, ...children: ElementNode[]) {
  if (typeof tag === "function") {
    return tag({ ...props, children });
  }
  const el = document.createElement(tag);
  if (props) {
    Object.entries(props).forEach(([key, val]) => {
      if (key === "className") {
        el.classList.add(...((val as string) || "").trim().split(" "));
        return;
      }

      if (key.startsWith("on") && key.toLowerCase() in window) {
        el.addEventListener(key.toLowerCase().substring(2), props[key]);
        return;
      }

      el.setAttribute(key, val);
    });
  }

  children.forEach((child) => {
    el.append(child);
  });

  return el;
}
