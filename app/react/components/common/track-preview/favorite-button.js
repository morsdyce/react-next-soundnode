import React, { Component } from 'react';
import cx from 'classnames';
import { inject, observer } from 'mobx-react';

@inject((stores, props) => {
  return ({
    tracksStore: stores.tracksStore,
    track: stores.tracksStore.getById(props.id)
  });
})
@observer
export class FavoriteButton extends Component {
  handleFavoriteClick = () => {
    this.props.track.toggleFavorite();
  };

  render() {
    const { track } = this.props;

    if (!track) {
      return null;
    }

    const classNames        = cx({
      liked: track.user_favorite
    });

    return (
      <a
        onClick={this.handleFavoriteClick}
        className={classNames}
        title={track.user_favorite ? 'Unlike' : 'Like'}>
        <i className="fa fa-heart"></i>
      </a>
    );
  }
}

export default FavoriteButton;
