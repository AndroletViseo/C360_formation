angular.module('controllers')
    .controller('controllerRegisterCollaborator', ['$http', '$location', function ($http, $location) {
        var self = this;
        self.regex = {};

        /*** Recupération des regex **/
        $http.get("api/collaborateurs/regex").then(function (data) {
            self.regex.personnalIdNumber = new RegExp(data.data.PERSONNAL_ID_NUMBER);
            self.regex.lastName = new RegExp(data.data.LAST_NAME);
            self.regex.firstName = new RegExp(data.data.FIRST_NAME);
        });

        self.isNewPersonalIdNumber = "true";
        self.isFalseForm = false;
        self.isThereAnEmptyField = false;

        self.checkValidForm = function (collaboratorForm) {
            if (collaboratorForm.$invalid == true) {
                self.isFalseForm = true;
                self.isThereAnEmptyField = false;
            }
        };

        self.verifyForm = function (collaboratorForm) {
            if (self.collaborator !== undefined) {
                if (self.collaborator.lastName === "" || self.collaborator.firstName === "") {
                    self.isThereAnEmptyField = true;
                    self.isFalseForm = false;
                }
                else self.checkValidForm(collaboratorForm);
            }
            else {
                self.isThereAnEmptyField = true;
            }

            if (self.isFalseForm == false && self.isThereAnEmptyField == false) {
                self.saveAction();
            }
        };

        self.saveAction = function () {
            //delete useless spaces between words 
            self.collaborator.lastName = self.collaborator.lastName.replace(/ +/g, " ");
            self.collaborator.firstName = self.collaborator.firstName.replace(/ +/g, " ");

            //post the form to the server
            $http.post("api/collaborateurs", self.collaborator).success(function (data) {
                if (data == "true" || data == true) {
                    self.isNewPersonalIdNumber = true;
                    $location.url('/pageblanche');
                }
                else self.isNewPersonalIdNumber = false;
            });
        }
    }])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider
            .when('/RegisterCollaborator', {
                templateUrl: 'templates/registerCollaborator.html',
                controller: 'controllerRegisterCollaborator',
                controllerAs: 'EC'
            })
    }
    ]);
