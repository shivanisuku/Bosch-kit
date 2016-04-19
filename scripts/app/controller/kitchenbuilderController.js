/**
 * Created by ssukumaran on 4/15/2015.
 */
homeApp.controller('kitchenbuilderCtrl',['$scope','$filter','$modal', '$log','$location', 'dataFactory',  function ($scope,$filter,$modal, $log,$location,dataFactory ) {
    Init();
    $scope.layoutImg='img/design_1.jpg';
    $scope.designs=[{id:1,name:'',description:''},{id:2,name:'',description:''},{id:3,name:'',description:''}]
    $scope.designId;
    $scope.appliances;
    $scope.currentSelectedProductId;
    $scope.currentSelectedApplianceId=0;
    $scope.showTabs=true;
    $scope.userProducts=[];
    $scope.guid;

    $scope.applianceDesignAndProducts;
    $scope.active = {
        appliance: false

    };
    $scope.activateTab = function(tab) {
        $scope.active = {}; //reset
        $scope.active[tab] = true;

    }
    var queryStringGuid= ($location.search()).guid;






    function Init() {
        queryStringGuid= ($location.search()).guid;
            dataFactory.getDesignAndAppliances()
                .success(function (results) {
                    $scope.applianceDesignAndProducts=results;
                    getDesigns();
                    if(queryStringGuid)
                    {
                        getUserDesignedKitchen();
                    }
                    else{
                        $scope.designId=$scope.designs[0].id;
                        getAppliances($scope.designs[0].id)
                    }

                })
                .error(function (error) {
                });
        }

//GET THE DESIGNS FROM DATABASE

    function getDesigns() {

            dataFactory.getDesigns()
                .success(function (designs) {
                    $scope.designs = designs;

                })
                .error(function (error) {

                });
        }

    //GET THE APPLIANCES   AND POPULATE THE DEFAULT PRODUCTS
    function getAppliances(id){

        var design=$filter('filter')($scope.applianceDesignAndProducts,{id:id},true);
        $scope.appliances = design[0].appliances;
        $scope.currentSelectedApplianceId=$scope.appliances[0].id;

        if(queryStringGuid)
        {

        }
        else {
            $scope.userProducts=[];
            angular.forEach($scope.appliances, function (item) {
                $scope.userProducts.push({applianceId: item.id, productId: item.products[0].id})
            });
        }

    }
    //DESIGN SELECT
    $scope.designClick=function(id)
    {
        $scope.layoutImg='img/design_'+id+'.jpg';
        $scope.designId=id;
        queryStringGuid='';
        $scope.guid='';
        getAppliances(id);
    }

    //PRODUCT SELECT
    $scope.showProductDetail=function(id)
    {
        $scope.guid='';
        $scope.currentSelectedProductId=id;
        UpdateUserSelection(id)
    }

    //APPLIANCE SELECT
    $scope.applianceClick=function(id)
    {
        $scope.guid='';
        $scope.currentSelectedApplianceId=id;
    }
    //CLOSE POP UP
    $scope.closePopUp=function(id)
    {
        $scope.currentSelectedProductId=0;
    }
    //VIEW LIST
    $scope.viewList=function()
    {
        console.log( $scope.userProducts);
        var template=' <div class="modal-body" style="background-color: #ffffff" >  <div class="modal-header">' +
            '<span style="display:inline-block;"><h3>Appliances Overview</h3></span> ' +
            '<span style="float:right; display:inline-block;">' +
            '<span ng-click="exportToPdf()" style="cursor: pointer; color:#6d8d23"> <i class="fa fa-file-pdf-o"></i> download to pdf </span>&nbsp;&nbsp;' +
            '<span ng-click="cancel()" style="cursor: pointer; color:#6d8d23"><i class="fa fa-times"></i> close</span>' +
            '</div><div id="canvasViewList">';
        angular.forEach( $scope.userProducts,function(item)
        {
            var appliance=$filter('filter')($scope.appliances,{id:item.applianceId},true);

            var product=$filter('filter')(appliance[0].products,{id:item.productId},true);

            template=template +'<div style="width:230px; display: inline-block; margin-right: 20px; margin-top:20px; vertical-align: text-top; font-weight: 500;" ><img ng-src="img/product_thumb_'+product[0].id +'.jpg" width="150" alt="{{product.name}}"/> '+
            '<br/><br/><b style="font-weight: 900;">Product Name:</b> '+product[0].name+'<br><b style="font-weight: 900">Product Code:</b> '+product[0].code+'<br><b style="font-weight: 900;">Product Description:</b> '+product[0].description+'<br>'+
            '<br/><a ng-href="'+product[0].webUrl+'" target="_blank"><i class="fa fa-info-circle"></i> <b>Product Information</b></a><br>  <i class="fa fa-info-circle"></i> <a href="http://www.bosch-home.ca/support/contact-us.html" target="_blank"><b>More Information</b></a></div>'
        });

        template=template + '</div></div>';
            var modalInstance = $modal.open({
                template: template,
                controller: 'modalInstanceController',
                size: 'lg',
                windowClass: "modal fade in"
            })
    }
    //SET CURRENT SELECTED PRODUCT AND APPLICANCE ID FROM IMAGE
    $scope.setCurrentSelectedProductAndAppliance=function(applianceId,productId)
    {
        $scope.currentSelectedApplianceId=applianceId;
        $scope.currentSelectedProductId=productId;
        $scope.active = {}; //reset
        $scope.active['appliance'] = true;
        UpdateUserSelection(productId)

    }

    //SOCIAL SHARE
    $scope.socialShare=function(id) {
        var ids = [];
        if (!$scope.guid) {
            angular.forEach($scope.userProducts, function (item) {
                 ids.push( item.applianceId + '|' + item.productId );
            });

            if (ids.length) {
                dataFactory.saveKitchen($scope.designId, ids.join(',')).success(function (data) {
                    $scope.guid = data;
                    postTosocilaMedia(id);

                })
                    .error(function (error) {

                    });
            }
        }
        else{
            postTosocilaMedia(id);
        }

    }
    function postTosocilaMedia(id) {
        var absUrl = $location.absUrl() + '?guid=' + $scope.guid;
        var pictureUrl=$location.absUrl()+'/'+$scope.layoutImg;
        if (id == 1) {
            //FACEBOOK

            FB.ui({
                method: 'feed',
                link: absUrl,
                picture: pictureUrl,
                name: 'Bosch Cottage Kitchen',
                caption: 'www.bosch-home.ca',
                description: 'Check out this beautiful kitchen I built with the Bosch Cottage Kitchen Simulator!'
            });
        }
        else {
            //TWITTER
                var returnUrl = "https://twitter.com/share?&text=" + 'Check out this beautiful kitchen I built with the Bosch Cottage Kitchen Simulator!'+"&url=" + encodeURIComponent(absUrl)
                window.open(returnUrl, "", "width=700,height=700");

        }
    }

    //CALL BACK FUNCTION FOR SOCIAL SHARES
    function  getUserDesignedKitchen()
    {

        if(queryStringGuid)
        {
            $location.search('guid', null);
            $location.search('fb_ref', null);

            dataFactory.getUserKitchen(queryStringGuid) .success(function (userKitchen) {
                $scope.designId=userKitchen.id;
                getAppliances(userKitchen.id);
                $scope.userProducts=userKitchen.products;
                $scope.layoutImg='img/design_'+userKitchen.id+'.jpg';

            })
                .error(function (error) {

                });
        }
        else
        {
            alert('no qs');
        }
    }

    //Update user selction
    function UpdateUserSelection(id)
    {

        var found=$filter('filter')($scope.userProducts,{applianceId:$scope.currentSelectedApplianceId},true);
        if(found.length){
            var index = $scope.userProducts.indexOf(found[0] );
            found[0].productId=id;
            $scope.userProducts[index]=angular.copy(found[0]);

        }
        else {
            $scope.userProducts.push({applianceId:$scope.currentSelectedApplianceId,productId:id});

        }
    }
}]);
