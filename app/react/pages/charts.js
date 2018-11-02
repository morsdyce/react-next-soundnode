import React, { Component } from "react";
import GenreSelector from "../components/common/genre-selector";
import TrackPreview from "../components/common/track-preview/track-preview";
import { inject, observer } from "mobx-react";
import Loader from '../components/common/loader';

@inject(stores => ({
  isLoading: stores.networkStore.getByLabel("charts"),
  tracks: stores.chartsStore.tracks,
  title: stores.chartsStore.genreTitle,
  setGenre: genre => stores.chartsStore.setGenre(genre),
  fetchCharts: () => stores.chartsStore.fetchCharts()
}))
@observer
class Charts extends Component {
  componentDidMount() {
    const genre = this.props.match.params.genre;

    if (genre) {
      this.props.setGenre(genre);
    }

    this.props.fetchCharts();
  }

  componentDidUpdate(prevProps) {
    const genre = this.props.match.params.genre;
    const oldGenre = prevProps.match.params.genre;

    if (genre && genre !== oldGenre) {
      this.props.setGenre(genre);
      this.props.fetchCharts();
    }
  }

  renderTracks() {
    const { isLoading, tracks } = this.props;

    if (isLoading) {
      return <Loader />;
    }

    return tracks.map(track =>
      (
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
    let { title } = this.props;

    return (
      <div className="streamView">
        <h1>Top 50 - {title}</h1>

        <GenreSelector />

        <ul className="songList">{this.renderTracks()}</ul>
      </div>
    );
  }
}

export default Charts;
