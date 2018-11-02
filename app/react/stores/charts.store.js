import { action, computed, observable, transaction } from 'mobx';
import { filter, find, flow, map, set, uniqBy, compact } from 'lodash/fp';
import { GENRES } from '../constants/genres';
import { fetch } from '../utils/api.utils';
import * as log from '../utils/logger.utils';
import { tracksStore } from './index';

export class ChartsStore {
  @observable genre = 'all-music';

  @observable charts = new Map();

  async fetchCharts() {
    if (this.charts.has(this.genre)) {
      // first page is already loaded in cache
      return;
    }

    try {
      const tracksResponse = await fetch({
        url: 'charts',
        label: 'charts',
        data: {
          kind: 'top',
          genre: `soundcloud:genres:${this.genre}`,
          limit: 50
        }
      });

      const tracks = flow([
        filter(
          item =>
            item.type === 'track' ||
            item.type === 'track-repost' ||
            !!(item.track && item.track.streamable)
        ),
        uniqBy(item => item.track.id),
        map(item => {
          return set('stream_url', item.track.uri + '/stream', item.track);
        })
      ])(tracksResponse.collection);

      const nextPageUrl = tracksResponse.next_href;
      const trackIds = tracks.map((track) => track.id);

      transaction(() => {
        this.setCharts(this.genre, trackIds, nextPageUrl);
        tracksStore.setTracks(tracks);
      });

    } catch (error) {
      log.error('failed to fetch charts', { genre: this.genre }, error);
    } finally {
      tracksStore.getFavoritesIds();
    }
  }

  @action
  setGenre(genre) {
    this.genre = genre;
  }

  @action setCharts(genre, ids, nextPageUrl) {
    this.charts.set(genre, { ids, nextPageUrl });
  }

  @computed
  get genreTitle() {
    const genre = find({ link: this.genre }, GENRES);

    if (!genre) {
      return '';
    }

    return genre.title;
  }

  @computed get tracks() {
    const tracks = this.charts.get(this.genre);

    if (!tracks) {
      return [];
    }

    return flow([
      map((trackId) => tracksStore.getById(trackId)),
      compact
    ])(tracks.ids);
  }
}
