'use strict';

describe('Directive: card', function () {
  beforeEach(module('agileApp'));

  var element;

  it('should make hidden element visible', inject(function ($rootScope, $compile) {
    element = angular.element('<card></card>');
    element = $compile(element)($rootScope);
    expect(element.text()).toBe('this is the card directive');
  }));
});
