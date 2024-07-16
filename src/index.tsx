import { App } from './App';

try {
  const root = document.getElementById('root')!;
  const appNode = (<App />) as unknown as HTMLElement;
  root?.append(appNode);
} catch (err) {
  console.error(err);
}
