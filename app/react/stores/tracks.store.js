import { observable, action, computed, transaction } from 'mobx';
import { flow, filter, uniqBy, map, set, find } from 'lodash/fp';
import { fetch } from '../utils/api.utils';
import { Track } from '../models/track';

export class TracksStore {
  @observable
  _tracks = new Map();

  async loadTracksInfo(trackIds) {
    const urns = trackIds
      .map(trackId => `soundcloud:tracks:${trackId}`)
      .join(',');

    const tracksResponse = await fetch({
      url: 'tracks',
      data: {
        urns
      }
    });

    transaction(() => {
      tracksResponse.forEach(({ id, likes_count }) => {
        const track = this.getById(id);

        if (!track) {
          return;
        }

        track.setLikes(likes_count);
      });
    });
  }

  async getFavoritesIds() {
    const url =
      'https://api.soundcloud.com/me/favorites/ids.json?linked_partitioning=1&limit=200';

    const likes = await fetch({
      url,
      isAbsolute: true
    });

    transaction(() => {
      likes.collection.forEach(id => {
        const track = this.getById(id);
        if (!track) {
          return;
        }

        track.setFavorite(true);
      });
    });
  }

  async fetchFavorites() {
    const response = await fetch({
      apiVersion: 1,
      url: 'me/favorites',
      label: 'favorites',
      data: {
        linked_partitioning: 1
      }
    });

    const tracks = (response.collection || [])
      .filter(track => {
        return track.kind === 'track' && track.streamable;
      })
      .map(track => ({ ...track, user_favorite: true }));

    this.setTracks(tracks);
  }

  @action
  setTracks(tracks) {
    const trackIds = [];

    tracks.forEach(track => {
      trackIds.push(track.id);
      this._tracks.set(track.id, new Track(track));
    });

    this.loadTracksInfo(trackIds);
  }

  @computed
  get tracks() {
    return Array.from(this._tracks.values());
  }

  @computed
  get favorites() {
    return Array.from(this._tracks.values()).filter(
      track => track.user_favorite
    );
  }

  getById(id) {
    return this._tracks.get(id);
  }
}
