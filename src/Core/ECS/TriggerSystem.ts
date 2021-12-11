import { eventBus } from "./ECS";
import { System } from "./System";

export abstract class TriggerSystem extends System {
    protected abstract triggerType: string;

    public Initialize(): void {
        eventBus.register(this.triggerType, this.Run.bind(this));
    }
}
