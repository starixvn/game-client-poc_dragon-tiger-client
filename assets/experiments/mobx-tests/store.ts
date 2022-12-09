import mobx from "mobx";
const { makeObservable, observable, computed, action } = mobx;

type ReactionValue = {
  counter: number;
  text: string;
};

class ComponentStore {
  constructor() {
    makeObservable(this);
  }

  @observable counter = 0;
  @observable val1 = 0;
  @observable reactionValue: ReactionValue = {
    counter: 0,
    text: "couter text",
  };

  @action increaseCounter() {
    this.counter++;
    this.reactionValue.counter++;
  }

  @computed get doubleCounter() {
    return this.counter * 2;
  }
}

export const componentStore = new ComponentStore();
