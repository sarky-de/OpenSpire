import { GameState } from "./GameState";

export class GameStateManager {
    // KLUDGE: Should _currentState ever be undefined?
    protected _currentState: GameState | undefined;

    // TODO: Is this necessary?
    private _gameStates: Array<GameState>;

    public constructor(gameStates: Array<GameState>) {
        this._gameStates = gameStates;
        this._currentState = gameStates[0];
    }

    public Next(): void {
        this._currentState?.Exit();
        this._currentState?.nextState?.Enter();
        this._currentState = this._currentState?.nextState;
    }    
}