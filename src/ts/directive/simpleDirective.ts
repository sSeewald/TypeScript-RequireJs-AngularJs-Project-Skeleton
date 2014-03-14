/// <reference path="../_references.ts" />

module app.directive {

    export class simpleClassDirective implements IDirective {

        /**
         * Compile Arguments/ Attributes
         */
        template = '<span>Class Directive</span> <a href="#" class="destroyElement">Destroy</a>';
        restrict = 'C';
        replace = false;

        /**
         * @param $scope
         * @param element
         * @param attributes
         */
            link($scope, element:ng.IAugmentedJQuery, attributes:ng.IAttributes) {

            var link = element.children('.destroyElement');

            link.bind('click', function () {
                element.remove();
            });

            /**
             * Remove Events for this Element... on destroy
             */
            element.bind('$destroy', function () {
                link.unbind('click');
                alert('Element destroyed!')
            });
        }
    }

    export class simpleAttrDirective implements IDirective {

        /**
         * Compile Arguments/ Attributes
         */
        template = '<span>Attribute Directive</span> {{vm.message}} <button ng-click="delegatedClick()">Click Me</button>';
        restrict = 'A';
        replace = false;
        scope = { delegatedClick: '&'};

        /**
         * @param $scope
         * @param element
         * @param attributes
         */
            link($scope, element:ng.IAugmentedJQuery, attributes:ng.IAttributes) {

        }
    }
    export class simpleElementDirective implements IDirective {

        /**
         * Compile Arguments/ Attributes
         */
        template = '<div><span>Element Directive</span> {{vm.message}}</div>';
        restrict = 'E';
        replace = true;

        /**
         * @param $scope
         * @param element
         * @param attributes
         */
            link($scope, element:ng.IAugmentedJQuery, attributes:ng.IAttributes) {

        }
    }
    export class simpleCommentDirective implements IDirective {

        /**
         * Compile Arguments/ Attributes
         */
        template = '<div><span>Comment Directive</span> {{vm.message}}</div>';
        restrict = 'M';
        replace = true;

        /**
         * @param $scope
         * @param element
         * @param attributes
         */
            link($scope, element:ng.IAugmentedJQuery, attributes:ng.IAttributes) {

        }
    }
    export class simpleTransclusionDirective implements IDirective {

        /**
         * Compile Arguments/ Attributes
         */
        template = '<div><span>Directive with Transclusion</span> {{vm.message}}<p ng-transclude></p></div>';
        restrict = 'C';
        replace = true;
        transclude = true;

        /**
         * @param $scope
         * @param element
         * @param attributes
         */
            link($scope, element:ng.IAugmentedJQuery, attributes:ng.IAttributes) {

        }
    }


}

app.register.directive('simpleAttrDirective', []).directive('simpleClassDirective', []).directive('simpleElementDirective', []).directive('simpleCommentDirective', []).directive('simpleTransclusionDirective', []);