import { Component } from './Component';
import { ENTITY_INVALID } from './ECSConstants';

export class Entity {
    public id: number = ENTITY_INVALID;
    public components: Array<Component> = new Array<Component>();
}
