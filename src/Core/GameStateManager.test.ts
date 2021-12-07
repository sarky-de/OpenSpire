import { GameState } from "./GameState";
import { GameStateManager } from "./GameStateManager";

class TestGameState implements GameState {
    private _nextState : GameState | undefined;
    private _isEnterCalled: boolean = false;
    private _isExitCalled: boolean = false;

    public constructor(nextState?: GameState) {
        this._nextState = nextState;
    }

    public get isEnterCalled() : boolean {
        return this._isEnterCalled;
    }

    public get isExitCalled() : boolean {
        return this._isExitCalled;
    }

    Enter(): void {
        this._isEnterCalled = true;
    }

    Exit(): void {
        this._isExitCalled = true;
    }

    get nextState(): GameState | undefined {
        return this._nextState;
    }
}

class TestGameStateManager extends GameStateManager {
    public get CurrentGameState() : GameState | undefined {
        return this._currentState;
    }    
}

test("Exit for current state is called when switching states", () => {
    const gs1 = new TestGameState();
    const gsm = new TestGameStateManager(new Array<GameState>(gs1));

    expect(gs1.isExitCalled).toBe(false);
    gsm.Next();
    expect(gs1.isExitCalled).toBe(true);
});

test("Enter for next state is called when switching states", () => {
    const gs1 = new TestGameState();
    const gs2 = new TestGameState(gs1);
    const gsm = new TestGameStateManager(new Array<GameState>(gs2, gs1));

    expect(gs1.isEnterCalled).toBe(false);
    gsm.Next();
    expect(gs1.isEnterCalled).toBe(true);
});

test("Next state is set correctly after switching states", () => {
    const gs1 = new TestGameState();
    const gs2 = new TestGameState(gs1);
    const gsm = new TestGameStateManager(new Array<GameState>(gs2, gs1));

    expect(gsm.CurrentGameState).toBe(gs2);
    gsm.Next();
    expect(gsm.CurrentGameState).toBe(gs1);
});
