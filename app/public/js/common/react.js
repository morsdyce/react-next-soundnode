'use strict';

var reactComponent = {
  template: '<div></div>',
  controller: reactController
};

function reactController(
  $element,
  $injector,
  $attrs,
  $stateParams = {},
  $scope,
  $parse
) {
  this.$postLink = function() {
    const props = this.getProps();

    this.registerObservers(props);
    this.render(props);
  };

  this.render = function(props) {
    const routeParams = { match: { params: Object.assign({}, $stateParams) } };
    const component = $attrs.component;

    window.soundNodeReact.bootstrap(
      $element[0],
      component,
      props,
      $injector,
      routeParams
    );
  };

  this.registerObservers = function() {
    const parentScope = $scope.$parent;

    const watchGroupExpressions = Object.keys($attrs.$attr)
      .filter(key => key !== 'component')
      .reduce((result, key) => {
        result.push($attrs[key]);

        return result;
      }, []);

    this.unsubscribe = parentScope.$watchGroup(
      watchGroupExpressions,
      (newValues, oldValues) => {
        if (newValues === oldValues) {
          return;
        }

        const props = this.getProps();

        this.render(props);
      }
    );
  };

  this.getProps = function() {
    const parentScope = $scope.$parent;

    if (!parentScope) {
      return {};
    }

    return Object.keys($attrs.$attr)
      .filter(key => key !== 'component')
      .reduce((result, key) => {
        const expression = $attrs[key];
        const getValue = $parse(expression);
        result[key] = getValue(parentScope);

        return result;
      }, {});
  };

  this.$onDestroy = function() {
    window.soundNodeReact.destroy($element[0]);
    this.unsubscribe();
  };
}

reactController.$inject = [
  '$element',
  '$injector',
  '$attrs',
  '$stateParams',
  '$scope',
  '$parse'
];

app.component('react', reactComponent);
