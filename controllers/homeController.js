buApp.controller('homeController', ['$scope', '$location', 'storage', function($scope, $location, storage) {

    $scope.exams = [
        {name: 'Exam I', url: '/exam1'},
        {name: 'Exam II Bachelors', url: '/exam2/0'},
        {name: 'Exam II Masters', url: '/exam2/1'},
        {name: 'Exam II Doctorate', url: '/exam2/2'}
    ];
    $scope.takeExam = function() {
        $location.path($scope.examUrl);
    };
    $scope.load = function () {
        var storedResults = storage.list();
        var history = [];
        for (var i=0; i<storedResults.length; i++) {
            var key = storedResults[i];
            var data = storage.read(key);
            data.key = key;
            history.push(data);
        }
        $scope.history = history;
    };
    $scope.getDrillScore = function (drills, id) {
        for (var i=0; i<drills.length; i++) {
            if (drills[i].id.toUpperCase() == id.toUpperCase()) {
                return drills[i].score;
            }
        }
    };
    $scope.getLevelName = function (level) {
        return buApp.exam2levels[level];
    };
    $scope.delete = function (key) {
        storage.remove(key);
        $scope.load();
    };
    $scope.deleteAll = function () {
        storage.clear();
        $scope.load();
    };
}]);

