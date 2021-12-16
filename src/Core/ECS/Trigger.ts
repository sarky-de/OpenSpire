import { ENTITY_INVALID } from './ECSConstants';

/**
 * A Trigger is an event dispatched via an event bus.
 */
export abstract class Trigger {
    static readonly type: string;

    public originEntityId: number = ENTITY_INVALID;
}
