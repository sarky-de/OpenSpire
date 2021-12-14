import { GameState } from "../../Core/GameState";
import { Logger } from "../../Core/Logger";
import { Battle } from "../Battle";
import { TurnStartedTrigger } from "../Triggers/Phases/TurnStartedTrigger";

export class StartTurnPhase implements GameState {
    private readonly _battle: Battle;

    constructor(battle: Battle) {
        this._battle = battle;
    }

    Enter(): void {
        Logger.info("StartTurnPhase Enter");
    }
    
    Exit(): void {
        Logger.info("StartTurnPhase Exit");
    }

    Run(): void {
        Logger.info("StartTurnPhase Run");

        this._battle.dispatchEvent<TurnStartedTrigger>(TurnStartedTrigger.type, { originEntityId: this._battle.currentPlayer });
    }
}
