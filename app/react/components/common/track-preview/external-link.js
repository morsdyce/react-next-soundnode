import React from 'react';
import { shell } from 'electron';

class ExternalLink extends React.Component {

  static defaultProps = {
    as: 'span'
  };

  handleClick = () => {
    shell.openExternal(this.props.href)
  };

  render() {
    const Element = this.props.as;

    return (
      <Element onClick={this.handleClick}>
        { this.props.children }
      </Element>
    );
  }

}

export default ExternalLink;
