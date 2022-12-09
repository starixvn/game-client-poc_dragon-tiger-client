import mobx from "mobx";
import { IState } from "../game-store";
const { makeAutoObservable, action } = mobx;

export interface Card {
  card: number;
  type: number;
}

export interface Round {
  roundId: number;
  // result: {
  //   dragon: Card;
  //   tiger: Card;
  // };
  settlementResult: {
    dragon: boolean;
    tiger: boolean;
    tie: boolean;
  };
}

export interface RoundInScoreboard {
  value: boolean | undefined;
  metadata: {
    tie: boolean;
  };
}

class RoundHistoryState implements IState {
  constructor() {
    makeAutoObservable(this);
  }

  public rounds: Round[] = [];
  public latestRound: Round = {} as Round;

  public get length() {
    return this.rounds.length;
  }

  public get roundsForScoreboard() {
    return [...this.rounds].reverse().map(this.convertToScoreboardFormat);
  }

  public get currentRoundId() {
    return this.latestRound.roundId + 1 || 0;
  }

  @action addRound(round: Round, maxRounds: number = 100) {
    this.latestRound = round;

    this.rounds.unshift(round);

    if (this.length > maxRounds) {
      this.rounds.pop();
    }
  }

  update(data: {
    result: { round: Round; historyRounds: Round[]; maxRound: number };
  }) {
    if (data?.result) {
      console.log(data?.result);
      this.addRound(data.result.round);
    }
  }

  protected convertToScoreboardFormat(round: Round) {
    const settlementResult = round?.settlementResult ?? {
      tie: false,
      dragon: false,
      tiger: false,
    };

    return {
      value: settlementResult.tie ? undefined : settlementResult.dragon,
      metadata: {
        tie: settlementResult.tie,
      },
    };
  }
}

export const roundHistoryState = new RoundHistoryState();
