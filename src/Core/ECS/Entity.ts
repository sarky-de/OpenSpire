import { Component } from "./Component";
import { ENTITY_INVALID } from "./ECSConstants";

let nextEntityId = 0;

export const entities = Array<Entity>();

export class Entity {
    public id: number = ENTITY_INVALID;
    public components: Array<Component> = new Array<Component>();
}

export function createEntity(): Entity {
    const entity: Entity = {
        id: nextEntityId++,
        components: [],
    } 
    entities.push(entity);

    return entity;
}
