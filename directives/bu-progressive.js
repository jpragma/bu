buApp.directive('buProgressive', [function () {
    return {
        restrict: 'EA',
        templateUrl: 'tmpl/bu-progressive-tpl.html',
        replace: true,
        scope: {
            startPos: '@',
            maxPos: '@',
            minPos: '@',
            numOfShots: '@',
            maxScore: '@',
            score: '='
        },
        link: function($scope, $element, $attrs) {
            $scope.startPos = $scope.$eval($attrs.startPos) || 4;
            $scope.maxPos = $scope.$eval($attrs.maxPos) || 7;
            $scope.minPos = $scope.$eval($attrs.minPos) || 1;
            $scope.numOfShots = $scope.$eval($attrs.numOfShots) || 10;
            $scope.maxScore = $scope.$eval($attrs.maxScore) || 10;
            $scope.shots = [];
            for (var i=0; i<$scope.numOfShots; i++) {
                $scope.shots.push({result:null, pos:null});
            }

            $scope.displayShot = function (shot) {
                if (shot.result == null) return null;
                return shot.result > 0 ? '\u2713' : '\u2718';
            };
            $scope.markable = function(idx) {
                for (var i=idx+1; i<$scope.shots.length; i++) {
                    if ($scope.shots[i].result != null) return false;
                }
                for (i=0; i<idx; i++) {
                    if ($scope.shots[i].result == null) return false;
                }
                return true;
            };
            $scope.markShot = function(idx) {
                if (!$scope.markable(idx))
                    return;
                var val = $scope.shots[idx].result;
                if (val == null) {
                    val = 1;
                } else if (val == 1) {
                    val = 0;
                }  else {
                    val = null;
                }
                $scope.shots[idx].result = val;
                $scope.shots[idx].pos = $scope.calcNextPos(idx, val);
                $scope.recalcScore();
            };
            $scope.calcNextPos = function(idx, val) {
                if (val == null)
                    return null;
                var curPos = (idx == 0) ? $scope.startPos : $scope.shots[idx - 1].pos;
                var nextPos = (val > 0) ? curPos + 1 : curPos - 1;
                nextPos = Math.max(nextPos, $scope.minPos);
                nextPos = Math.min(nextPos, $scope.maxPos);
                return nextPos;
            };

            $scope.recalcScore = function () {
                var lastPos = 0;
                var bonus = 0;
                for (var i = 0; i < $scope.shots.length; i++) {
                    if ($scope.shots[i].pos == null) {
                        break;
                    }
                    lastPos = $scope.shots[i].pos;
                    var prevPos = (i == 0) ? -1 : $scope.shots[i-1].pos;
                    if (lastPos == $scope.maxPos && prevPos == $scope.maxPos) {
                        bonus++;
                    }
                }
                var score = lastPos + bonus;
                $scope.score = Math.min(score, $scope.maxScore);
            };
        }
    }
}]);
