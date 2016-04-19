homeApp.controller('homeCtrl', function ($scope, $modal, $log) {

    //Check for mobile browser
    $scope.isMobile=isMobile();
    //Videos
    //To update an existing video tag you must change the name, title, and url. The image URL comes from the youtube URL.
    //To create a new one simply copy paste from the curly brace to the closing curly brace and put a comma between each video
    $scope.videos = [
        { name: 'Cottage Life Video', title: 'Bosch Steam Oven', description: 'Cottage Life Food', imageUrl: 'http://img.youtube.com/vi/qZsuyjtkVLg/0.jpg', url: 'https://www.youtube.com/embed/qZsuyjtkVLg" frameborder="0" allowfullscreen="True"' ,mobileUrl:'https://www.youtube.com/watch?v=qZsuyjtkVLg'},
        { name: 'Cottage Life Video', title: 'Bosch Speed Oven', description: 'Cottage Life Food', imageUrl: 'http://img.youtube.com/vi/x47V9aWRgF8/0.jpg', url: 'https://www.youtube.com/embed/x47V9aWRgF8" frameborder="0" allowfullscreen="True"' ,mobileUrl:'https://www.youtube.com/watch?v=x47V9aWRgF8'},
        { name: 'Cottage Life Video', title: 'Bosch Induction Cooktop', description: 'Cottage Life Food', imageUrl: 'http://img.youtube.com/vi/B0yM15_ov6I/0.jpg', url: 'https://www.youtube.com/embed/B0yM15_ov6I" frameborder="0" allowfullscreen="True"' ,mobileUrl:'https://www.youtube.com/watch?v=B0yM15_ov6I'},
        ];

    //BLOGS
    //To update an existing blog tag you must change the header,name, and link. The image image should be placed in img folder .
    //To create a new one simply copy paste from the curly brace to the closing curly brace and put a comma between each blog.Place the image in img folder.
    $scope.blogs = [
        { header:'Cottage Life Blog',name: 'Space-saving upgrades for your cottage kitchen', smallline:'DIY + Design',link: 'http://cottagelife.com/100121/uncategorized/space-saving-upgrades-for-your-cottage-kitchen', imageUrl: 'img/blog/blog_01.jpg' },
        { header:'Cottage Life Blog',name: '5 ways to boost the efficiency of your cottage kitchen', smallline:'DIY + Design',link: 'http://cottagelife.com/100117/uncategorized/5-ways-to-boost-the-efficiency-of-your-cottage-kitchen', imageUrl: 'img/blog/blog_02.jpg' },
        {header:'Cottage Life Blog', name: 'No-sweat cleaning tips for your kitchen appliances',smallline:'DIY + Design', link: 'http://cottagelife.com/100110/uncategorized/no-sweat-cleaning-tips-for-your-kitchen-appliances', imageUrl: 'img/blog/blog_03.jpg' },
        {header:'Cottage Life Blog', name: '5 space-saving appliances for a crammed cottage kitchen', smallline:'DIY + Design',link: 'http://cottagelife.com/100103/uncategorized/5-space-saving-appliances-for-a-crammed-cottage-kitchen', imageUrl: 'img/blog/blog_4.jpg' },
        {header:'Cottage Life Blog', name: 'Cottage kitchen reno dos and don\'ts',smallline:'DIY + Design', link: 'http://cottagelife.com/100101/uncategorized/cottage-kitchen-reno-dos-and-donts', imageUrl: 'img/blog/blog_05.jpg' },
        {header:'Cottage Life Blog', name: '6 upgrades for your dream cottage kitchen', smallline:'DIY + Design',link: 'http://cottagelife.com/100099/uncategorized/6-upgrades-for-your-dream-cottage-kitchen', imageUrl: 'img/blog/blog_06.jpg' }
    ];

    //Main tabs
    $scope.tabs = [
        { title:'Dynamic Title 1', content:'Dynamic content 1' },
        { title:'Dynamic Title 2', content:'Dynamic content 2', disabled: true }
    ];
    //Modal dialog
    $scope.open = function (index) {
        var video = $scope.videos[index].url;
        var template = ' <div class="modal-body">' +
            '<div class="modal-header" style="border:0px;">' +
            '   <span style="float:right; display:inline-block; margin-bottom: 20px;">' +
            '       <a style="cursor:pointer; color:#ffffff; text-decoration: none;" ng-click="cancel()"><i class="fa fa-times"></i> close</a>' +
            '   </span>' +
            '</div>' +
            '' +
            '<br/><div class="youtube_container"><iframe class="youtube_video" src="' + video + '"/ ></span> ' +
            '</div>'
        var modalInstance = $modal.open({
            template:template,
            controller: 'modalInstanceController',
            size: 'lg',
            windowClass: "modal fade in"
        });
    };
    function isMobile() {
        var index = navigator.appVersion.indexOf("Mobile");
        return (index > -1);
    }
});


