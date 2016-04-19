/**
 * Created by ssukumaran on 4/18/2015.
 */
angular.module('homeApp').controller('modalInstanceController', function ($scope, $modalInstance) {
    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
    $scope.exportToPdf=function(){
      getImageFromUrl('http://localhost:63342/KitchenBuilderUI//img/BSH%20cottage%20life%20940x230%20i1B.jpg', createPDF)


       };
     function getImageFromUrl(url,callback) {
        var img = new Image, data, ret={data: null, pending: true};

        img.onError = function() {
            throw new Error('Cannot load image: "'+url+'"');
        }
        img.onload = function() {
            var canvas = document.createElement('canvas');
            document.body.appendChild(canvas);
            canvas.width = img.width;
            canvas.height = img.height;

            var ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0);
            // Grab the image as a jpeg encoded in base64, but only the data
            data = canvas.toDataURL('image/jpeg',1.0).slice('data:image/jpeg;base64,'.length);
            // Convert the data to binary form
            data = atob(data)
            document.body.removeChild(canvas);

            ret['data'] = data;
            ret['pending'] = false;
            callback(data);

        }
        img.src = url;

        return data;
    }
      var createPDF = function(imgData) {
        var el = $('#canvasViewList');
        html2canvas($(el), {
            background:'#fff',
            onrendered: function(canvas) {
                var img = canvas.toDataURL("image/jpeg",1.0);
                // window.open(img);
                var doc = new jsPDF('p','mm','a4');

                doc.setFontSize(20);
                doc.text(30, 15, "Kitchen Builder - Configured Appliances");
                doc.addImage(imgData, 'JPEG', 25, 25, 150, 40);
                 doc.addImage(img, 'JPEG', 25, 70, 195, 100);
                doc.save('kitchen.pdf');

            }})
    }
});