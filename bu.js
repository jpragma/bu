var buApp = angular.module('buApp', []);
buApp.directive('progressiveDrill', [function() {
    return {
        templateUrl: 'progressive-drill-tpl.html',
        controllerAs: 'ctrl',
        bindToController: true,
        controller: function($attrs, $scope) {
            var startPos = $scope.$eval($attrs.startPos) || 4;
            var maxPos = $scope.$eval($attrs.maxPos) || 7;
            var minPos = $scope.$eval($attrs.minPos) || 1;
            var numOfShots = $scope.$eval($attrs.numOfShots) || 10;
            var maxScore = $scope.$eval($attrs.maxScore) || 10;

            this.shots = [];

            var curShot = 0;
            var curPos = startPos;

            this.init = function () {
                for (var i=0; i<numOfShots; i++) {
                    this.shots.push('-');
                }
            };

            this.afterShot = function(success) {
                if (curShot < numOfShots) {
                    curPos = (success) ? curPos + 1 : curPos - 1;
                    curPos = Math.max(curPos, minPos);
                    curPos = Math.min(curPos, maxPos);
                    this.shots[curShot] = curPos;
                    curShot++;
                    if (curShot == numOfShots) {
                        this.score = this.calcScore();
                    }
                }
            };

            this.calcScore = function() {
                var lastScore = 0;
                var bonus = -1;
                if (this.shots) {
                    for (var i = 0; i < this.shots.length; i++) {
                        if (this.shots[i]) {
                            lastScore = this.shots[i];
                            if (this.shots[i] == 7) {
                                bonus++;
                            }
                        }
                    }
                }
                var result = lastScore + Math.max(bonus, 0);
                return Math.min(result, maxScore);
            };
        }
    }
}]);

buApp.directive('buDrill', [function () {
    return {
        restrict: 'EA',
        templateUrl: 'bu-drill-tpl.html',
        replace: true,
        transclude: true,
        scope: {
            name: '@drillName',
            shotTitle: '@',
            successTitle: '@',
            failureTitle: '@',
            numOfShots: '@',
            triesPerShot: '@',
            score: '='
        },
        link: function(scope, element, attrs) {
            if (!attrs.shotTitle) {attrs.shotTitle = 'Shot'}
            if (!attrs.successTitle) {attrs.successTitle = 'Success'}
            if (!attrs.failureTitle) {attrs.failureTitle = 'Failure'}
            if (!attrs.numOfShots) {attrs.numOfShots = 10}
            attrs.numOfShots = scope.$eval(attrs.numOfShots);
            if (!attrs.triesPerShot) {attrs.triesPerShot = 1}
            attrs.triesPerShot = scope.$eval(attrs.triesPerShot);

            scope.range = function (n) {
                return new Array(n);
            };
            var shotsNum = attrs.numOfShots * attrs.triesPerShot;
            scope.shots = [];
            for (var i=0; i<shotsNum; i++) {
                scope.shots.push(null);
            }

            scope.displayShot = function (input, reverse) {
                if (input == null) return null;
                if (reverse) {
                    return input == 0 ? '\u2713' : null;
                } else {
                    return input > 0 ? '\u2713' : null;
                }
            };

            scope.markShot = function (index, success) {
                scope.shots[index] = (success) ? 1 : 0;
                scope.recalcScore();
            };

            scope.recalcScore = function () {
                var score = 0;
                for (var i=0; i<scope.shots.length; i++) {
                    score += scope.shots[i];
                }
                scope.score = score;
            };
        }
    }
}]);

buApp.controller('ProgressiveDrillTest', ['$scope', function($scope) {
    $scope.drills = [
        {name: 'Wagon wheel', score: 0},
        {name: 'Potting', score: 0}
    ];
}]);