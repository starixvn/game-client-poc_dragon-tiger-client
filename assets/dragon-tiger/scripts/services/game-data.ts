import { IPlayerSession } from "./session-service";

export class Result {
  constructor(
    public isSuccessful: boolean = true,
    errorCode?: string,
    errorMessage?: string
  ) {}
}

export class Bet {
  dragon: number;
  tiger: number;
}

const dragonChoiceName = "dragon";
const tigerChoiceName = "tiger";

export class PlayerBet {
  bet: Bet = { dragon: 0, tiger: 0 };

  constructor(public session: IPlayerSession) {}
}

export class GameData {
  playerBets = new Array<PlayerBet>();

  playerJoin(session: IPlayerSession) {
    const newPlayer = new PlayerBet(session);

    this.playerBets.push(newPlayer);

    return newPlayer;
  }

  reset() {
    this.playerBets = new Array<PlayerBet>();
  }

  receiveBet(session: IPlayerSession, betChoice: string, amount: number) {
    let player = this.playerBets.find(
      (playerBet) => playerBet.session.playerId == session.playerId
    );
    if (!player) {
      player = this.playerJoin(session);
    }

    player.bet.dragon += betChoice == dragonChoiceName ? amount : 0;
    player.bet.tiger += betChoice == tigerChoiceName ? amount : 0;
  }

  get totalDragon() {
    return this.playerBets?.reduce((total, player) => {
      return total + player.bet.dragon;
    }, 0);
  }

  get totalTiger() {
    return this.playerBets?.reduce((total, player) => {
      return total + player.bet.tiger;
    }, 0);
  }
}
