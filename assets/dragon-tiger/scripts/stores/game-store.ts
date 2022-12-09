import { betState } from "./states/bet-state";
import { roundHistoryState } from "./states/round-history-state";
import { roundState } from "./states/round-state";

export interface IState {
  update(data: unknown);
}

class GameStore {
  constructor(private states: Array<IState>) {}

  update(data: unknown) {
    this.states.forEach((state) => state.update(data));
  }
}

// This code should add state automatically
export const gameStore = new GameStore([
  betState,
  roundState,
  roundHistoryState,
]);
