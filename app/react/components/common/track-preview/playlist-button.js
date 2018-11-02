import React, { Component } from "react";
import { withInjector } from "../../angular-adapters/withInjector";

class PlaylistButton extends Component {
  scope = this.props.$rootScope.$new(true);

  handleClick = () => {
    this.scope.playlistSongId = this.props.id;
    this.scope.playlistSongName = this.props.name;

    this.props.ngDialog.open({
      showClose: false,
      scope: this.scope,
      controller: "PlaylistDashboardCtrl",
      template: "views/playlists/playlistDashboard.html"
    });
  };

  componentWillUnmount() {
    this.scope.$destroy();
  }

  render() {
    return (
      <a onClick={this.handleClick} title="Add to playlist">
        {" "}
        <i className="fa fa-bookmark" />
      </a>
    );
  }
}

export default withInjector(["ngDialog", '$rootScope'])(PlaylistButton);
