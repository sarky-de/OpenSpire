import { ECS } from '../../../Core/ECS/ECS';
import { EnergyComponent } from '../../Components/Player/EnergyComponent';
import { TurnStartedTrigger } from '../../Triggers/Phases/TurnStartedTrigger';
import { RefillEnergySystem } from './RefillEnergySystem';

const ecs = ECS.getInstance();

beforeEach(() => {
    ecs.initialize();
});

afterEach(() => {
    ecs.destroy();
});

test('Energy is refilled', () => {
    const TARGET_ENERGY = 10;

    const entity = ecs.createEntity();
    const energyComponent = ecs.createComponent<EnergyComponent>(
        entity,
        EnergyComponent
    );
    energyComponent.energy = 0;
    energyComponent.maxEnergy = TARGET_ENERGY;

    ecs.createSystem<RefillEnergySystem>(RefillEnergySystem);
    expect(energyComponent.energy).toBe(0);
    ecs.eventBus.dispatch<TurnStartedTrigger>(TurnStartedTrigger.type, {
        originEntityId: entity.id
    });
    expect(energyComponent.energy).toBe(TARGET_ENERGY);
});
