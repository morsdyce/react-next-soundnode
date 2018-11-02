import React, { Component } from 'react';
import TrackPreview from '../components/common/track-preview/track-preview';
import { inject, observer } from 'mobx-react';
import Loader from '../components/common/loader';

@inject(stores => ({
  isLoading: stores.networkStore.getByLabel('favorites'),
  favorites: stores.tracksStore.favorites,
  fetchFavorites: () => stores.tracksStore.fetchFavorites()
}))
@observer
class Favorites extends Component {
  componentDidMount() {
    this.props.fetchFavorites();
  }

  renderTracks() {
    const { isLoading, favorites } = this.props;

    if (isLoading) {
      return <Loader />;
    }

    return favorites.map(track => (
      <li className="songList_item" key={track.id}>
        <TrackPreview
          id={track.id}
          artwork_url={track.artwork_url}
          title={track.title}
          user={track.user}
          likes_count={track.likes_count}
          favoritings_count={track.favoritings_count}
          comment_count={track.comment_count}
          duration={track.duration}
          type={track.type}
          genre={track.genre}
          license={track.license}
          permalink_url={track.permalink_url}
        />
      </li>
    ));
  }

  render() {
    return (
      <div className="favoritesView">
        <h1>Likes</h1>

        <div className="favoritesView_inner">
          <ul className="songList">{this.renderTracks()}</ul>
        </div>
      </div>
    );
  }
}

export default Favorites;
