import * as cc from "cc";
import { MobxComponent } from "db://game-client-base/utils/mobx-component";
import { IGameService } from "../services/game-service";
import gameContainer, { TYPES } from "../game-container";
const { ccclass, property } = cc._decorator;

@ccclass
export class BettingArea extends MobxComponent {
  private gameService: IGameService;

  @property(cc.Label)
  protected totalBetsLabel: cc.Label = null;

  @property
  protected betChoice: string = "";

  constructor() {
    super();

    this.gameService = gameContainer.get<IGameService>(TYPES.GameService);
  }

  protected placeBet() {
    const amount = 50;
    this.gameService.placeBet(this.betChoice, amount);
  }
}
