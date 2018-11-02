import React from 'react';

const Context = React.createContext();


export const InjectorContext = Context.Provider;
export const InjectorConsumer = Context.Consumer;

export const withInjector = (dependencies = []) => (ComposedComponent) => {
  return (props) => (
    <InjectorConsumer>
      {injector => {
        const services = dependencies.reduce((result, dependency) => {
          result[dependency] = injector.get(dependency);

          return result;
        }, {});

        return (
          <ComposedComponent {...props} {...services}/>

        );
      }}
    </InjectorConsumer>
  )
};
