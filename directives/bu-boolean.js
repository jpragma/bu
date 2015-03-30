buApp.directive('buBoolean', [function () {
    return {
        restrict: 'EA',
        templateUrl: 'tmpl/bu-boolean-tpl.html',
        replace: true,
        scope: {
            shotTitle: '@',
            successTitle: '@',
            failureTitle: '@',
            numOfShots: '@',
            triesPerShot: '@',
            score: '=',
            data: '='
        },
        link: function($scope, $element, $attrs) {
            $scope.shotTitle = $scope.$eval($attrs.shotTitle) || 'Shot';
            $scope.successTitle = $scope.$eval($attrs.successTitle) || 'Success';
            $scope.failureTitle = $scope.$eval($attrs.failureTitle) || 'Failure';
            $scope.numOfShots = $scope.$eval($attrs.numOfShots) || 10;
            $scope.triesPerShot = $scope.$eval($attrs.triesPerShot) || 1;
            if ($scope.data) {
                $scope.shots = $scope.data;
            } else {
                $scope.shots = [];
                var shotsNum = $scope.numOfShots * $scope.triesPerShot;
                for (var i=0; i<shotsNum; i++) {
                    $scope.shots.push(null);
                }
            }
            $scope.data = $scope.shots;

            $scope.range = function (n) {
                return new Array($scope.$eval(n));
            };

            $scope.displayShot = function (input, reverse) {
                if (input == null) return null;
                if (reverse) {
                    return input == 0 ? '\u2713' : null;
                } else {
                    return input > 0 ? '\u2713' : null;
                }
            };

            $scope.markShot = function (index, success) {
                if (index > 0 && $scope.shots[index-1] == null) {
                    return; // Previous shot is not marked yet
                }
                $scope.shots[index] = (success) ? 1 : 0;
                $scope.recalcScore();
            };

            $scope.recalcScore = function () {
                var score = 0;
                for (var i=0; i<$scope.shots.length; i++) {
                    score += $scope.shots[i];
                }
                $scope.score = score;
            };
        }
    }
}]);

