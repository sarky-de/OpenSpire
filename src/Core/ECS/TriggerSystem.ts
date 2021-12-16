import { ECS } from './ECS';
import { System } from './System';

/**
 * A TriggerSystem runs every time a Trigger is dispatched.
 */
export abstract class TriggerSystem extends System {
    protected abstract triggerType: string;

    public Initialize(): void {
        ECS.getInstance().eventBus.register(
            this.triggerType,
            this.Run.bind(this)
        );
    }

    public Destroy(): void {
        ECS.getInstance().eventBus.unregister(this.triggerType, this.Run);
    }
}
