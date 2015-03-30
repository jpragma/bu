var buApp = angular.module('buApp', ['ngRoute', 'ui.bootstrap', 'LocalStorageModule']);

var guid = function() {
    var s4 = function() {
        return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    };
    return s4() + '-' + s4() + '-' + s4() + '-' + s4();
};
var toJsonString = function (obj) {
    if (obj == null)
        return null;
    else if (typeof  obj === 'object')
        return JSON.stringify(obj);
    else
        return obj.toString();
};
var fromJsonString = function (obj) {
    if (obj == null)
        return null;
    else if (typeof obj === 'string')
        return JSON.parse(obj);
    else
        return obj;
};
buApp.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.when('/home', {templateUrl: 'views/home.html'}).
            when('/exam1', {templateUrl: 'views/exam1.html'}).
            when('/exam2/:level?', {templateUrl: 'views/exam2.html'}).
            otherwise({redirectTo: '/home'});
    }
]);
buApp.config(function (localStorageServiceProvider) {
    localStorageServiceProvider.setPrefix('BU');
});
buApp.factory('storage', ['localStorageService', function (storage) {
    return {
        store: function (examData) {
            var key = guid();
            var saved = storage.set(key, toJsonString(examData));
            console.log("Data saved: " + saved);
        },
        read: function (key) {
            var val = storage.get(key);
            return fromJsonString(val);
        },
        remove: function (key) {
            var removed = storage.remove(toJsonString(key));
            console.log("Data removed: " + removed);
        },
        list: function () {
            return storage.keys();
        },
        clear: function () {
            var cleared = storage.clearAll();
            console.log("All stored data has bean deleted: " + cleared);
        }
    }
}]);
buApp.exam2levels = ['Bachelors', 'Masters', 'Doctorate'];

buApp.factory('shared', function () {
    return {
        examData: null
    };
});