import React, { Component } from 'react';
import cx from 'classnames';
import * as PropTypes from 'prop-types';
import { withInjector } from '../../angular-adapters/withInjector';

class FavoriteButton extends Component {
  state = {
    isFavorited: this.props.isFavorited
  };

  setFavorite(isFavorited) {
    this.setState({ isFavorited })
  }

  handleFavoriteClick = () => {
    const userId = this.props.$rootScope.userId;

    if (this.state.isFavorited) {
      this.props.SCapiService.deleteFavorite(userId, this.props.id)
        .then((status) => {
          if (typeof status == "object") {
            this.props.notificationFactory.warn("Song removed from likes!");
            this.props.$rootScope.$broadcast("track::unfavorited", this.props.id);
            this.setFavorite(false);
          }
        }, () => {
          this.props.notificationFactory.error("Something went wrong!");
        })
    } else {
      this.props.SCapiService.saveFavorite(userId, this.props.id)
        .then((status) => {
          if (typeof status == "object") {
            this.props.notificationFactory.success("Song added to likes!");
            this.props.$rootScope.$broadcast("track::favorited", this.props.id);
            this.setFavorite(true);
          }
        }, () => {
          this.props.notificationFactory.error("Something went wrong!");
        });
    }


  };

  render() {
    const { isFavorited } = this.state;
    const classNames        = cx({
      liked: isFavorited
    });

    return (
      <a
        onClick={this.handleFavoriteClick}
        className={classNames}
        title={isFavorited ? 'Unlike' : 'Like'}>
        <i className="fa fa-heart"></i>
      </a>
    );
  }
}

export default withInjector(['SCapiService', '$rootScope', 'notificationFactory'])(FavoriteButton);
