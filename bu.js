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


buApp.controller('ProgressiveDrillTest', ['$scope', function($scope) {
    $scope.drills = [
        {id: 'F6', score: 0},
        {id: 'F7', score: 0}
    ];
}]);