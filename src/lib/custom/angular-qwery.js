/*!
 * A wrapper to integrate qwery as optional selector engine.
 **/

(function (window, angular, el, _el) {
    'use strict';

    angular
        .module('nQwery', [])
        .service('nQweryHelper', function () {

        })
        .run(function () {

            /*
             * Save reference to the angular-element-method.
             **/
            angular[_el] = angular[el];


            var extJqLite = angular.element;

            var qwery = window.qwery;


            extJqLite.prototype['children'] = function (selector) {

                // The passed element is already an instance of angular._element.
                if (selector instanceof angular[_el]) {
                    return angular[_el].children(selector);
                }
                // A selector-string is passed - pass it through qwery and return a angular.element dom collection.
                if (typeof selector === 'string') {
                    //return [];
                    return angular[_el](qwery(selector, this));
                }
                return angular[_el](selector);
            };

            extJqLite.prototype['find'] = function (selector) {

                var elements = [],
                    cIndex = 0,
                    context,
                    elIndex = 0,
                    elLength,
                    element;

                for (cIndex = 0, context = this.length; cIndex < context; cIndex++) {
                    element = qwery(selector, this[cIndex]);
                    for (elIndex = 0, elLength = element.length; elIndex < elLength; elIndex++) {
                        elements.push(element[elIndex]);
                    }
                }
                return angular[_el](qwery.uniq(elements))
            };

        });

})(window, window.angular, 'element', '_element');