import { ENTITY_INVALID } from './ECSConstants';

export const components = new Array<Component>();

/**
 * A Component is an object that purely stores data and does not have have any
 * behaviour. Logic and behavior is handled by Systems.
 */
export abstract class Component {
    abstract readonly type: string;

    public entityId: number = ENTITY_INVALID;
}
