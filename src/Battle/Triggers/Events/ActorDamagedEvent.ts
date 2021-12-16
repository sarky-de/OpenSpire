import { ENTITY_INVALID } from '../../../Core/ECS/ECSConstants';
import { Trigger } from '../../../Core/ECS/Trigger';

export class ActorDamagedEvent extends Trigger {
    static readonly type: string = 'ACTOR_DAMAGED_EVENT';

    public targetEntityId = ENTITY_INVALID;
    public damageToBlock = 0;
    public damageToHealth = 0;
}
