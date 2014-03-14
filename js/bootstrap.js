requirejs.config({
    baseUrl: 'js',
    paths: {
        lib: ['lib'],
        app: ['app']
    },
    urlArgs: "dev=" + (new Date()).getTime(),
    shim: {
        "lib/angular": {
            exports: "angular"
        },
        "app": {
            deps: ['lib/qwery', 'lib/angular', 'lib/angular-route', 'lib/angular-qwery']
        },
        "lib/angular-route": {
            deps: ["lib/angular"]
        },
        "lib/angular-qwery": {
            deps: ["lib/qwery", "lib/angular"]
        }
    }
});

requirejs(['lib/qwery', 'app'], function (qwery) {
    window['qwery'] = qwery;

    window['app'] = window['app'] || ['app'];

    window['app'].Init();

    angular.bootstrap(document, ['app']);
});
//# sourceMappingURL=bootstrap.js.map
