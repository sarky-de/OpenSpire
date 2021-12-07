export interface GameState {
    Enter() : void;
    Exit() : void;
    get nextState() : GameState | undefined;
}