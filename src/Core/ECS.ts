/*
import { EventBus } from "./EventBus";

let eventBus = new EventBus();

let nextEntityId: number = 0;

let entities = Array<Entity>();
let components = new Array<Component>();

const ENTITY_INVALID: number = -1;

class Entity {
    public id: number = ENTITY_INVALID;
    public components: Array<Component> = new Array<Component>();
}

abstract class Component {
    static readonly type: string;

    public entityId: number = ENTITY_INVALID;

    public get type() {
        return Component.type;
    }
}

abstract class System {
    public abstract Initialize(): void;

    public abstract Run(payload?: any): void;
}


abstract class Trigger {
    static readonly type: string;
    
    public originEntityId: number = ENTITY_INVALID;
}

abstract class TriggerSystem extends System {
    protected abstract triggerType: string;

    public Initialize(): void {
        eventBus.register(this.triggerType, this.Run);
    }
}


class HealthComponent extends Component {
    static readonly type: string = "HealthComponent";

    public health: number = 100;
}

class DamageComponent extends Component {
    static readonly type: string = "DamageComponent";

    public damage: number = 10;
}


class DamageAllTrigger extends Trigger {
    static readonly type: string = "DamageAllTrigger";

    public damage: number = 10;
}

class DamageAllSystem extends TriggerSystem {
    readonly triggerType: string = DamageAllTrigger.type;

    public Run(payload?: any): void {
        let data = payload as DamageAllTrigger;
        console.log("run");
        let healthComponents = getComponents<HealthComponent>(HealthComponent);
        console.log(healthComponents);

        healthComponents.forEach(component => {
            if (component.entityId != data.originEntityId) {
                console.log(`Damaging Entity ${component.entityId} with ${data.damage}`);
                component.health -= data.damage    
            }
        });
    }
}


function createEntity(): Entity {
    let entity: Entity = {
        id: nextEntityId++,
        components: [],
    } 
    entities.push(entity);

    return entity;
}


function createComponent<T extends Component>(entity: Entity, type: (new () => T)): T {
    let component: T = new type();
    component.entityId = entity.id;

    entity.components.push(component);
    components.push(component);

    return component;
}

function getComponents<T extends Component>(type: (new () => T)): Array<T> {
    let baseComponent: T = new type();
    return components.filter(component => component.type === baseComponent.type) as Array<T>;
}

function getComponentProperty(entity: Entity, component: Component, propertyName: string): any {

}

function getEntityComponent<T extends Component>(entity: Entity, type: string): Array<T> {
    return entity.components.filter(component => component.GetType() == type) as Array<T>;
}


let player = createEntity();
createComponent<HealthComponent>(player, HealthComponent);
createComponent<DamageComponent>(player, DamageComponent);
console.log(player.components);

let enemy = createEntity();
createComponent<HealthComponent>(enemy, HealthComponent);

const damageAllSystem = new DamageAllSystem();
damageAllSystem.Initialize();
eventBus.dispatch<DamageAllTrigger>(DamageAllTrigger.type, { originEntityId: player.id, damage: 10 });
console.log((enemy.components[0] as HealthComponent).health);
*/