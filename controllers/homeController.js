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
        $scope.selection = [];
        $scope.calcDiploma();
    };
    $scope.getDrillScore = function (drills, id) {
        for (var i=0; i<drills.length; i++) {
            if (drills[i].id.toUpperCase() == id.toUpperCase()) {
                return drills[i].score;
            }
        }
    };
    $scope.getBestScore = function (type) {
        var score = 0;
        for (var i=0; i<$scope.history.length; i++) {
            var h = $scope.history[i];
            if (h.type == type) {
                score = Math.max(score, h.totalScore);
            }
        }
        return score;
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
    $scope.calcDiploma = function () {
        var  diplomaTable = [
            {minScore: 55, name: 'Bachelor of Pool'},
            {minScore: 85, name: 'Bachelor of Pool with Honors'},
            {minScore: 100, name: 'Master of Pool'},
            {minScore: 125, name: 'Master of Pool with Honors'},
            {minScore: 140, name: 'Doctorate of Pool'},
            {minScore: 180, name: 'Doctorate of Pool with Honors'}
        ];
        var combinedScore = $scope.getBestScore('exam1') + $scope.getBestScore('exam2');
        var idx = -1;
        for (var i=diplomaTable.length-1; i>=0; i--) {
            if (combinedScore >= diplomaTable[i].minScore) {
                idx = i;
                break;
            }
        }
        $scope.bestScore = combinedScore;
        if (idx >= 0)
            $scope.diploma = diplomaTable[idx].name;
    };
}]);

