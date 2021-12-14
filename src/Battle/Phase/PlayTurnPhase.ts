import { GameState } from "../../Core/GameState";
import { Logger } from "../../Core/Logger";
import { Battle } from "../Battle";

export class PlayTurnPhase implements GameState {
    private readonly _battle: Battle;

    constructor(battle: Battle) {
        this._battle = battle;
    }

    Enter(): void {
        Logger.info("PlayTurnPhase Enter");
    }
    
    Exit(): void {
        Logger.info("StartTurnPhase Exit");
    }

    Run(): void {
        Logger.info("StartTurnPhase Run");
    }
}
