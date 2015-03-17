buApp.directive('buNumeric', [function () {
    return {
        restrict: 'EA',
        templateUrl: '../tmpl/bu-numeric-tpl.html',
        replace: true,
        scope: {
            title: '@',
            resultTitle: '@',
            numOfAttempts: '@',
            sumType: '@',
            sumNumber: '@',
            maxScore: '@',
            maxPerAttempt: '@',
            score: '='
        },
        link: function($scope, $element, $attrs) {
            $scope.title = $scope.$eval($attrs.title) || 'Attempt';
            $scope.resultTitle = $scope.$eval($attrs.resultTitle) || 'Balls Pocketed';
            $scope.numOfAttempts = $scope.$eval($attrs.numOfAttempts) || 2;
            $scope.sumType = $scope.$eval($attrs.sumType) || 'max';
            $scope.sumNumber = $scope.$eval($attrs.sumNumber) || 1;
            $scope.maxScore = $scope.$eval($attrs.maxScore) || 10;
            $scope.maxPerAttempt = $scope.$eval($attrs.maxPerAttempt) || $scope.maxScore;

            $scope.attempts = [];
            for (var i=0; i<$scope.numOfAttempts; i++) {
                $scope.attempts.push(null);
            }
            $scope.$watchCollection('attempts', function (newVals, oldVals) {
                $scope.recalcScore();
            });
            $scope.recalcScore = function () {
                var score = 0;
                var values = copy4Sum($scope.attempts).sort();
                if ($scope.sumType == 'max') {
                    values.reverse();
                }
                var sumNumber = Math.min($scope.sumNumber, values.length);
                for (var i=0; i<sumNumber; i++) {
                    score += values[i];
                }
                $scope.score = Math.min(score, $scope.maxScore);
            };
            var copy4Sum = function (vals) {
                var result = [];
                for (var i=0; i<vals.length; i++) {
                    result.push((vals[i] == null ? 0 : vals[i]));
                }
                return result;
            };
        }
    }
}]);

