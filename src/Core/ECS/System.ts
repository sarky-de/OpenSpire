export const systems: Array<System> = new Array<System>();

export abstract class System {
    public abstract Initialize(): void;
    public abstract Destroy(): void;
    public abstract Run(payload?: any): void;
}
