'use strict';

app.controller('InicioCtrl', function ($scope, Repo) {
    
    $scope.repos = false;
    
    Repo.get({
        type: 'search',
        org: 'repositories',
        q: 'googleads',
        sort: 'stars',
        order: 'desc'
    }, function (response) {
        $scope.repos = response.items;
    });
});

app.controller('ExibirRepositorioCtrl', function ($scope, $routeParams, Repo, $http, $location) {

    $scope.page = 0;
    var per_page = 20;
    
    $scope.finish = false;
    
    $scope.activate = function (item) {
        $scope.selected = item;
    }
    
    $scope.isActive = function(item) {
        return $scope.selected === item;
    }
    
    var params = '/commits?page=0&per_page=5';
    
    Repo.get({
        type: 'repos',
        org: 'googleads',
        reponame: $routeParams.repo
    },function (response) {
        $scope.stars = response.stargazers_count;
        $scope.forks = response.forks_count;
        $scope.contribs = response.watchers_count;
    });
    
    Repo.query({
        type: 'repos',
        org: 'googleads',
        reponame: $routeParams.repo,
        commit: 'commits',
        page: 0,
        per_page: per_page
    },function (response) {
        $scope.commits = response;
    });
       
    $scope.next_page = function () {
        $scope.page++;
        Repo.query({
            type: 'repos',
            org: 'googleads',
            reponame: $routeParams.repo,
            commit: 'commits',
            page: $scope.page,
            per_page: per_page
        },function (response) {
            for ( var i=0; i<per_page; i++ ){
                $scope.commits.push(response[i]);;
            }
        });
    }
});