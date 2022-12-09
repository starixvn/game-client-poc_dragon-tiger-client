import "reflect-metadata";
import inversify from "inversify";
import { GameCron, IGameCron } from "./services/game-cron";
import { IGameService, InMemoryGameService } from "./services/game-service";
import {
  ISessionService,
  InMemorySessionService as InMemorySessionService,
} from "./services/session-service";

export const TYPES = {
  GameService: Symbol.for("GameService"),
  GameCron: Symbol.for("GameCron"),
  SessionService: Symbol.for("SessionService"),
};

let gameContainer = new inversify.Container();
gameContainer.bind<IGameCron>(TYPES.GameCron).to(GameCron).inSingletonScope();
gameContainer
  .bind<IGameService>(TYPES.GameService)
  .to(InMemoryGameService)
  .inSingletonScope();
gameContainer
  .bind<ISessionService>(TYPES.SessionService)
  .to(InMemorySessionService)
  .inSingletonScope();

export default gameContainer;
