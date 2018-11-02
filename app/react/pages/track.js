import React from 'react';
import { inject, observer } from 'mobx-react';
import cx from 'classnames';

import { showBigArtwork } from '../utils/track.utils';
import { formatNumber } from '../utils/i18n.utils';

@inject((stores, props) => ({
  track: stores.tracksStore.getById(Number(props.match.params.id))
}))
@observer
export class Track extends React.Component {
  render() {
    const { track } = this.props;

    if (!track) {
      return null;
    }

    const likesClassName = cx({
      likes_count: true,
      liked: track.user_favorite
    });

    const likeButtonClassName = cx({
      button: true,
      follow_button: true,
      liked: track.user_favorite
    });

    return (
      <div className="trackView">
        <div className="trackDetails">
          <div className="additionalInfo">
            <div className="trackCover">
              <span className="songList_item_song_button">
                <i className="fa fa-play" />
                <i className="fa fa-pause" />
              </span>
              <img src={showBigArtwork(track.artwork_url)} alt={track.title} />
              <div className="details">
                <span className="playback_count">
                  <i className="fa fa-play" />{' '}
                  {formatNumber(track.playback_count)}
                </span>
                <span className={likesClassName}>
                  <i className="fa fa-heart" />{' '}
                  {formatNumber(track.favoritings_count)}
                </span>
              </div>
            </div>
          </div>
          <div className="content">
            <div className={likeButtonClassName}>
              <span>{track.user_favorite ? 'Liked' : 'Like'}</span>
            </div>
            <h1 className="selectable-text">{track.title}</h1>

            <h3
              ui-sref="profile({id: track.user.id})"
              className="user_name selectable-text">
              {track.user.username}
            </h3>
            <h4>Created: {track.created_at}</h4>

            <pre
              className="track_description selectable-text">
              {track.description}
            </pre>
            <div className="trackActions">
              <a
                className="button inline"
                href="{{ track.purchase_url }}"
                target="_blank"
                title="{{track.purchase_title}}"
                ng-if="track.purchase_title">
                {' '}
                <i className="fa fa-download" /> {track.purchase_title}
              </a>
              <a
                className="button inline"
                href="{{ track.permalink_url }}"
                target="_blank"
                title="Download on SoundCloud website"
                ng-if="track.downloadable">
                {' '}
                <i className="fa fa-download" /> Download
              </a>
              <a
                className="button inline"
                data-song-id="{{ track.id }}"
                data-song-name="{{ track.title }}"
                title="Add to playlist">
                {' '}
                <i className="fa fa-bookmark" /> Add to playlist
              </a>
              <a
                className="button inline"
                href="{{ track.permalink_url }}"
                target="_blank"
                title="Permalink">
                {' '}
                <i className="fa fa-external-link" /> Permalink
              </a>
              <a
                className="button inline"
                data-copy="{{ track.permalink_url }}"
                title="Copy">
                {' '}
                <i className="fa fa-clipboard" />
                Copy track link
              </a>
            </div>
          </div>
        </div>
        <div className="trackComments">
          <h2>Comments: ({track.comment_count})</h2>
        </div>
      </div>
    );
  }
}

export default Track;
