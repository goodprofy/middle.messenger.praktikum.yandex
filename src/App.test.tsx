import { beforeEach, describe, it } from 'vitest';
import { App } from './App';

describe('App', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  it('render app', () => {
    const element = (<App />) as unknown as HTMLElement;
    document.body.append(element);
  });
});
