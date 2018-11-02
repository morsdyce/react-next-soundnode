import { observable, action } from 'mobx';
import { fetch } from '../utils/api.utils';

class User {
  constructor(user) {
    Object.assign(this, user);
  }
}

export class AuthStore {
  @observable user = null;
  @observable accessToken = null;

  async fetchUser() {
    const user = await fetch({
      url: 'me',
      label: 'user'
    });

    this.setUser(user);
  }

  @action setToken(accessToken) {
    this.accessToken = accessToken;
  }

  @action setUser(user) {
    this.user = new User(user);
  }
}
