import * as cc from "cc";
const { ccclass, property } = cc._decorator;
import { MobxComponent } from "db://game-client-base/utils/mobx-component";
import { roundState } from "./stores/states/round-state";
import { betState } from "./stores/states/bet-state";

@ccclass
export class DragonTiger extends MobxComponent {
  @property(cc.Label)
  protected roundIdLabel: cc.Label = null;

  @property(cc.Label)
  protected countDownTimer: cc.Label = null;

  @property(cc.Label)
  protected dragonTotalBet: cc.Label = null;

  @property(cc.Label)
  protected tigerTotalBet: cc.Label = null;

  constructor() {
    super();
  }

  onLoad() {
    this.componentName = "DragonTiger";
    // This action should be used by typescript decorator
    this.addAutoRun([
      "renderRoundId",
      "renderCountdownTimer",
      "renderTotalBets",
    ]);
    super.onLoad();
  }

  renderRoundId() {
    if (this.roundIdLabel) {
      this.roundIdLabel.string = `Round Id: ${roundState.roundId}`;
    }
  }

  renderCountdownTimer() {
    if (this.countDownTimer) {
      this.countDownTimer.string = `Remaining Time: ${roundState.remainingTime}`;
    }
  }

  renderTotalBets() {
    this.tigerTotalBet.string = `${betState.totalBet.tiger}`;
    this.dragonTotalBet.string = `${betState.totalBet.dragon}`;
  }

  backToLobby() {
    const isInDevMachine =
      window.location.href.toLocaleLowerCase().indexOf("localhost") > 0;

    if (isInDevMachine) {
      cc.director.loadScene("lobby-main", (error: null | Error) => {
        error && console.log(error.message);
      });
    } else {
      window.location.href = `${window.location.origin}/poc-game-client-lobby`;
    }
  }
}
