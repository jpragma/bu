var buApp = angular.module('buApp', []);

buApp.controller('ProgressiveDrillTest', ['$scope', function($scope) {
    $scope.drills = [
        {id: 'F1', score: 0},
        {id: 'F2', score: 0},
        {id: 'F3', score: 0},
        {id: 'F4', score: 0},
        {id: 'F5', score: 0},
        {id: 'F6', score: 0},
        {id: 'F7', score: 0},
        {id: 'F8', score: 0}
    ];
    $scope.getTotalScore = function () {
        var result = 0;
        for (var i=0; i<$scope.drills.length; i++) {
            result += $scope.drills[i].score;
        }
        return result;
    };
}]);