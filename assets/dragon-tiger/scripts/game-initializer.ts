import * as cc from "cc";
import gameContainer, { TYPES } from "./game-container";
import { IGameService } from "./services/game-service";
const { director } = cc;

export class GameInitializer {
  runGame() {
    gameContainer.get<IGameService>(TYPES.GameService);
    director.loadScene(
      "dragon-tiger",
      (error: null | Error, scene?: cc.Scene) => {
        error && console.log(error);
      }
    );
  }
}
