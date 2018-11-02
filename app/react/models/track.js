import { authStore } from '../stores';
import { fetch } from '../utils/api.utils';
import * as log from '../utils/logger.utils';
import { action, observable } from 'mobx';

export class Track {
  @observable artwork_url;
  @observable likes_count;
  @observable reposts_count;
  @observable user_favorite;
  @observable user_reposted;
  @observable favoritings_count;

  constructor(track) {
    Object.assign(this, track);
  }

  async toggleFavorite() {
    const userId = authStore.user.id;

    if (!userId) {
      return;
    }

    try {
      const response = await fetch({
        apiVersion: 1,
        url: `users/${userId}/favorites/${this.id}.json`,
        method: this.user_favorite ? 'DELETE' : 'PUT',
        notifications: {
          success: this.user_favorite
            ? 'Song removed from likes!'
            : 'Song added to likes!'
        }
      });

      this.setFavorite(!this.user_favorite);

      return response;
    } catch (err) {
      log.error(err);
    }
  }

  async toggleRepost() {
    const userId = authStore.user.id;

    if (!userId) {
      return;
    }

    try {
      const response = await fetch({
        apiVersion: 1,
        url: `e1/me/track_reposts/${this.id}`,
        method: this.user_reposted ? 'DELETE' : 'PUT',
        notifications: {
          success: this.user_reposted
            ? 'Song removed from likes!'
            : 'Song added to likes!'
        }
      });

      this.setRepost(!this.user_reposted);

      return response;
    } catch (err) {
      log.error(err);
    }
  }

  @action
  setFavorite(isFavorite) {
    this.user_favorite = isFavorite;
  }

  @action
  setLikes(likes) {
    this.favoritings_count = likes;
  }

  @action
  setRepost(isReposted) {
    this.user_reposted = isReposted;
  }
}
