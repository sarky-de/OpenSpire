import { ENTITY_INVALID } from '../../../Core/ECS/ECSConstants';
import { Trigger } from '../../../Core/ECS/Trigger';

export class DamageActorAction extends Trigger {
    static readonly type: string = 'DAMAGE_ACTOR_ACTION';

    public targetEntityId = ENTITY_INVALID;
    public damage = 0;
}
