'use strict';

var app = angular.module('Portfolio', ['ngRoute', 'ui.bootstrap', 'ngSocial', 'ngTouch', 'google-maps']);

// Declare app level module which depends on filters, and services
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