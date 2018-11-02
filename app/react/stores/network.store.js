import { observable, action } from 'mobx';

export class NetworkStore {
  @observable requests = new Map();

  @action startNetwork(label) {
    const currentRequestCount = this.requests.get(label) || 0;

    this.requests.set(label, currentRequestCount + 1);
  }

  @action endNetwork(label) {
    const currentRequestCount = this.requests.get(label) || 0;

    this.requests.set(label, currentRequestCount - 1);
  }

  getByLabel(label) {
    return this.requests.get(label) > 0;
  }
}
