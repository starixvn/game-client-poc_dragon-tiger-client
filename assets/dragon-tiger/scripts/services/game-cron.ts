import inversify from "inversify";
import { InMemoryGameService } from "./game-service";

export class GameResult {
  constructor(
    public roundId: number,
    public dragonCardPoint: number,
    public tigerCardPoint: number
  ) {}

  get isDragonWin() {
    return this.dragonCardPoint > this.tigerCardPoint;
  }

  get isTigerWin() {
    return this.tigerCardPoint > this.dragonCardPoint;
  }

  get isTie() {
    return this.tigerCardPoint == this.dragonCardPoint;
  }

  static generateResult(roundId: number): GameResult {
    return new GameResult(
      roundId,
      GameResult.randomCard(),
      GameResult.randomCard()
    );
  }

  static randomCard(): number {
    return Math.floor(Math.random() * 12 + 1);
  }
}

export interface IGameCron {
  start(gameService: InMemoryGameService): void;
  stop(): void;
}

@inversify.injectable()
export class GameCron implements IGameCron {
  currentRoundId = 1;
  startRoundTime = 15;
  remainingTime = 0;
  histories = new Array<GameResult>();
  intervalId: NodeJS.Timer;
  gameService: InMemoryGameService;

  start(gameService: InMemoryGameService) {
    this.gameService = gameService;
    this.remainingTime = this.startRoundTime;
    this.stop();
    this.intervalId = setInterval(this.proceed.bind(this), 1000);

    console.log(this.gameService);
  }

  proceed() {
    if (this.remainingTime <= 0) {
      const result = this.settle();
      this.gameService.settleBet(result);
      this.remainingTime = this.startRoundTime;
      this.currentRoundId++;
    } else {
      this.remainingTime--;
      this.gameService.updateGameData(this.currentRoundId, this.remainingTime);
    }

    console.log({
      remainingTime: this.remainingTime,
      roundId: this.currentRoundId,
      histories: this.histories,
    });
  }

  settle() {
    const gameResult = GameResult.generateResult(this.currentRoundId);

    this.histories.push(gameResult);

    return gameResult;
  }

  stop() {
    clearInterval(this.intervalId);
  }
}
