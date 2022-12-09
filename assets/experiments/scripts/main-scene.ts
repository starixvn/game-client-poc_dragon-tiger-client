import * as cc from "cc";
const { _decorator, Component, director } = cc;
const { ccclass, property } = _decorator;
import _ from "lodash";
import mobx from "mobx";
import { componentStore } from "../mobx-tests/store";
import { MobxComponent } from "db://game-client-base/utils/mobx-component";
import { GameInitializer } from "../../dragon-tiger/scripts/game-initializer";
const { autorun, configure } = mobx;

configure({ enforceActions: "observed", useProxies: "ifavailable" });

@ccclass
export class MainScene extends MobxComponent {
  @property(cc.Label)
  counterText: cc.Label = null;

  start() {
    this.schedule(this.increaseCounter, 1);
  }

  onLoad() {
    this.componentName = MainScene.name;
    this.addAutoRun(["renderCounter"]);
    super.onLoad();
  }

  public renderCounter() {
    this.counterText.string = `Main Computed: ${componentStore.doubleCounter.toString()}`;
    console.log("Tasks left with delay: " + componentStore.counter);
  }

  protected increaseCounter() {
    componentStore.increaseCounter();

    if (componentStore.counter == 10) {
      this.unschedule(this.increaseCounter);
    }
  }

  changeState() {
    componentStore.val1 = Math.random();
  }

  loadPrefabLoaderSamples() {
    director.loadScene(
      "prefab-loader-tests",
      (error: null | Error, scene?: cc.Scene) => {
        error && console.log(error);
      }
    );
  }

  loadBigroadScoreboardSamples() {
    director.loadScene(
      "test-scoreboard",
      (error: null | Error, scene?: cc.Scene) => {
        error && console.log(error);
      }
    );
  }

  openDragonTigerGame() {
    const initializer = new GameInitializer();

    initializer.runGame();
  }
}
