import { GameState } from "./GameState";

type GameStateEntry = {
    state: GameState,
    nextStateNames: Array<string>
};

export class GameStateManager {
    protected _currentState: GameState | undefined;
    protected _currentStateName: string;
    protected _gameStates: Map<string, GameStateEntry>;

    public constructor() {
        this._gameStates = new Map<string, GameStateEntry>();
        this._currentStateName = "";
    }

    public Add(stateName: string, state: GameState, nextStateNames: Array<string>): void {
        this._gameStates.set(stateName, { state, nextStateNames });
    }

    public Switch(newStateName: string): boolean {
        if (!this._gameStates.has(newStateName)) {
            return false;
        }

        const newStateEntry: GameStateEntry = this._gameStates.get(newStateName)!;
        if (this._currentState == undefined) {
            this.SetState(newStateName, newStateEntry.state);
            return true;
        }

        const currentStateEntry: GameStateEntry = this._gameStates.get(this._currentStateName)!;
        if (currentStateEntry.nextStateNames.includes(newStateName)) {
            this.SetState(newStateName, newStateEntry.state);
            return true;
        }

        return false;
    }

    public Run(): void {
        this._currentState?.Run();
    }

    private SetState(newStateName: string, newState: GameState): void {
        if (this._currentState != undefined) {
            this._currentState.Exit();
        } 
        newState.Enter();
        this._currentState = newState;
        this._currentStateName = newStateName;
    }
}