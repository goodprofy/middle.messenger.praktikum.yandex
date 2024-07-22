import { isDefined } from '../utils';

interface State {
  [key: string]: unknown;
}

type Listener = () => void;

export class Store {
  static __instance: Store;
  private state!: State;
  private listeners: Listener[] = [];

  constructor(initialState: State = {}) {
    if (isDefined(Store.__instance)) {
      return Store.__instance;
    }
    this.state = initialState;
    Store.__instance = this;
  }

  private notifyListeners(): void {
    this.listeners.forEach((listener) => listener());
  }

  subscribe(listener: Listener): () => void {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }

  get = (key: string) => {
    return this.state[key];
  };

  set = (key: string, value: unknown) => {
    this.state[key] = value;
    this.notifyListeners();
  };

  update = (newState: State) => {
    this.state = { ...this.state, ...newState };
    this.notifyListeners();
  };

  getState = <T>(): T => {
    return this.state as T;
  };
}
