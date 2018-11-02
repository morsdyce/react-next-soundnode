import 'babel-polyfill';
import React, { lazy, Suspense } from 'react';
import ReactDOM from 'react-dom';
import stores from "./stores";
import { autorun, reaction } from "mobx";
import { Provider } from "mobx-react";

export function bootstrap(domElement, component, props, injector, routeParams) {
  const Component = lazy(() => import(`./${component}`));

  ReactDOM.render(
    <Provider {...stores}>
      <Suspense fallback={<div>Loading...</div>}>
        <Component {...props} {...routeParams} />
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
