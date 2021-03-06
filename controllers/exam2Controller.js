buApp.controller('exam2Controller', ['$scope', '$routeParams', '$location', 'storage', 'shared', function ($scope, $routeParams, $location, storage, shared) {
    $scope.level = $routeParams.level;
    $scope.maxScore = [54, 77, 100];
    $scope.levelName = buApp.exam2levels[$routeParams.level];
    if (shared.examData) {
        $scope.examDate = shared.examData.date;
        $scope.drills = shared.examData.drills;
        $scope.notes = shared.examData.notes;
        $scope.key = shared.examData.key;
    } else {
        $scope.examDate = new Date().getTime();
        $scope.drills = [
            {id: 'S1', name: 'Line', score: 0, data: null, maxScore: [4, 7, 10]},
            {id: 'S2', name: 'Rail', score: 0, data: null, maxScore: [7, 11, 15]},
            {id: 'S3', name: '9-Ball', score: 0, data: null, maxScore: [10, 12, 14]},
            {id: 'S4', name: '8-Ball', score: 0, data: null, maxScore: [10, 12, 14]},
            {id: 'S5', name: 'Safe', score: 0, data: null, numOfShots: [3, 5, 7]},
            {id: 'S6', name: 'Kick', score: 0, data: null, numOfShots: [3, 5, 7]},
            {id: 'S7', name: 'Bank', score: 0, data: null, numOfShots: [3, 5, 7]},
            {id: 'S8', name: 'Elevated', score: 0, data: null, numOfShots: [3, 5, 7]},
            {id: 'S9', name: 'Jump/Masse', score: 0, data: null, numOfShots: [3, 5, 7]},
            {id: 'S10', name: 'Break', score: 0, data: null}
        ];
    }
    $scope.getTotalScore = function () {
        var result = 0;
        for (var i=0; i<$scope.drills.length; i++) {
            result += $scope.drills[i].score;
        }
        return result;
    };
    $scope.saveResults = function () {
        storage.store({key: $scope.key, date:$scope.examDate, type: 'exam2', level: $scope.level, drills:$scope.drills, totalScore: $scope.getTotalScore(), notes: $scope.notes});
        $location.path('/');
    };

}]);
