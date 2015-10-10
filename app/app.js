var app = angular.module('app', ['ngResource', 'ngRoute'])

    .constant('CONF', {
        apiEndpoint: 'https://api.github.com'
    })

    .config(function ($locationProvider, $routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'partials/search.html',
                controller: 'InicioCtrl'
            })
            .when('/:repo', {
                templateUrl: 'partials/show.html',
                controller: 'ExibirRepositorioCtrl'
            })
            .otherwise({
                redirectTo: '/'
            });

});