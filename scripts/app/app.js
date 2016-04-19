
var homeApp = angular.module('homeApp', ['ui.bootstrap']);
homeApp.config(['$sceProvider','$locationProvider',function($sceProvider,$locationProvider)
{
    //disable security check for urls
    $sceProvider.enabled(false);
    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });

}]);
