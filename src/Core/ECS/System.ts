/**
 * A System is used to transform data stored on the components.
 */
export abstract class System {
    public abstract Initialize(): void;
    public abstract Destroy(): void;
    public abstract Run(payload?: any): void;
}
