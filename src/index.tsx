import { App } from "./App";

try {
  const root = document.getElementById("root")!;
  root?.append(<App />);
} catch (err) {
  console.error(err);
}
