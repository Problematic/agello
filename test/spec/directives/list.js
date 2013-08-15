'use strict';

describe('Directive: list', function () {
  beforeEach(module('agileApp'));

  var element;

  it('should make hidden element visible', inject(function ($rootScope, $compile) {
    element = angular.element('<list></list>');
    element = $compile(element)($rootScope);
    expect(element.text()).toBe('this is the list directive');
  }));
});
