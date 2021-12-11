export abstract class System {
    public abstract Initialize(): void;

    public abstract Run(payload?: any): void;
}
