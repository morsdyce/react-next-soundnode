import React, { Fragment, Component } from 'react';
import cx from 'classnames';
import CopyToClipboard from 'react-copy-to-clipboard';

import { formatSongDuration, showBigArtwork } from '../../../utils/track.utils';
import {Link} from 'react-router-dom';
import FavoriteButton from './favorite-button';
import RepostButton from './repost-button';
import ExternalLink from './external-link';
import PlaylistButton from './playlist-button';
import { inject, observer } from 'mobx-react';


@inject((stores, props) => ({
  playSong: () => stores.playerStore.play(props.id),
  pauseSong: () => stores.playerStore.stop(),
  addNotification: (...args) => stores.notificationsStore.addNotification(...args),
  isPlaying:
    stores.playerStore.currentSong &&
    stores.playerStore.currentSong.id === props.id &&
    stores.playerStore.isPlaying
}))
@observer
export class TrackPreview extends Component {
  state = {
    hover: false
  };

  handleMouseEnter = () => {
    this.setState({ hover: true });
  };

  handleMouseLeave = () => {
    this.setState({ hover: false });
  };

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
      permalink_url,
      user_favorite,
      user_reposted
    } = this.props;

    const songListClass = cx({
      active: this.state.hover,
      songList_item_container_artwork: true
    });

    return (
      <Fragment>
        <div
          className={songListClass}
          onMouseEnter={this.handleMouseEnter}
          onMouseLeave={this.handleMouseLeave}
          onClick={
            this.props.isPlaying ? this.props.pauseSong : this.props.playSong
          }>
          <span className="songList_item_song_button">
            {!this.props.isPlaying && <i className="fa fa-play" />}
            {this.props.isPlaying && <i className="fa fa-pause" />}
          </span>
          <img
            src={showBigArtwork(artwork_url)}
            className="songList_item_artwork"
            alt={title}
          />
          <div className="songList_item_song_social_details">
            <span className="songList_comment_count">
              <i className="fa fa-comments" />
              {comment_count}
            </span>
            <span className="songList_likes_count">
              <i className="fa fa-heart" />
              {likes_count || favoritings_count}
            </span>
            {!reposts_count ? null : (
              <span className="songList_reposts_count">
                <i className="fa fa-retweet" />
                {reposts_count}
              </span>
            )}
          </div>
        </div>

        <section className="songList_item_inner">
          <h2 className="songList_item_song_tit selectable-text">
            <Link to={`track/${id}`}>{title}</Link>
          </h2>

          <h3 className="songList_item_song_info clearfix">
            <div className="songList_item_song_user selectable-text">
              <Link to={`profile/${user.id}`} className="pointer">
                {user.username}
              </Link>
              {type === 'track-repost' && (
                <span className="songList_item_repost">
                  <i className="fa fa-retweet" />
                  <a className="pointer" title={`Reposted by ${user.username}`}>
                    {user.username}
                  </a>
                </span>
              )}
            </div>
            <div className="songList_item_song_length">
              {formatSongDuration(duration)}
            </div>
          </h3>

          <div className="songList_item_song_details">
            <div className="songList_item_actions">
              <FavoriteButton id={id} />
              <RepostButton id={id} />
              <PlaylistButton id={id} name={title} />
              <ExternalLink href={permalink_url} as="a">
                <i title="Permalink" className="fa fa-external-link" />
              </ExternalLink>
              <CopyToClipboard
                text={permalink_url}
                onCopy={() =>
                  this.props.addNotification({
                    type: 'success',
                    title: 'Song url copied to clipboard!'
                  })
                }>
                <a title="Copy" href="">
                  {' '}
                  <i className="fa fa-clipboard" />
                </a>
              </CopyToClipboard>
            </div>
            <div className="songList_item_additional_details">
              <Link to={`tag/${genre}`} className="songList_item_genre">
                #{genre}
              </Link>
              <span className="songList_item_license">{license}</span>
            </div>
          </div>
        </section>
      </Fragment>
    );
  }
}

export default TrackPreview;
