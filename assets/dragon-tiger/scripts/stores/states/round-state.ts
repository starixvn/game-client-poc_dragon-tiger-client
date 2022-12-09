import mobx from "mobx";
const { makeAutoObservable, action } = mobx;

class RoundState {
  constructor() {
    makeAutoObservable(this);
  }

  public roundId: number = 0;
  public remainingTime: number = 0;

  @action updateRoundState(roundId: number, remainingTime: number) {
    this.roundId = roundId;
    this.remainingTime = remainingTime;
  }

  update(data: { roundInfo: { roundId: number; remainingTime: number } }) {
    if (data?.roundInfo) {
      this.updateRoundState(
        data.roundInfo.roundId,
        data.roundInfo.remainingTime
      );
    }
  }
}

export const roundState = new RoundState();
