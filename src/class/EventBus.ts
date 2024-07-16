// eslint-disable-next-line @typescript-eslint/no-explicit-any
type EventHandler<T = any> = (data: T) => void;

class EventBus {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private events: Map<string, EventHandler<any>[]>;

  constructor() {
    this.events = new Map();
  }

  on<T>(event: string, handler: EventHandler<T>): void {
    if (!this.events.has(event)) {
      this.events.set(event, []);
    }
    this.events.get(event)!.push(handler);
  }

  off<T>(event: string, handler: EventHandler<T>): void {
    const handlers = this.events.get(event);
    if (handlers) {
      this.events.set(
        event,
        handlers.filter((h: EventHandler<T>) => h !== handler)
      );
    }
  }

  emit<T>(event: string, data: T): void {
    const handlers = this.events.get(event);
    if (handlers) {
      handlers.forEach((handler: EventHandler<T>) => handler(data));
    }
  }
}

export const eventBus = new EventBus();
