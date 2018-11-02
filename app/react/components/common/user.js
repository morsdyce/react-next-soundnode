import React from 'react';
import { inject, observer } from 'mobx-react';

@inject((stores) => ({
  user: stores.authStore.user
}))
@observer
export class User extends React.Component {
  render() {
    const { user } = this.props;

    if (!user) {
      return null;
    }

    return (
      <div className="user">
        <div className="user_profile clearfix">
          <img
            src={user.avatar_url}
            alt={user.username}
            className="user_thumb"
          />

          <div className="user_inner">
            <a href="" className="user_name" title="{{ data.username}}">
              {user.username}
            </a>
            <a href="" className="user_logOut">
              Log out
            </a>
          </div>
        </div>
        <div className="user_info">
          <span className="user_info_wrap" ui-sref="following">
            <small>{user.followings_count}</small>
            <small>following</small>
          </span>
          <span className="user_info_wrap" ui-sref="followers">
            <small>{user.followers_count}</small>
            <small>followers</small>
          </span>
        </div>
      </div>
    );
  }
}

export default User;
