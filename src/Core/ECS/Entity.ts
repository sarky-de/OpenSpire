import { Component } from './Component';
import { ENTITY_INVALID } from './ECSConstants';

/**
 * An entity is an object that has a unique ID. Its purpose is to group
 * components together.
 */
export class Entity {
    public id: number = ENTITY_INVALID;
    public components: Map<string, Component> = new Map<string, Component>();
}
