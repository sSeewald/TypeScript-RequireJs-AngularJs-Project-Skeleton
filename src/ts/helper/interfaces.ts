
module app {

    export interface IController {

    }
    export interface IDirective extends ng.IDirective{
        restrict: string;
        link($scope:ng.IScope, element:ng.IAugmentedJQuery, attrs:ng.IAttributes): any;
    }
    export interface IFilter {
        filter (input:any, ...args:any[]): any;
    }


    export interface IService {
    }

}