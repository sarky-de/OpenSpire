import { Entity } from "./Entity";
import { Component, components } from "./Component";
import { EventBus } from "../EventBus";

export const eventBus = new EventBus();

export function createComponent<T extends Component>(entity: Entity, type: (new () => T)): T {
    let component: T = new type();
    component.entityId = entity.id;

    entity.components.push(component);
    components.push(component);

    return component;
}

export function getComponents<T extends Component>(type: (new () => T)): Array<T> {
    let baseComponent: T = new type();
    return components.filter(component => component.type === baseComponent.type) as Array<T>;
}
