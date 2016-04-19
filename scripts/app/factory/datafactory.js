/**
 * Created by ssukumaran on 4/15/2015.
 */
homeApp.factory('dataFactory', ['$http','$q',function($http, $q){
    //var urlBase = 'http://localhost:62654/api/';http://boschkitchenbuilderapi.wiredmessenger.com/api/design
    //var urlBase = 'http://stg.boschkitchen.wiredmessenger.com/kitchenbuilderapi/api/';
    var urlBase = 'http://boschkitchenbuilderapi.wiredmessenger.com/api/';
    $http.defaults.headers.put = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Origin,Content-Type, X-Requested-With,Accept'
    };

    $http.defaults.useXDomain = true;
        var dataFactory = {};
    dataFactory.getDesigns=function() {
        return $http.get(urlBase + 'design')
    }
    dataFactory.getDesignAndAppliances=function() {
        return $http.get(urlBase + 'ApplianceProducts')
    }
    //dataFactory.getAppliances=function(id) {
    //    return $http.get(urlBase + 'ApplianceProducts'+'/?id='+id)
    //}
    dataFactory.saveKitchen=function(designId,productIds)
    {
        return $http.get(urlBase+'User'+'?designId='+ designId+'&productIds='+productIds)

    }
    dataFactory.getUserKitchen=function(guid)
    {
        return $http.get(urlBase+'User'+'/?guid='+guid);
    }

    return dataFactory
    }]);

