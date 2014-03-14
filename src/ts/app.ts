/// <reference path="_references.ts" />
'use strict';

module app {

    export function Init():void {

        var ngModules = ['ngRoute','nQwery'];

        var modules = ['app.controller', 'app.directive', 'app.filter', 'app.service'];

        angular.module('app', ngModules.concat(modules));

    }

}
