import { Component } from "./Component";
import { ECS } from "./ECS";
import { createEntity } from "./Entity";
import { Trigger } from "./Trigger";
import { TriggerSystem } from "./TriggerSystem";

const INITIAL_HEALTH: number = 100;
const DAMAGE: number = 10;

class HealthComponent extends Component {
    static readonly type: string = "HealthComponent";

    public health: number = INITIAL_HEALTH;
}

class DamageAllTrigger extends Trigger {
    static readonly type: string = "DamageAllTrigger";

    public damage: number = DAMAGE;
}

class DamageAllSystem extends TriggerSystem {
    readonly triggerType: string = DamageAllTrigger.type;

    public Run(payload?: any): void {
        let data = payload as DamageAllTrigger;
        let healthComponents = ECS.getInstance().getComponents<HealthComponent>(HealthComponent);

        healthComponents.forEach(component => {
            if (component.entityId != data.originEntityId) {
                component.health -= data.damage    
            }
        });
    }
}

beforeEach(() => {
    ECS.getInstance().initialize();
});

afterEach(() => {
    ECS.getInstance().destroy();
})

test("Integration", () => {
    const ecs = ECS.getInstance();
    const player = createEntity();
    ecs.createComponent<HealthComponent>(player, HealthComponent);
    
    const enemy = createEntity();
    ecs.createComponent<HealthComponent>(enemy, HealthComponent);
    
    const damageAllSystem = ecs.createSystem<DamageAllSystem>(DamageAllSystem);
    ecs.eventBus.dispatch<DamageAllTrigger>(DamageAllTrigger.type, { originEntityId: player.id, damage: DAMAGE });

    const healthComponent = enemy.components[0] as HealthComponent;
    expect(healthComponent.health).toBe(INITIAL_HEALTH - DAMAGE);
});
