var buApp = angular.module('buApp', ['ngRoute', 'ui.bootstrap']);

buApp.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.when('/home', {templateUrl: 'views/home.html'}).
            when('/exam1', {templateUrl: 'views/exam1.html'}).
            when('/exam2', {templateUrl: 'views/exam2.html'}).
            otherwise({redirectTo: '/home'});
    }
]);


buApp.controller('exam1Controller', ['$scope', function($scope) {
    $scope.drills = [
        {id: 'F1', name: 'Cut', score: 0, type:'progressive'},
        {id: 'F2', name: 'Stop', score: 0, type:'progressive'},
        {id: 'F3', name: 'Follow', score: 0, type:'progressive'},
        {id: 'F4', name: 'Draw', score: 0, type:'progressive'},
        {id: 'F5', name: 'Stan', score: 0, type:'progressive'},
        {id: 'F6', score: 0, type:'simple'},
        {id: 'F7', score: 0, type:'simple'},
        {id: 'F8', score: 0, type:'simple'}
    ];
    $scope.level2Placement = [
        {level: 'Bachelors', minScore: 0, maxScore: 49},
        {level: 'Masters', minScore: 50, maxScore: 69},
        {level: 'Doctorate', minScore: 70, maxScore: 100}
    ];
    $scope.isYourPlacement = function (placement) {
        var score = $scope.getTotalScore();
        return (score >= placement.minScore && score <= placement.maxScore);
    };
    $scope.getTotalScore = function () {
        var result = 0;
        for (var i=0; i<$scope.drills.length; i++) {
            result += $scope.drills[i].score;
        }
        return result;
    };
    $scope.submitResults = function () {
        var result = {name: $scope.studentName, date: $scope.examDate, video: $scope.videoUrl, drills: [], total: $scope.getTotalScore()};
        for (var i=0; i<$scope.drills.length; i++) {
            for (var i=0; i<$scope.drills.length; i++) {
                result.drills.push({id: $scope.drills[i].id, score: $scope.drills[i].score});
            }
        }
        var link = 'mailto:ilevin@jpragma.com?subject=BU Exam I&body=' + JSON.stringify(result);
        window.location.href = link;
    };
}]);

buApp.controller('exam2Controller', ['$scope', function ($scope) {
    $scope.level = 0;
    $scope.drills = [
        {id: 'S1', score: 0, maxScore: [4, 7, 10]},
        {id: 'S2', score: 0, maxScore: [7, 11, 15]},
        {id: 'S3', score: 0, maxScore: [10, 12, 14]},
        {id: 'S4', score: 0, maxScore: [10, 12, 14]},
        {id: 'S5', score: 0, numOfShots: [3, 5, 7]},
        {id: 'S6', score: 0, numOfShots: [3, 5, 7]},
        {id: 'S7', score: 0, numOfShots: [3, 5, 7]},
        {id: 'S8', score: 0, numOfShots: [3, 5, 7]},
        {id: 'S9', score: 0, numOfShots: [3, 5, 7]},
        {id: 'S10', score: 0}
    ];

}]);