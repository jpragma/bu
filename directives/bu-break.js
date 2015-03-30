buApp.directive('buBreak', [function () {
    return {
        restrict: 'EA',
        templateUrl: 'tmpl/bu-break-tpl.html',
        replace: true,
        scope: {
            numOfAttempts: '@',
            score: '=',
            data: '='
        },
        link: function($scope, $element, $attrs) {
            $scope.numOfAttempts = $scope.$eval($attrs.numOfAttempts) || 3;
            if ($scope.data) {
                $scope.attempts = $scope.data;
            } else {
                $scope.attempts = [];
                for (var i=0; i<$scope.numOfAttempts; i++) {
                    var points = new Array(5);
                    $scope.attempts.push(points);
                }
            }
            $scope.data = $scope.attempts;

            $scope.displayPoint = function (input) {
                if (input == null) return '\u00A0'; // &nbsp
                return input > 0 ? '\u2713' : '\u2718';
            };

            $scope.markPoint = function (attempt, index) {
                var val = attempt[index];
                val = (val == 1) ? 0 : 1;
                attempt[index] = val;
                $scope.recalcScore();
            };

            $scope.recalcScore = function () {
                var scores = [];
                for (var i=0; i<$scope.attempts.length; i++) {
                    var attempt = $scope.attempts[i];
                    var s = 0;
                    for (var j=0; j<attempt.length; j++) {
                        s += (attempt[j] || 0);
                    }
                    scores.push(s);
                }
                scores.sort();
                var median = Math.floor(scores.length / 2);
                $scope.score = scores[median];
            };

        }
    }
}]);

