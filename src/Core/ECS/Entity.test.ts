import { Component } from './Component';
import { ECS } from './ECS';

const ecs = ECS.getInstance();

class TestComponent extends Component {
    readonly type: string = 'TestComponent';
}

beforeEach(() => {
    ecs.initialize();
});

afterEach(() => {
    ecs.destroy();
});

test('Entity ID increments with each entity created', () => {
    const e1 = ecs.createEntity();
    const e2 = ecs.createEntity();
    expect(e2.id).toBeGreaterThan(e1.id);
});

test('Entity components are added', () => {
    const e = ecs.createEntity();
    expect(e.components.size).toBe(0);
    const c = ecs.createComponent(e, TestComponent);
    expect(e.components.values()).toContain(c);
    expect(e.components.size).toBe(1);
});

test('Same component cannot be added to Entity multipled times', () => {
    const e = ecs.createEntity();
    expect(e.components.size).toBe(0);
    ecs.createComponent(e, TestComponent);
    const c2 = ecs.createComponent(e, TestComponent);
    expect(c2).toBeUndefined();
    expect(e.components.size).toBe(1);
});
