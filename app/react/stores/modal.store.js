import { observable, action } from 'mobx';
import uuid from 'uuid';
export class ModalStore {
  @observable
  modals = [];

  @action
  openModal({ type, params }) {
    this.modals.push({ id: uuid.v4(), type, params });
  }

  @action
  closeModal(id) {
    this.modals = this.modals.filter(modal => modal.id === id);
  }
}
