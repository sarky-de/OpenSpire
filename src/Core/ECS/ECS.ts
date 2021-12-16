import { Entity } from './Entity';
import { Component } from './Component';
import { EventBus } from '../EventBus';
import { System } from './System';
import { Logger } from '../Logger';

/**
 * Simple Entity Component System (ECS)
 *
 * The basic idea of this pattern is to move from defining application
 * entities using a class hierarchy to using composition in a Data
 * Oriented Programming paradigm. (More info on wikipedia). Programming
 * with an ECS can result in code that is more efficient and easier to
 * extend over time.
 *
 * Some common terms within ECS engines are:
 *  * Entity: an object with a unique ID that can have multiple components
 *      attached to it.
 *  * Component: properties of an entity, ex: hit points. Only data is only
 *      stored in components.
 *  * System: performs the actual work within an application by processing
 *      entities and modifying their components.
 *
 * The usual workflow when building an ECS-based application is:
 *  * Create the components that shape the data you need to use in your
 *      application.
 *  * Create entities and attach components to them.
 *  * Create the systems that will use these components to read and transform
 *      the data of these entities.
 *  * Execute systems based on criteria, e.g. each frame or on an event.
 *
 * The peformance benefits of implementing an ECS for Typescript/JavaScript
 * can be discussed, but I chose this pattern since I like how it enforces
 * a certain structure to your code while making it easy to extend and test.
 *
 * This article provides a good first overview if you are new to ECS:
 * https://medium.com/ingeniouslysimple/entities-components-and-systems-89c31464240d
 */
export class ECS {
    private static instance: ECS;

    private _eventBus: EventBus = new EventBus();
    private _entities: Map<number, Entity> = new Map<number, Entity>();
    private _components: Map<string, Array<Component>> = new Map<
        string,
        Array<Component>
    >();
    private _systems: Array<System> = new Array<System>();
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
            components: new Map<string, Component>()
        };
        this._entities.set(entity.id, entity);

        return entity;
    }

    public getEntity(entityId: number): Entity | undefined {
        return this._entities.get(entityId);
    }

    public createComponent<T extends Component>(
        entity: Entity,
        type: new () => T
    ): T | undefined {
        const component: T = new type();

        if (entity.components.has(component.type)) {
            Logger.warn(
                `Entity ID ${entity.id} already has component ${component.type}`
            );
            return undefined;
        }

        component.entityId = entity.id;
        entity.components.set(component.type, component);

        let components: Array<Component>;
        if (!this._components.has(component.type)) {
            components = new Array<Component>();
            this._components.set(component.type, components);
        } else {
            components = this._components.get(component.type)!;
        }
        components.push(component);

        return component;
    }

    /**
     * Returns _all_ existing components (across entity boundaries) of type T
     *
     * @param type Component type
     * @returns All components of given type
     */
    public getComponents<T extends Component>(type: new () => T): Array<T> {
        const component: T = new type();

        return this._components.get(component.type) as Array<T>;
    }

    /**
     * Returns Component with type from an Entity.
     *
     * @param entityId Entity to retrieve component type from
     * @param type Type of componentn to retrieve from Entity
     * @returns Entity component of type T, undefined if component of given type does not exist
     */
    // TS does not allow instanceof check for T: https://github.com/Microsoft/TypeScript/issues/5236
    //public getEntityComponent<T extends Component>(entityId: number, constructor: {new (): T}): T | undefined {
    public getEntityComponent<T extends Component>(
        entityId: number,
        type: new () => T
    ): T | undefined {
        let component: T | undefined = undefined;

        const entity = this.getEntity(entityId);
        if (entity) {
            const componentType = new type();
            component = entity.components.get(componentType.type) as T;
        }

        return component;
    }

    /**
     * Creates a new instance of given system T and registers it for receiving
     * updates.
     *
     * @param type Type of system to be created
     * @returns New System instance
     */
    public createSystem<T extends System>(type: new () => T): T {
        const system: T = new type();

        system.Initialize();
        this._systems.push(system);

        return system;
    }

    /**
     * Removes all references to existing entities, systems, and components.
     * Notifies Systems to clean up.
     */
    public destroy(): void {
        this._entities.clear();

        this._components.clear();

        this._systems.forEach((system) => {
            system.Destroy();
        });
        this._systems.length = 0;
    }
}
