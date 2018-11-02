import React, { lazy, Suspense } from 'react';
import ReactDOM from 'react-dom';
import "../public/js/components/main";

export function bootstrap(domElement, component, props, injector, routeParams) {
  const Component = lazy(() => import(`./${component}`));

  ReactDOM.render(
    <Suspense fallback={<div>Loading...</div>}>
      <Component {...props} {...routeParams} />
    </Suspense>,
    domElement
  );
}

export function destroy(domElement) {
  ReactDOM.unmountComponentAtNode(domElement);
}
