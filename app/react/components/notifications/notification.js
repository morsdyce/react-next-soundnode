import { inject } from 'mobx-react';
import React from 'react';
import { toast } from 'react-toastify';

@inject(stores => ({
  notificationsStore: stores.notificationsStore
}))
class Notification extends React.Component {
  componentDidMount() {
    toast[this.props.type](this.props.title);

    setTimeout(() => {
      this.props.notificationsStore.dismissNotification(this.props.id);
    }, 2000);
  }

  render() {
    return null;
  }
}

export default Notification;
