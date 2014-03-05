/// <reference path="_references.ts" />


module app {


    export function Init():void {


        var ngModules = ['ngRoute'];

        var modules = ['app.controller', 'app.directive', 'app.filter', 'app.service'];

        angular.module('app', ngModules.concat(modules));


    }

}