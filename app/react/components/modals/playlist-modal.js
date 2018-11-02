import React from 'react';
import { inject, observer } from 'mobx-react';
import Modal from '../common/modal';
import { formatSongDuration } from '../../utils/track.utils';

@inject((stores, props) => ({
  closeModal: () => stores.modalStore.closeModal(props.id),
  playlists: stores.playlistsStore.playlists,
  fetchPlaylists: () => stores.playlistsStore.fetchPlaylists()
}))
@observer
export class PlaylistModal extends React.Component {
  componentDidMount() {
    this.props.fetchPlaylists();
  }

  handleSubmit = event => {
    event.preventDefault();
  };

  renderPlaylists() {
    return this.props.playlists.map(playlist => (
      <li className="playlistDashboard_list_item" key={playlist.id}>
        <div className="mediaBox_wrapper">
          <img
            src={playlist.artwork_url || 'public/img/logo-badge.png'}
            alt={playlist.title}
            className="playlistDashboard_list_item_artwork"
          />
        </div>
        <div className="mediaBox_wrapper">
          <h4 className="mediaBox_item_title">{playlist.title}</h4>
          <span className="mediaBox_item_info">
            <i className="fa fa-list" /> {playlist.track_count}
          </span>
          <span className="mediaBox_item_info">
            <i className="fa fa-clock-o" />{' '}
            {formatSongDuration(playlist.duration)}
          </span>
        </div>
      </li>
    ));
  }

  render() {
    return (
      <Modal>
        <div className="playlistDashboard">
          <a onClick={this.props.closeModal} className="closeModal">
            <i className="fa fa-times" />
          </a>

          <header className="playlistDashboard_title">
            <p>
              Where do you want to add:{' '}
              <span className="playlistDashboard_selectedSong">
                {this.props.name}
              </span>
            </p>
            <form onSubmit={this.handleSubmit}>
              <input
                type="text"
                name="new_playlist"
                id="newPlaylist"
                placeholder="Create a new playlist and add selected song..."
                className="playlistDashboard_field"
              />
            </form>
          </header>

          <ul className="playlistDashboard_list">{this.renderPlaylists()}</ul>
        </div>
      </Modal>
    );
  }
}

export default PlaylistModal;
