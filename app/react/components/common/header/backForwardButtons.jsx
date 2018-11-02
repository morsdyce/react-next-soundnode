import React, { Component } from 'react';
import { withRouter } from 'react-router';

class BackForwardActions extends Component {
  render() {
    return (
      <ul className="windowAction">
        <li className="windowAction_item navigationButton goBack" onClick={this.props.history.goBack}>
          <i className="fa fa-chevron-left"></i>
        </li>
        <li className="windowAction_item navigationButton goForward" onClick={this.props.history.goForward}>
          <i className="fa fa-chevron-right"></i>
        </li>
      </ul>
    )
  }
}

export default withRouter(BackForwardActions);
