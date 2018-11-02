import React from "react";
import cx from "classnames";
import { withInjector } from '../../angular-adapters/withInjector';

class RepostButton extends React.Component {
  handleClick = () => {
    // activate relevant angular service
  };

  render() {
    const currentUser = this.props.$rootScope.userId;
    const { userId, user_reposted } = this.props;

    const classNames = cx({
      reposted: user_reposted
    });

    if (currentUser === userId) {
      return null;
    }

    return (
      <a
        className={classNames}
        onClick={this.handleClick}
        title={user_reposted ? "Unpost" : "Repost"}
      >
        <i className="fa fa-retweet" />
      </a>
    );
  }
}

export default withInjector(['$rootScope'])(RepostButton);
