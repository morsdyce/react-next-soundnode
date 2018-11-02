import React, { Fragment, Component } from 'react';
import { formatSongDuration } from '../../../utils/track.utils';

export class TrackPreview extends Component {
  render() {
    const {
      id,
      artwork_url = '',
      title,
      user,
      likes_count,
      favoritings_count,
      comment_count,
      reposts_count,
      duration,
      type,
      genre,
      license,
      permalink_url
    } = this.props;

    return (
      <Fragment>
        <div
          className="songList_item_container_artwork"
          ng-class="{ active: hover }"
          ng-mouseover="hover = true"
          ng-mouseleave="hover = false">
          <span
            className="songList_item_song_button"
            id="{{ data.id }}"
            song
            data-song-url="{{ data.stream_url }}"
            data-song-thumbnail="{{ data.artwork_url }}"
            data-song-title="{{ data.title }}"
            data-song-user="{{ data.user.username }}"
            data-song-user-id="{{ data.user.id }}"
            data-song-id="{{ data.id }}">
            <i className="fa fa-play" />
            <i className="fa fa-pause" />
          </span>
          <img
            ng-controller="AppCtrl"
            ng-src="{{ showBigArtwork (data.artwork_url) }}"
            onError="if (this.src != 'public/img/logo-short.png') this.src = 'public/img/logo-short.png';"
            alt="{{ data.title }}"
            className="songList_item_artwork"
          />
          <div className="songList_item_song_social_details">
            <span className="songList_comment_count">
              <i className="fa fa-comments" />
              {Math.round(comment_count)}
            </span>
            <span className="songList_likes_count">
              <i className="fa fa-heart" />
              {Math.round(likes_count || favoritings_count)}
            </span>
            <span className="songList_reposts_count" ng-if="data.reposts_count">
              <i className="fa fa-retweet" />
              {Math.round(reposts_count)}
            </span>
          </div>
        </div>

        <section className="songList_item_inner">
          <h2
            className="songList_item_song_tit selectable-text"
            title="{{ data.title }}"
            ui-sref="track({id: {{data.id}}})">
            {title}
          </h2>

          <h3 className="songList_item_song_info clearfix">
            <div className="songList_item_song_user selectable-text">
              <a className="pointer" ui-sref="profile({id: {{data.user.id}}})">
                {user.username}
              </a>
              <span
                className="songList_item_repost"
                ng-if="type === 'track-repost'">
                <i className="fa fa-retweet" />
                <a
                  className="pointer"
                  ui-sref="profile({ id: {{ user.id }} })"
                  title="Reposted by {{ user.username }}">
                  {user.username}
                </a>
              </span>
            </div>
            <div ng-controller="AppCtrl" className="songList_item_song_length">
              {formatSongDuration(duration)}
            </div>
          </h3>

          <div className="songList_item_song_details">
            <div className="songList_item_actions">
              <a
                favorite-song
                data-song-id="{{ data.id }}"
                favorite="data.user_favorite"
                count="data.favoritings_count"
                ng-class="{liked: user_favorite}"
                title="{{data.user_favorite ? 'Unlike' : 'Like'}}">
                <i className="fa fa-heart" />
              </a>
              <a
                reposted-song
                data-song-id="{{ data.id }}"
                reposted="data.user_reposted"
                ng-class="{ reposted: user_reposted }"
                title="{{data.user_reposted ? 'Unpost' : 'Repost'}}"
                ng-if="user.id !== $root.userId">
                <i className="fa fa-retweet" />
              </a>
              <a
                data-song-id="{{ data.id }}"
                data-song-name="{{ data.title }}"
                playlist
                title="Add to playlist">
                {' '}
                <i className="fa fa-bookmark" />
              </a>
              <a
                href="{{ data.permalink_url }}"
                open-external
                target="_blank"
                title="Permalink">
                {' '}
                <i className="fa fa-external-link" />
              </a>
              <a
                copy-directive
                data-copy="{{ data.permalink_url }}"
                title="Copy">
                {' '}
                <i className="fa fa-clipboard" />
              </a>
            </div>
            <div className="songList_item_additional_details">
              <span
                className="songList_item_genre"
                ui-sref="tag({name: data.genre})">
                #{genre}
              </span>
              <span className="songList_item_license">{license}</span>
            </div>
          </div>
        </section>
      </Fragment>
    );
  }
}

export default TrackPreview;
