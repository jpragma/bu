buApp.controller('homeController', ['$scope', '$location', 'storage', 'shared', function($scope, $location, storage, shared) {

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
        $scope.selection = [];
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
    $scope.inSelection = function (id) {
        var idx = jQuery.inArray(id, $scope.selection);
        return idx > -1
    };
    $scope.toggleSelection = function (id) {
        var idx = jQuery.inArray(id, $scope.selection);
        if (idx > -1) {
            $scope.selection.splice(idx, 1);
        } else {
            $scope.selection.push(id);
        }
    };
    $scope.deleteSelected = function () {
        var rsp = confirm("Delete selected results?");
        if (rsp) {
            for (var i = 0; i < $scope.selection.length; i++) {
                var key = $scope.selection[i];
                storage.remove(key);
            }
            $scope.load();
        }
    };
    $scope.deleteAll = function () {
        var rsp = confirm("Clear all results?");
        if (rsp) {
            storage.clear();
            $scope.load();
        }
    };
    $scope.getSelectedResults = function () {
        var results = [];
        for (var i=0; i<$scope.history.length; i++) {
            if ($scope.inSelection($scope.history[i].key)) {
                results.push($scope.history[i]);
            }
        }
        return results;
    };
    $scope.submitSelected = function () {
        var selectedResults = $scope.getSelectedResults();
        if (selectedResults.length != 2 || selectedResults[0].type == selectedResults[1].type) {
            alert("Please select a single pair of Exam I and Exam II to submit");
            return false;
        }
        shared.resultsToSubmit = selectedResults;
        $location.path('/submitResults');
    };
}]);

