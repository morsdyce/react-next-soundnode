import { action, computed, observable } from 'mobx';
import { tracksStore } from './index';

export class PlayerStore {
  @observable currentSongIndex = null;
  @observable queue = [];
  @observable isPlaying = false;

  @action play(id) {
    let songIndex = this.queue.findIndex(queueItem => id === queueItem.id);

    if (songIndex === -1) {
      const newLength = this.queue.push(id);
      songIndex = newLength - 1;
    }

    this.currentSongIndex = songIndex;
    this.isPlaying = true;
  }

  @action stop() {
    this.isPlaying = false;
  }

  @action addToQueue(song) {
    this.queue.push(song);
  }

  @action nextSong() {
    if (!this.currentSongIndex) {
      return;
    }

    if (this.currentSongIndex < this.queue.length) {
      this.currentSongIndex = this.currentSongIndex + 1;
    }
  }

  @action prevSong() {
    if (!this.currentSongIndex) {
      return;
    }

    if (this.currentSongIndex > 0) {
      this.currentSongIndex = this.currentSongIndex - 1;
    }
  }

  @action setIsPlaying(isPlaying) {
    this.isPlaying = isPlaying;
  }

  @computed get currentSong() {
    if (this.currentSongIndex === null) {
      return;
    }

    const id = this.queue[this.currentSongIndex];

    if (!id) {
      return null;
    }


    return tracksStore.getById(id);
  }
}
