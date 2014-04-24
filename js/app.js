'use strict';

var app = angular.module('Portfolio', ['ngRoute', 'ui.bootstrap', 'ngTouch', 'ngSocial', 'google-maps', 'ngResource']);

app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/', {
        templateUrl: 'partials/portfolio.html',
        controller: 'MenuController'
    }).when('/profile', {
        templateUrl: 'partials/profile.html',
        controller: 'MenuController'
    }).when('/contact', {
        templateUrl: 'partials/contact.html',
        controller: 'MenuController'
    });
    $routeProvider.otherwise({redirectTo: '/'});
}]);