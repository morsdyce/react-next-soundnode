import { observable, action } from 'mobx';
import { fetch } from '../utils/api.utils';

export class PlaylistsStore {
  @observable playlists = [];

  async fetchPlaylists() {
    const playlists = await fetch({
      apiVersion: 1,
      url: 'me/playlists',
      label: 'playlists',
      data: {
        limit: 125
      }
    });

    this.setPlaylists(playlists);
  }

  @action setPlaylists(playlists) {
    this.playlists = playlists;
  }
}
