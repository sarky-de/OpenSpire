import { Component } from "./Component";
import { createComponent } from "./ECS";
import { createEntity } from "./Entity";

class TestComponent extends Component {
    static readonly type: string = "TestComponent";
}

test("Entity ID increments with each entity created", () => {
    const e1 = createEntity();
    const e2 = createEntity();
    expect(e2.id).toBeGreaterThan(e1.id);
});

test("Entity components are added", () => {
    const e = createEntity();
    expect(e.components.length).toBe(0);
    const c = createComponent(e, TestComponent);
    expect(e.components).toContain(c);
    expect(e.components.length).toBe(1);
});
