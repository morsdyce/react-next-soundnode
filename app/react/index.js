import "../public/js/components/main";
import React, { lazy, Suspense } from 'react';
import ReactDOM from 'react-dom';
import { InjectorContext } from './components/angular-adapters/withInjector';

export function bootstrap(domElement, component, props, injector, routeParams) {
  const Component = lazy(() => import(`./${component}`));

  ReactDOM.render(
    <Suspense fallback={<div>Loading...</div>}>
      <InjectorContext value={injector}>
        <Component {...props} {...routeParams} />
      </InjectorContext>
    </Suspense>,
    domElement
  );
}

export function destroy(domElement) {
  ReactDOM.unmountComponentAtNode(domElement);
}
