import mobx from "mobx";
import { Bet } from "../../services/game-data";
import { IState } from "../game-store";
const { makeAutoObservable, action } = mobx;

class BetState implements IState {
  constructor() {
    makeAutoObservable(this);
  }

  public totalBet: Bet = { dragon: 0, tiger: 0 };

  @action update(data: { totalBet: Bet }) {
    if (data?.totalBet) {
      this.totalBet.dragon = data.totalBet.dragon;
      this.totalBet.tiger = data.totalBet.tiger;
    }
  }
}

export const betState = new BetState();
