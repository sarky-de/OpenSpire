export interface EventDispatcher {
    dispatch<T>(event: string, payload?: T): void;
    register(event: string, handler: Function): boolean;
    unregister(event: string, handler: Function): boolean;
}