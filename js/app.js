var app;
(function (app) {
    angular.module('app.controller', []);
    angular.module('app.directive', []);
    angular.module('app.filter', []);
    angular.module('app.service', []);

    (function (controller) {
        'use strict';
    })(app.controller || (app.controller = {}));
    var controller = app.controller;
    (function (directive) {
        'use strict';
    })(app.directive || (app.directive = {}));
    var directive = app.directive;
    (function (filter) {
        'use strict';
    })(app.filter || (app.filter = {}));
    var filter = app.filter;
    (function (service) {
        'use strict';
    })(app.service || (app.service = {}));
    var service = app.service;

    (function (register) {
        function controller(className, services) {
            if (typeof services === "undefined") { services = []; }
            var controller = 'app.controller.' + className;
            services.push(app.controller[className]);
            angular.module('app.controller').controller(controller, services);
            return app.register;
        }
        register.controller = controller;

        function filter(className, services) {
            if (typeof services === "undefined") { services = []; }
            var filter = className.toLowerCase();
            services.push(function () {
                return (new app.filter[className]()).filter;
            });
            angular.module('app.filter').filter(filter, services);
            return app.register;
        }
        register.filter = filter;

        function directive(className, services) {
            if (typeof services === "undefined") { services = []; }
            var directive = className[0].toLowerCase() + className.slice(1);
            services.push(function () {
                return newInstanceFactory(app.directive[className], arguments);
            });
            angular.module('app.directive').directive(directive, services);
            return app.register;
        }
        register.directive = directive;

        function service(className, services) {
            if (typeof services === "undefined") { services = []; }
            var service = className[0].toLowerCase() + className.slice(1);
            services.push(function () {
                return newInstanceFactory(app.service[className], arguments);
            });
            angular.module('app.service').factory(service, services);
            return app.register;
        }
        register.service = service;

        var newInstanceFactory = (function () {
            var tmpO = function () {
            };
            return function (o, args) {
                tmpO.prototype = o.prototype;
                var instance = new tmpO();
                o.prototype.constructor.apply(instance, args);
                return instance;
            };
        })();
    })(app.register || (app.register = {}));
    var register = app.register;
})(app || (app = {}));
var app;
(function (app) {
    (function (controller) {
        var simpleController = (function () {
            function simpleController($scope, simpleService) {
                this.$scope = $scope;
                this.simpleService = simpleService;
                this.message = "Message String from Controller 'simpleController'";
                $scope.vm = this;
                simpleService.simpleMethod();

                $scope.customMethod = simpleService.publicLogMethod;
            }
            return simpleController;
        })();
        controller.simpleController = simpleController;
    })(app.controller || (app.controller = {}));
    var controller = app.controller;
})(app || (app = {}));

app.register.controller('simpleController', ["$scope", "simpleService"]);
var app;
(function (app) {
    (function (directive) {
        var simpleClassDirective = (function () {
            function simpleClassDirective() {
                this.template = '<span>Class Directive</span> <a href="#" class="destroyElement">Destroy</a>';
                this.restrict = 'C';
                this.replace = false;
            }
            simpleClassDirective.prototype.link = function ($scope, element, attributes) {
                var link = element.children('.destroyElement');

                link.bind('click', function () {
                    element.remove();
                });

                element.bind('$destroy', function () {
                    link.unbind('click');
                    alert('Element destroyed!');
                });
            };
            return simpleClassDirective;
        })();
        directive.simpleClassDirective = simpleClassDirective;

        var simpleAttrDirective = (function () {
            function simpleAttrDirective() {
                this.template = '<span>Attribute Directive</span> {{vm.message}} <button ng-click="delegatedClick()">Click Me</button>';
                this.restrict = 'A';
                this.replace = false;
                this.scope = { delegatedClick: '&' };
            }
            simpleAttrDirective.prototype.link = function ($scope, element, attributes) {
            };
            return simpleAttrDirective;
        })();
        directive.simpleAttrDirective = simpleAttrDirective;
        var simpleElementDirective = (function () {
            function simpleElementDirective() {
                this.template = '<div><span>Element Directive</span> {{vm.message}}</div>';
                this.restrict = 'E';
                this.replace = true;
            }
            simpleElementDirective.prototype.link = function ($scope, element, attributes) {
            };
            return simpleElementDirective;
        })();
        directive.simpleElementDirective = simpleElementDirective;
        var simpleCommentDirective = (function () {
            function simpleCommentDirective() {
                this.template = '<div><span>Comment Directive</span> {{vm.message}}</div>';
                this.restrict = 'M';
                this.replace = true;
            }
            simpleCommentDirective.prototype.link = function ($scope, element, attributes) {
            };
            return simpleCommentDirective;
        })();
        directive.simpleCommentDirective = simpleCommentDirective;
        var simpleTransclusionDirective = (function () {
            function simpleTransclusionDirective() {
                this.template = '<div><span>Directive with Transclusion</span> {{vm.message}}<p ng-transclude></p></div>';
                this.restrict = 'C';
                this.replace = true;
                this.transclude = true;
            }
            simpleTransclusionDirective.prototype.link = function ($scope, element, attributes) {
            };
            return simpleTransclusionDirective;
        })();
        directive.simpleTransclusionDirective = simpleTransclusionDirective;
    })(app.directive || (app.directive = {}));
    var directive = app.directive;
})(app || (app = {}));

app.register.directive('simpleAttrDirective', []).directive('simpleClassDirective', []).directive('simpleElementDirective', []).directive('simpleCommentDirective', []).directive('simpleTransclusionDirective', []);
var app;
(function (app) {
    (function (service) {
        var simpleService = (function () {
            function simpleService($window) {
                console.log('Dependency injection without static $inject or factory method: ' + $window);
                this.simpleString = "I'am A Service";
            }
            simpleService.prototype.simpleMethod = function () {
                this.simpleLogMethod();
                return this.simpleString;
            };

            simpleService.prototype.simpleLogMethod = function () {
                console.log(this.simpleString);
            };

            simpleService.prototype.publicLogMethod = function (data) {
                if (typeof data === "undefined") { data = 'empty'; }
                console.log(data);
            };
            return simpleService;
        })();
        service.simpleService = simpleService;
    })(app.service || (app.service = {}));
    var service = app.service;
})(app || (app = {}));

app.register.service('simpleService', ["$window"]);
'use strict';
var app;
(function (app) {
    function Init() {
        var ngModules = ['ngRoute', 'nQwery'];

        var modules = ['app.controller', 'app.directive', 'app.filter', 'app.service'];

        angular.module('app', ngModules.concat(modules));
    }
    app.Init = Init;
})(app || (app = {}));
//# sourceMappingURL=app.js.map
