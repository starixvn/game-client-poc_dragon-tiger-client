import gameContainer, { TYPES } from "../game-container";
import inversify from "inversify";
import { gameStore } from "../stores/game-store";
import { GameResult, IGameCron } from "./game-cron";
import { GameData, Result } from "./game-data";
import { ISessionService } from "./session-service";

export interface IGameService {
  inGame(): Promise<Result>;
  placeBet(choice: string, amount: number): void;
  registerGameDataListener(name: string, listener: Function): void;
  removeGameDataListener(name: string): void;
  outGame(): void;
}

@inversify.injectable()
export class InMemoryGameService implements IGameService {
  private gameData: GameData = new GameData();
  private listeners: { [key: string]: Function } = {};
  private gameCron: IGameCron;
  private sessionService: ISessionService;

  constructor() {
    this.init();
  }

  private init() {
    this.sessionService = gameContainer.get<ISessionService>(
      TYPES.SessionService
    );
    this.gameCron = gameContainer.get<IGameCron>(TYPES.GameCron);
    this.gameCron.start(this);
  }

  inGame(): Promise<Result> {
    this.gameData.playerJoin(this.sessionService.getPlayerSession());

    return Promise.resolve(new Result());
  }

  placeBet(choice: string, amount: number): void {
    this.gameData.receiveBet(
      this.sessionService.getPlayerSession(),
      choice,
      amount
    );

    gameStore.update({
      totalBet: {
        dragon: this.gameData.totalDragon,
        tiger: this.gameData.totalTiger,
      },
    });
  }

  registerGameDataListener(name: string, listener: Function): void {
    this.listeners[name] = listener;
  }

  removeGameDataListener(name: string): void {
    throw new Error("Method not implemented.");
  }

  outGame(): void {
    throw new Error("Method not implemented.");
  }

  settleBet(result: GameResult) {
    console.log(result);
    gameStore.update({
      result: {
        round: {
          roundId: result.roundId,
          settlementResult: {
            dragon: result.isDragonWin,
            tiger: result.isTigerWin,
            tie: result.isTie,
          },
        },
      },
      totalBet: {
        dragon: 0,
        tiger: 0,
      },
    });

    this.gameData.reset();
  }

  updateGameData(roundId: number, remainingTime: number) {
    gameStore.update({ roundInfo: { roundId, remainingTime } });
  }
}
