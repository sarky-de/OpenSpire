import { entities, Entity } from "./Entity";
import { Component, components } from "./Component";
import { EventBus } from "../EventBus";
import { System, systems } from "./System";

export class ECS {
    private static instance: ECS;

    private _eventBus: EventBus = new EventBus();

    public initialize(eventBus?: EventBus): void {
        if (eventBus) {
            this._eventBus = eventBus;
        }
    }

    public static getInstance(): ECS {
        if (!ECS.instance) {
            ECS.instance = new ECS();
        }

        return ECS.instance;
    }
    
    public get eventBus(): EventBus {
        return this._eventBus;
    }

    public createComponent<T extends Component>(entity: Entity, type: (new () => T)): T {
        const component: T = new type();
        component.entityId = entity.id;
    
        entity.components.push(component);
        components.push(component);
    
        return component;
    }
    
    public getComponents<T extends Component>(type: (new () => T)): Array<T> {
        const baseComponent: T = new type();
        return components.filter(component => component.type === baseComponent.type) as Array<T>;
    }
    
    public createSystem<T extends System>(type: (new () => T)): T {
        const system: T = new type();
        system.Initialize();
        systems.push(system);
        return system;
    }

    public destroy(): void {
        entities.length = 0;
        components.length = 0;

        systems.forEach((system) => {
            system.Destroy();
        });
        systems.length = 0;
    }
}
