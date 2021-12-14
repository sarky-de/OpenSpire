import { GameState } from "../../Core/GameState";
import { Logger } from "../../Core/Logger";
import { Battle } from "../Battle";

export class StartBattlePhase implements GameState {
    private readonly _battle: Battle;

    constructor(battle: Battle) {
        this._battle = battle;
    }

    Enter(): void {
        Logger.info("StartBattlePhase Enter");
    }
    
    Exit(): void {
        Logger.info("StartBattlePhase Exit");
    }

    Run(): void {
        Logger.info("StartBattlePhase Run");

        this._battle.switchPhase(Battle.PHASE_TURN_START);
    }
}
