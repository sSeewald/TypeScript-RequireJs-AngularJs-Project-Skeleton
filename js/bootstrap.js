requirejs.config({
    baseUrl: '/js',
    paths: {
        lib: ['lib']
    },
    urlArgs: "dev=" + (new Date()).getTime(),
    shim: {
        "lib/angular": {
            exports: "lib/angular"
        },
        "lib/angular-route": {
            deps: ["lib/angular"]
        },
        "app": {
            deps: ["lib/angular"]
        }
    }
});

requirejs(['app', 'lib/angular', 'lib/angular-route'], function (o) {
    var App = window['app'] = window['app'] || o.app;

    App.Init();

    angular.bootstrap(document, ['app']);
});
//# sourceMappingURL=bootstrap.js.map
