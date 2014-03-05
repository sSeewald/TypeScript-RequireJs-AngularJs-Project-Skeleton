/// <reference path="../_references.ts" />
module app.service {

    export class simpleService implements IService {


        private simpleString:string;

        constructor() {
            this.simpleString = "I'am A Service";
        }

        simpleMethod() {


            this.simpleLogMethod();
            return this.simpleString;

        }

        private simpleLogMethod() {
            console.log(this.simpleString);
        }

        public publicLogMethod(data = 'empty') {
            console.log(data);
        }


    }

}

app.register.service('simpleService',[]);

