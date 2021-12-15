import { ENTITY_INVALID } from './ECSConstants';

export abstract class Trigger {
    static readonly type: string;

    public originEntityId: number = ENTITY_INVALID;
}
