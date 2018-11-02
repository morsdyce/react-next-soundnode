import React from 'react';
import { inject, observer } from 'mobx-react';
import { get } from 'lodash/fp';

@inject(stores => ({
  isPlaying: stores.playerStore.isPlaying,
  currentSong: stores.playerStore.currentSong,
  prevSong: () => stores.playerStore.prevSong(),
  nextSong: () => stores.playerStore.nextSong(),
  setIsPlaying: isPlaying => stores.playerStore.setIsPlaying(isPlaying)
}))
@observer
class Player extends React.Component {
  componentDidUpdate(prevProps) {
    if (!this.props.currentSong || !this.player) {
      return;
    }

    const previousStreamUrl = get('currentSong.stream_url', prevProps);
    const currentStreamUrl = get('currentSong.stream_url', this.props);
    if (currentStreamUrl !== previousStreamUrl && this.player) {
      this.player.src = `${
        this.props.currentSong.stream_url
      }?client_id=lD2yAVET8eVjwefecYVjlE9GXRWgs9F8`;
      this.player.play();
    }
    if (this.props.isPlaying !== prevProps.isPlaying && this.player) {
      if (!this.props.isPlaying) {
        this.player.pause();
      } else {
        this.player.play();
      }
    }
  }

  favoriteSong = () => {};

  togglePlaying = () => {
    if (!this.player) {
      return;
    }

    if (this.props.isPlaying) {
      this.player.pause();
      this.props.setIsPlaying(false);
    } else {
      this.player.play();
      this.props.setIsPlaying(true);
    }
  };

  render() {
    const { currentSong } = this.props;
    const title = currentSong ? currentSong.title : '';

    return (
      <div className="player">
        <div className="player_inner">
          <div className="player_progress_wrapper">
            <div className="player_progress">
              <span className="player_progress_bar" id="player-progress" />
            </div>
          </div>
          <div className="player_details">
            <img
              id="playerThumb"
              src="public/img/song-placeholder.png"
              alt=""
              className="player_thumb"
              ng-click="goToSong($event)"
            />

            <h2 id="playerTitle" className="player_title">
              {title}
            </h2>
            <h4 id="playerUser" className="player_user" />

            <div className="player_time">
              <span className="player_timeCurrent" id="player-timecurrent" />
              <span className="player_duration" id="player-duration" />
            </div>
            <div className="player_actions">
              {this.props.isPlaying && (
                <span className="player_favorite" onClick={this.favoriteSong}>
                  &nbsp;
                  <i className="fa fa-heart" />
                </span>
              )}
            </div>
          </div>
          <div className="player_controls">
            <span className="player_prevSong" onClick={this.props.prevSong}>
              <i className="fa fa-step-backward thin" />
            </span>
            <span
              className="player_play-pause"
              onClick={() => this.togglePlaying()}>
              {!this.props.isPlaying && <i className="fa fa-play" />}
              {this.props.isPlaying && <i className="fa fa-pause thin" />}
            </span>
            <span className="player_nextSong" onClick={this.props.nextSong}>
              <i className="fa fa-step-forward thin" />
            </span>
            <span className="player_lock">
              <i className="fa fa-lock thin" />
            </span>
            <span className="player_repeat">
              <i className="fa fa-repeat thin" />
            </span>
            <span className="player_shuffle">
              <i className="fa fa-random thin" />
            </span>
            <span className="player_queueList">
              <i className="fa fa-list thin" />
            </span>
          </div>
          <audio
            id="player"
            ref={node => {
              this.player = node;
            }}
            controls
            src=""
            className="player_currentSong"
          />
        </div>
      </div>
    );
  }
}

export default Player;
