'use strict';

angular.module('agileApp')
  .controller('MainCtrl', function ($scope) {
    $scope.lists = [
      {
        id: 1,
        name: 'todo',
        order: 0,
        tasks: [
          { id: 10, name: 'something borrowed', order: 0 },
          { id: 11, name: 'something gained', order: 2 },
          { id: 14, name: 'feel no sorrow', order: 1 }
        ]
      },
      {
        id: 2,
        name: 'doing',
        order: 1,
        tasks: [
          { id: 12, name: 'something doing', order: 0 }
        ]
      },
      {
        id: 3,
        name: 'done',
        order: 2,
        tasks: [
          { id: 13, name: 'something done', order: 0 }
        ]
      }
    ];

    $scope.lists.sort(function (a, b) {
      return a.order - b.order;
    });

    $scope.$on('list.reorder', function ($event, list, delta) {
        var idx = $scope.lists.indexOf(list),
          swappedList = $scope.lists[idx + delta],
          newOrder = list.order + delta;

        if (swappedList) {
          swappedList.order = list.order;
        }

        if (newOrder >= 0 && newOrder < $scope.lists.length) {
          list.order += delta;
        }
        $scope.lists.sort(function (a, b) {
          return a.order - b.order;
        });
      });
  });
