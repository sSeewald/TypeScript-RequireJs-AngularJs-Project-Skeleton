/// <reference path="../_references.ts" />

module app {

    angular.module('app.controller', []);
    angular.module('app.directive', []);
    angular.module('app.filter', []);
    angular.module('app.service', []);

    export module controller {
        'use strict';
    }
    export module directive {
        'use strict';
    }
    export module filter {
        'use strict';
    }
    export module service {
        'use strict';
    }

    export module register {

        export function controller(className:string, services = []) {
            var controller = 'app.controller.' + className;
            services.push(app.controller[className]);
            angular.module('app.controller').controller(controller, services);
            return app.register;
        }

        export function filter(className:string, services = []) {
            var filter = className.toLowerCase();
            services.push(() => (new app.filter[className]()).filter);
            angular.module('app.filter').filter(filter, services);
            return app.register;
        }

        export function directive(className:string, services = []) {
            var directive = className[0].toLowerCase() + className.slice(1);
            services.push(():IDirective => {
                return newInstanceFactory(app.directive[className], arguments);
            });
            angular.module('app.directive').directive(directive, services);
            return app.register;
        }

        export function service(className:string, services = []) {
            var service = className[0].toLowerCase() + className.slice(1);
            services.push(():IService => {
                    return newInstanceFactory(app.service[className], arguments);
                }
            );
            angular.module('app.service').factory(service, services);
            return app.register;

        }

        var newInstanceFactory = (() => {
            var tmpO = () => {
            };
            return function (o, args) {
                tmpO.prototype = o.prototype;
                var instance = new tmpO();
                o.prototype.constructor.apply(instance, args);
                return instance;
            }
        })();


    }

}
