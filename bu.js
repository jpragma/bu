var buApp = angular.module('buApp', ['ui.bootstrap']);

buApp.controller('ProgressiveDrillTest', ['$scope', function($scope) {
    $scope.drills = [
        {id: 'F1', name: 'Cut', score: 0, type:'progressive'},
        {id: 'F2', name: 'Stop', score: 0, type:'progressive'},
        {id: 'F3', name: 'Follow', score: 0, type:'progressive'},
        {id: 'F4', name: 'Draw', score: 0, type:'progressive'},
        {id: 'F5', name: 'Stan', score: 0, type:'progressive'},
        {id: 'F6', score: 0, type:'simple'},
        {id: 'F7', score: 0, type:'simple'},
        {id: 'F8', score: 0, type:'simple'}
    ];
    $scope.getTotalScore = function () {
        var result = 0;
        for (var i=0; i<$scope.drills.length; i++) {
            result += $scope.drills[i].score;
        }
        return result;
    };

}]);