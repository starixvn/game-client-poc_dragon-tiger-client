import inversify from "inversify";

export interface IPlayerSession {
  playerId: number;
  playerName: string;
  balance: number;
}

export interface ISessionService {
  getPlayerSession(): IPlayerSession;
  setPlayerSession(playerSession: IPlayerSession): void;
}

@inversify.injectable()
export class InMemorySessionService implements ISessionService {
  playerSession: IPlayerSession = {
    balance: 10,
    playerId: 1,
    playerName: "player1",
  };

  setPlayerSession(playerSession: IPlayerSession): void {
    this.playerSession = playerSession;
  }

  getPlayerSession(): IPlayerSession {
    return this.playerSession;
  }
}
