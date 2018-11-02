import 'babel-polyfill';
import "../public/js/components/main";
import React, { lazy, Suspense } from 'react';
import ReactDOM from 'react-dom';
import { InjectorContext } from './components/angular-adapters/withInjector';
import stores from "./stores";
import { autorun, reaction } from "mobx";
import { Provider } from "mobx-react";
import { registerInjector } from "./utils/angular.utils";

export function bootstrap(domElement, component, props, injector, routeParams) {
  const Component = lazy(() => import(`./${component}`));
  registerInjector(injector);

  ReactDOM.render(
    <Provider {...stores}>
      <Suspense fallback={<div>Loading...</div>}>
        <InjectorContext value={injector}>
          <Component {...props} {...routeParams} />
        </InjectorContext>
      </Suspense>
    </Provider>,
    domElement
  );
}

export function destroy(domElement) {
  ReactDOM.unmountComponentAtNode(domElement);
}

export const watch = autorun;
export { reaction };

export { stores };
