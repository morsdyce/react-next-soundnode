import { action, computed, observable } from 'mobx';
import uuid from 'uuid';

export class NotificationsStore {
  @observable _notifications = new Map();

  @action addNotification({ type, title }) {
    const id = uuid.v4();
    this._notifications.set(id, { id, type, title });
  }

  @action dismissNotification(id) {
    this._notifications.delete(id);
  }

  @computed get notifications() {
    return Array.from(this._notifications.values());
  }
}
