'use strict';

angular.module('agileApp')
  .directive('list', function () {
    return {
      templateUrl: 'views/list.html',
      restrict: 'EA',
      replace: true,
      transclude: true,
      controller: ['$scope', '$parse', '$attrs', function ($scope, $parse, $attrs) {
        var model = $parse($attrs.list)($scope);

        $scope.addTask = function () {
          if (this.taskToAdd) {
            model.tasks.push({
              name: this.taskToAdd,
              order: model.tasks.length
            })

            this.taskToAdd = '';
          }
        };

        $scope.reorder = function ($event, delta) {
          var $el = angular.element($event.target),
            list = $parse($attrs.list)($el.scope());

          $scope.$emit('list.reorder', list, delta);
        };

        $scope.$on('card.reorder', function ($event, task, delta) {
          var idx = model.tasks.indexOf(task),
            swappedTask = model.tasks[idx + delta],
            newOrder = task.order + delta;

          if (swappedTask) {
            swappedTask.order = task.order;
          }

          if (newOrder >= 0 && newOrder < model.tasks.length) {
            task.order += delta;
          }
          model.tasks.sort(function (a, b) {
            return a.order - b.order;
          });
        });
      }],
      link: function ($scope, $element, $attrs) {
        var tasks = $scope.$eval($attrs.list + '.tasks');
        tasks.sort(function (a, b) {
          return a.order - b.order;
        });
      }
    };
  });
