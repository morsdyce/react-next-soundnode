import React, { Component } from "react";
import { inject, observer } from "mobx-react";

@inject((stores) => ({
  tracksStore: stores.tracksStore,
  openModal: (...args) => stores.modalStore.openModal(...args)
}))
@observer
class PlaylistButton extends Component {
  handleClick = () => {
    this.props.openModal({
      type: 'playlist-modal',
      params: {
        id: this.props.id,
        name: this.props.name
      }
    });
  };

  render() {
    return (
      <a onClick={this.handleClick} title="Add to playlist">
        {" "}
        <i className="fa fa-bookmark" />
      </a>
    );
  }
}

export default PlaylistButton;
