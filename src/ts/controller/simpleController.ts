
module app.controller {

    export class simpleController implements IController {

        message = "Message String from Controller 'simpleController'";

        constructor(private $scope, private simpleService:app.service.simpleService) {

            $scope.vm = this;
            simpleService.simpleMethod();

            $scope.customMethod = simpleService.publicLogMethod;

        }
    }


}

app.register.controller('simpleController', ["$scope", "simpleService"]);
