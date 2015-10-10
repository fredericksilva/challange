'use strict';

var App = angular.module('RepoApp', ['ngResource', 'ngRoute']);

App.constant('CONF', {
    apiEndpoint: 'http://api.github.com'
});

App.config(function ($locationProvider, $routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: '/views/search.html',
            controller: 'InicioCtrl'
        })
        .when('/:repo', {
            templateUrl: '/views/show.html',
            controller: 'ExibirRepositorioCtrl'
        })
        .otherwise({
            redirectTo: '/'
        });
});