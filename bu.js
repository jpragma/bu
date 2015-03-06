var buApp = angular.module('buApp', []);
buApp.controller('ProgressiveDrillCtrl', [function() {
    this.startPos = 4;
    this.maxPos = 7;
    this.minPos = 1;
    this.numOfShots = 10;
    this.maxScore = 10;
    this.shots = [];

    this.init = function () {
        for (var i=0; i<this.numOfShots; i++) {
            this.shots.push(this.startPos);
        }
    };

}]);