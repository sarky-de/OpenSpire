import { EventDispatcher } from "./EventDispatcher";

export class EventBus implements EventDispatcher {
    protected readonly _eventMap: Map<string, Array<Function>>;

    public constructor() {
        this._eventMap = new Map<string, Array<Function>>();
    }

    dispatch<T>(event: string, payload?: T): void {
        let handlers: Array<Function>;
        if (!this._eventMap.has(event)) {
            return;
        } 
        handlers = this._eventMap.get(event)!;
        handlers.forEach(callback => callback(payload));     
    }

    register(event: string, handler: Function): boolean {
        let handlers: Array<Function>;
        if (!this._eventMap.has(event)) {
            handlers = new Array<Function>();
            this._eventMap.set(event, handlers);
        } else {
            handlers = this._eventMap.get(event)!;
        }
        var exists: boolean = false;
        handlers.some(element => {
            if (element === handler) {
                exists = true;
                return exists;
            }
        });
        if (!exists) {
            handlers.push(handler);
        }
        return !exists;
    }

    unregister(event: string, handler: Function): boolean {
        if (!this._eventMap.has(event)) {
            return false;
        }
        let handlers = this._eventMap.get(event)!;
        let found = false;
        for (let i = 0; i < handlers.length; i++) {
            if (handlers[i] === handler) {
                found = true;
                handlers.splice(i, 1);
                break;
            }
        }
        return found;
    }
}