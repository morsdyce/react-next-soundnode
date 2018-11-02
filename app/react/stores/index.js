import { AuthStore } from './auth.store';
import { TracksStore } from './tracks.store';
import { NetworkStore } from './network.store';
import { NotificationsStore } from './notifications.store';
import { PlayerStore} from './player.store';
import { ChartsStore } from './charts.store';
import { ModalStore } from './modal.store';
import { PlaylistsStore } from './playlists.store';

export const authStore = new AuthStore();
export const tracksStore = new TracksStore();
export const networkStore = new NetworkStore();
export const notificationsStore = new NotificationsStore();
export const playerStore = new PlayerStore();
export const chartsStore = new ChartsStore();
export const modalStore = new ModalStore();
export const playlistsStore = new PlaylistsStore();

const stores = {
  authStore,
  tracksStore,
  networkStore,
  notificationsStore,
  playerStore,
  chartsStore,
  modalStore,
  playlistsStore
};

export default stores;
