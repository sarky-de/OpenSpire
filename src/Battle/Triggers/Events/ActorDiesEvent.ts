import { ENTITY_INVALID } from '../../../Core/ECS/ECSConstants';
import { Trigger } from '../../../Core/ECS/Trigger';

export class ActorDiesEvent extends Trigger {
    static readonly type: string = 'ACTOR_DIES_EVENT';

    public targetEntityId = ENTITY_INVALID;
}
