
angular.module('controllers')
    .controller('controllerRegisterTraining', ['$http', '$location',function($http, $location) {

        var self = this;
        self.regex = {};

        /*** Recupération des regex **/
        $http.get("api/formations/regex").then(function(data){
            self.regex.trainingTitle = new RegExp(data.data.TRAINING_TITLE);
            self.regex.numberHalfDays = new RegExp(data.data.NUMBER_HALF_DAYS);
        });

        self.isNewTrainingTitle = true;
        self.isFalseForm = false;

        self.verifyForm=function(trainingForm){
            if(trainingForm.$invalid == false){
                self.saveAction();
            }
            else{
                self.isFalseForm = true;
            }
        }
        self.saveAction = function() {
            self.training.trainingTitle= self.training.trainingTitle.replace(/ +/g, " ");
            $http.post("api/formations", self.training).success(function(data){
               if(data == "true" || data == true){
                    self.isNewTrainingTitle = true;
                    document.location.href = 'pageblancheformation.html';
                }
                else {
                    self.isNewTrainingTitle = false;
                }
            });
        };
    }]);