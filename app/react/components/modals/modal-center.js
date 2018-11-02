import React, { lazy, Suspense } from 'react';
import { inject, observer } from 'mobx-react';
import Loader from '../common/loader';

@inject(stores => ({
  modals: stores.modalStore.modals
}))
@observer
export class ModalCenter extends React.Component {
  renderModals() {
    return this.props.modals.map(modal => {
      const Modal = lazy(() => import(`./${modal.type}`));

      return <Modal key={modal.id} id={modal.id} {...modal.params} />;
    });
  }

  render() {
    return <Suspense fallback={<Loader />}>{this.renderModals()}</Suspense>;
  }
}

ModalCenter.propTypes = {};

export default ModalCenter;
