buApp.controller('rawDataController', ['$scope', '$location', 'storage', 'shared', function ($scope, $location, storage, shared) {
    if (shared.exportData) {
        $scope.rawdata = toJsonString(shared.exportData);
        $scope.exporting = true;
    }

    $scope.importData = function () {
        var data = fromJsonString($scope.rawdata);
        if (!$.isArray(data)) {
            alert("Invalid data");
            return;
        }
        for (var i=0; i<data.length; i++) {
            var examData = data[i];
            if (!examData.key) {
                alert("Invalid data");
                return;
            }
            storage.store(examData);
        }
        $location.path('/');
    };
}]);