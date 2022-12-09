import { roundHistoryState } from "../stores/states/round-history-state";
import { BigRoad, BigRoadOptions } from "db://game-client-component/index";

import * as cc from "cc";
import { MobxComponent } from "db://game-client-base/utils/mobx-component";
const { ccclass, property } = cc._decorator;

@ccclass
export class Scoreboard extends MobxComponent {
  private bigRoad: BigRoad = null;

  onLoad() {
    this.componentName = "Scoreboard";
    this.addAutoRun(["renderScoreboard"]);
    super.onLoad();
  }

  @property([cc.Prefab])
  layerPrefabs: cc.Prefab[] = [];

  @property(cc.SpriteFrame)
  backgroundFrame!: cc.SpriteFrame;

  protected onInitialize(node: cc.Node) {
    const bigRoad = node.getComponent(BigRoad);
    const bigRoadOptions: BigRoadOptions = {
      layers: [],
      padding: 5,
      item: { padding: 3 },
      background: this.backgroundFrame,
    };

    if (bigRoad) {
      bigRoad.initialize(bigRoadOptions);

      this.bigRoad = bigRoad;

      setTimeout(() => {
        // Should study here why we use set timeout
        this.renderScoreboard();
      }, 1);
    }
  }

  protected renderScoreboard() {
    const rounds = roundHistoryState.roundsForScoreboard;
    this.bigRoad && this.bigRoad.render(rounds);
  }
}
