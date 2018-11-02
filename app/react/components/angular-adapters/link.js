import React, { Component } from 'react';
import { withInjector } from './withInjector';
import {
  flow,
  split,
  reduce,
  replace,
  compact,
  drop,
  startsWith
} from 'lodash/fp';
import { reduceWithIndex } from '../../utils/lodash.utils';

class Link extends Component {
  navigate = event => {
    event.preventDefault();

    const [stateName, ...rest] = this.props.to.split('/');
    const { url } = this.props.$state.get(stateName) || {};

    const params = flow([
      split('/'),
      compact,
      drop(1),
      reduceWithIndex((result, urlSegment, index) => {
        if (!startsWith(':', urlSegment)) {
          return result;
        }

        const key = urlSegment.replace(':', '');

        result[key] = rest[index];

        return result;
      }, {})
    ])(url);

    this.props.$state.go(stateName, params);
  };

  render() {
    return (
      <a
        href={this.props.to}
        onClick={this.navigate}
        className={this.props.className}>
        {this.props.children}
      </a>
    );
  }
}

export default withInjector(['$state'])(Link);
