'use strict';

var reactComponent = {
  template: '<div></div>',
  bindings: {
    component: '@'
  },
  controller: reactController
};

function reactController($element, $injector, $attrs, $stateParams = {}) {
  this.$postLink = function() {
    const props = this.getProps();

    this.registerObservers(props);
    this.render(props);
  };

  this.render = function(props) {
    const routeParams = { match: { params: Object.assign({}, $stateParams) } };

    window.soundNodeReact.bootstrap(
      $element[0],
      this.component,
      props,
      $injector,
      routeParams
    );
  };

  this.registerObservers = function(props) {
    Object.keys(props).forEach(propName => {
      $attrs.$observe(propName, () => {
        const props = this.getProps();

        this.render(props);
      });
    });
  };

  this.getProps = function() {
    return Object.keys($attrs.$attr)
      .filter(key => key !== 'component')
      .reduce((result, key) => {
        result[key] = $attrs[key];

        return result;
      }, {});
  };

  this.$onDestroy = function() {
    window.soundNodeReact.destroy($element[0]);
  };
}

reactController.$inject = ['$element', '$injector', '$attrs', '$stateParams'];

app.component('react', reactComponent);
