import React from 'react';
import { inject, observer } from 'mobx-react';
import Notification from './notification';
import { ToastContainer } from 'react-toastify';

@inject(stores => ({
  notifications: stores.notificationsStore.notifications
}))
@observer
export class NotificationCenter extends React.Component {
  render() {
    return (
      <div>
        {this.props.notifications.map(notification => (
          <Notification
            key={notification.id}
            title={notification.title}
            type={notification.type}
          />
        ))}
        <ToastContainer />
      </div>
    );
  }
}

export default NotificationCenter;
