buApp.directive('buBoolean', [function () {
    return {
        restrict: 'EA',
        templateUrl: '../tmpl/bu-boolean-tpl.html',
        replace: true,
        scope: {
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
                if (index > 0 && scope.shots[index-1] == null) {
                    return; // Previous shot is not marked yet
                }
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

