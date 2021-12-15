import { GameState } from '../../Core/GameState';
import { Logger } from '../../Core/Logger';
import { Battle } from '../Battle';

export class EndBattlePhase implements GameState {
    private readonly _battle: Battle;

    constructor(battle: Battle) {
        this._battle = battle;
    }

    Enter(): void {
        Logger.info('EndBattlePhase Enter');
    }

    Exit(): void {
        Logger.info('EndBattlePhase Exit');
    }

    Run(): void {
        Logger.info('EndBattlePhase Run');
    }
}
