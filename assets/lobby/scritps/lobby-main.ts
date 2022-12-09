import { _decorator, Component, director, Scene } from "cc";
const { ccclass } = _decorator;
@ccclass("LobbyMain")
export class LobbyMain extends Component {
  sceneMapping = {
    "1": "dragon-tiger",
  };

  loadGame(event, gameId: number) {
    const isInDevMachine =
      window.location.href.toLocaleLowerCase().indexOf("localhost") > 0;

    if (isInDevMachine) {
      director.loadScene(
        this.sceneMapping[gameId.toString()],
        (error: null | Error, scene?: Scene) => {
          error && console.log(error);
        }
      );
    } else {
      window.location.href = `${window.location.origin}/poc-game-client-${gameId}`;
    }
  }
}
