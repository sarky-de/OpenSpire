export type EventHandler = (payload: any) => void;

export interface EventDispatcher {
    dispatch<T>(event: string, payload?: T): void;
    register(event: string, handler: EventHandler): boolean;
    unregister(event: string, handler: EventHandler): boolean;
}
