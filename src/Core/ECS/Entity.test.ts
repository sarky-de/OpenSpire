import { Component } from "./Component";
import { ECS } from "./ECS";
import { createEntity } from "./Entity";

class TestComponent extends Component {
    static readonly type: string = "TestComponent";
}

beforeEach(() => {
    ECS.getInstance().initialize();
});

afterEach(() => {
    ECS.getInstance().destroy();
})

test("Entity ID increments with each entity created", () => {
    const e1 = createEntity();
    const e2 = createEntity();
    expect(e2.id).toBeGreaterThan(e1.id);
});

test("Entity components are added", () => {
    const ecs = new ECS();
    const e = createEntity();
    expect(e.components.length).toBe(0);
    const c = ecs.createComponent(e, TestComponent);
    expect(e.components).toContain(c);
    expect(e.components.length).toBe(1);
});
