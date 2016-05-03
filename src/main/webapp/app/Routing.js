angular.module('App')
    .config(['$routeProvider',function($routeProvider) {
                     $routeProvider
                     .when('/EnregistrementCollaborateur', {
                         templateUrl: 'templates/EnregistrementCollaborateur.html',
                         controller: 'CtrlCol as EC',
                         controllerAs:'EC'
                     })
                     .when('/DeclarationFormation', {
                         templateUrl: 'templates/DeclarationFormation.html',
                         controller: 'CtrlFor',
                         controllerAs:'DF'
                     })
                     .when('/DeclarationSession', {
                         templateUrl: 'templates/DeclarationSession.html',
                         controller: 'CtrlSes',
                         controllerAs:'DS'
                     })
                     .when('/AffectationSession', {
                         templateUrl: 'templates/AffectationSession.html',
                         controller: 'CtrlAffectationSession',
                         controllerAs:'AS'
                     })
                     .when('/DemandeFormation', {
                         templateUrl: 'templates/DemandeFormation.html',
                         controller: 'CtrlDemandeForm',
                         controllerAs:'DmF'
                     });  
                 }
             ]);