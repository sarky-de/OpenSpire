import { Entity } from "./Entity";
import { Component, components } from "./Component";
import { EventBus } from "../EventBus";
import { System, systems } from "./System";
import { ENTITY_INVALID } from "./ECSConstants";

export class ECS {
    private static instance: ECS;
    private static readonly invalidEntity: Entity = { id:  ENTITY_INVALID, components: [] };

    private _eventBus: EventBus = new EventBus();
    private _entities: Map<number, Entity> = new Map<number, Entity>();
    private _nextEntityId = 0;

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

    public createEntity(): Entity {
        const entity: Entity = {
            id: this._nextEntityId++,
            components: [],
        } 
        this._entities.set(entity.id, entity);
    
        return entity;
    }

    public getEntity(entityId: number): Entity {
        return this._entities.get(entityId) ?? ECS.invalidEntity;
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
        this._entities.clear();

        components.length = 0;

        systems.forEach((system) => {
            system.Destroy();
        });
        systems.length = 0;
    }
}
