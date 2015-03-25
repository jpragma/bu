buApp.controller('submitResultsController', ['$scope', '$location', 'shared', function($scope, $location, shared) {
    $scope.diplomaScoreTable = [
        {minScore: 0, name: 'N/A'},
        {minScore: 55, name: 'Bachelor of Pool'},
        {minScore: 85, name: 'Bachelor of Pool with Honors'},
        {minScore: 100, name: 'Master of Pool'},
        {minScore: 125, name: 'Master of Pool with Honors'},
        {minScore: 140, name: 'Doctorate of Pool'},
        {minScore: 180, name: 'Doctorate of Pool with Honors'}
    ];
    $scope.table = {size: 9};
    $scope.init = function () {
        $scope.results = shared.resultsToSubmit;
        $scope.totalScore = 0;
        for (var i=0; i<$scope.results.length; i++) {
            $scope.totalScore += $scope.results[i].totalScore;
        }
        $scope.calcDiploma();
    };
    $scope.calcDiploma = function () {
        var idx = 0;
        for (i=$scope.diplomaScoreTable.length-1; i>=0; i--) {
            if ($scope.totalScore >= $scope.diplomaScoreTable[i].minScore) {
                idx = i;
                break;
            }
        }
        if (idx > 4 &&  $scope.$eval($scope.table.size) < 9) {
            idx = 4;
        }
        $scope.diploma = $scope.diplomaScoreTable[idx];
    };
}]);
