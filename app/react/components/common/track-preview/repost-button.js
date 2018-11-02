import React from "react";
import { inject, observer } from "mobx-react";
import cx from "classnames";
import { get } from 'lodash/fp';

@inject((stores, props) => ({
  track: stores.tracksStore.getById(props.id),
  userId: get('authStore.user.id', stores),
}))
@observer
class RepostButton extends React.Component {
  handleClick = () => {
    this.props.track.toggleRepost();
  };

  render() {
    const { track, userId } = this.props;

    if (!track) {
      return null;
    }

    const classNames = cx({
      reposted: track.user_reposted
    });

    if (track.user_id === userId) {
      return null;
    }

    return (
      <a
        className={classNames}
        onClick={this.handleClick}
        title={track.user_reposted ? "Unpost" : "Repost"}
      >
        <i className="fa fa-retweet" />
      </a>
    );
  }
}

export default RepostButton;
