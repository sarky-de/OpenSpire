import { ENTITY_INVALID } from "./ECSConstants";

export const components = new Array<Component>();

export abstract class Component {
    static readonly type: string;

    public entityId: number = ENTITY_INVALID;

    public get type() {
        return Component.type;
    }
}
