buApp.controller('exam1Controller', ['$scope', '$location', 'storage', 'shared', function($scope, $location, storage, shared) {
    $scope.examDate = new Date().getTime();
    if (shared.examData) {
        $scope.drills = shared.examData;
    } else {
        $scope.drills = [
            {id: 'F1', name: 'Cut', score: 0, data: null, type: 'progressive'},
            {id: 'F2', name: 'Stop', score: 0, data: null, type: 'progressive'},
            {id: 'F3', name: 'Follow', score: 0, data: null, type: 'progressive'},
            {id: 'F4', name: 'Draw', score: 0, data: null, type: 'progressive'},
            {id: 'F5', name: 'Stan', score: 0, data: null, type: 'progressive'},
            {id: 'F6', name: 'Potting', score: 0, data: null, type: 'simple'},
            {id: 'F7', name: 'Wagon wheel', score: 0, data: null, type: 'simple'},
            {id: 'F8', name: 'Target', score: 0, data: null, type: 'simple'}
        ];
    }
    $scope.exam2Placement = [
        {level: 'Bachelors', minScore: 0, maxScore: 49},
        {level: 'Masters', minScore: 50, maxScore: 69},
        {level: 'Doctorate', minScore: 70, maxScore: 100}
    ];
    $scope.exam2Level = function () {
        var score = $scope.getTotalScore();
        for (var i=$scope.exam2Placement.length-1; i>=0; i--) {
            if (score >= $scope.exam2Placement[i].minScore)
                return $scope.exam2Placement[i].level;
        }
        return null;
    };
    $scope.getTotalScore = function () {
        var result = 0;
        for (var i=0; i<$scope.drills.length; i++) {
            result += $scope.drills[i].score;
        }
        return result;
    };
    $scope.saveResults = function () {
        storage.store({date:$scope.examDate, type: 'exam1', drills:$scope.drills, totalScore: $scope.getTotalScore(), notes: $scope.notes});
        $location.path('/');
    };
}]);
