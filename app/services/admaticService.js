app.factory('Repo', function ($resource, CONF) {
    return $resource(CONF.apiEndpoint+'/:type/:org/:reponame/:commit', { 
        type: '@type', 
        org: '@org', 
        repomane: '@reponame', 
        commit: '@commit' 
    });
});