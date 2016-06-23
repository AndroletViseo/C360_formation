angular.module('controllers')
    .controller('controllerUpdateRegisterTraining', ['$http', '$location', '$filter', function ($http, $location, $filter) {

        var self = this;
        self.regex = {};
        /*** Recupération des regex **/
        $http.get("api/formations/regex").then(function (data) {
            self.regex.trainingTitle = new RegExp(data.data.TRAINING_TITLE);
            self.regex.numberHalfDays = new RegExp(data.data.NUMBER_HALF_DAYS);
        });
        self.isNewTrainingTitle = true;
        self.isFalseForm = false;
        self.isThereAnEmptyField = false;
        var topic1 = {name: "Développement Mobile"};
        var topic2 = {name: "Développement Web"};
        self.topicList = [topic1, topic2];


        var distinctTopicList = [];
        var indexedTeams = [];
        self.isTopicTrue = function (training) {
            var isNewTopic = distinctTopicList.indexOf(training.topicName) == -1;
            if (isNewTopic) indexedTeams.push(training.topicName);
            return isNewTopic;
        };

        // A supprimer après l'intégration du Back
        self.trainingList = [
            {
                "id": 1,
                "trainingTitle": "KKK",
                "topicName": "topic1",
                "numberHalfDays": 5
            },
            {
                "id": 2,
                "trainingTitle": "HHH",
                "topicName": "topic2",
                "numberHalfDays": 4
            },
            {
                "id": 3,
                "trainingTitle": "LLL",
                "topicName": "topic1",
                "numberHalfDays": 2
            }];
        ////////////////////////////////////////

        self.isErrorInputMessageDisplayed = function (inputForm, focus) {
            return !inputForm.$error.required && inputForm.$invalid && !focus;
        };

        self.verifyForm = function (trainingForm) {
            if (trainingForm.$error.required) {
                self.isThereAnEmptyField = true;
                self.isFalseForm = false;
            }
            else if (trainingForm.$invalid) {
                self.isFalseForm = true;
                self.isThereAnEmptyField = false;
            }
            else {
                self.saveAction();
            }
        };

        self.saveAction = function () {
            self.training.trainingTitle = self.training.trainingTitle.replace(/ +/g, " ");
            console.log("object: ", self.training);
            $http.post("api/formations", self.training).success(function (data) {
                if (data == "true" || data == true) {
                    self.isNewTrainingTitle = true;
                    $location.url('/pageblanche');
                }
                else {
                    self.isNewTrainingTitle = false;
                }
            });
        };

    }])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider
            .when('/UpdateRegisterTraining', {
                templateUrl: 'templates/updateRegisterTraining.html',
                controller: 'controllerUpdateRegisterTraining',
                controllerAs: 'DF'
            })
    }
    ]);