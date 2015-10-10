'use strict';

App.controller('InicioCtrl', function (Repo) {
    
    var vm = this;
    vm.repos = false;
    
    Repo.get({
        type: 'search',
        org: 'repositories',
        q: 'googleads',
        sort: 'stars',
        order: 'desc'
    }, function (response) {
        vm.repos = response.items;
    });
});

App.controller('ExibirRepositorioCtrl', function ($routeParams, Repo, $http, $location) {
    var vm = this;
    vm.page = 0;
    var per_page = 20;
    
    vm.finish = false;
    
    vm.activate = function (item) {
        vm.selected = item;
    }
    
    vm.isActive = function(item) {
        return vm.selected === item;
    }
    
    var params = '/commits?page=0&per_page=5';
    
    Repo.get({
        type: 'repos',
        org: 'googleads',
        reponame: $routeParams.repo
    },function (response) {
        vm.stars = response.stargazers_count;
        vm.forks = response.forks_count;
        vm.contribs = response.watchers_count;
    });
    
    Repo.query({
        type: 'repos',
        org: 'googleads',
        reponame: $routeParams.repo,
        commit: 'commits',
        page: 0,
        per_page: per_page
    },function (response) {
        vm.commits = response;
    });
       
    vm.next_page = function () {
        vm.page++;
        Repo.query({
            type: 'repos',
            org: 'googleads',
            reponame: $routeParams.repo,
            commit: 'commits',
            page: vm.page,
            per_page: per_page
        },function (response) {
            for ( var i=0; i<per_page; i++ ){
                vm.commits.push(response[i]);;
            }
        });
    }
});