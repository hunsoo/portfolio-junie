'use strict';

app.controller('MenuController', function($scope, $location) {
    $scope.isCollapsed = true;

    $scope.isActive = function (viewLocation) {
        return viewLocation === $location.path();
    };

    $scope.toggle = function () {
        $scope.isCollapsed = !$scope.isCollapsed;
    }
});

app.controller('SocialController', function ($scope) {
    $scope.title = "Drawings with Paw";
    $scope.description = "Junie Kim's portfolio website with all kinds of stupid and meaningless drawings";
});

app.controller('PhotoController', function ($scope, $modal, FacebookService, FlickrService, InstagramService) {
    $scope.type = {
        toydesign: true,
        illustration: true,
        figuredrawing: false
    };

    $scope.material = {
        pen: true,
        pencil: true,
        pastel: true
    }

    $scope.seriousness = {
        serious: true,
        notsoserious: true,
        stupid: false
    }

    $scope.toggle = function(criteria) {
        criteria = !criteria;
    }

    $scope.share = FacebookService.share;

    $scope.photos = [];

    InstagramService.getPhotos().then(function(response) {
//        $scope.photos = response;
        $scope.photos.push.apply($scope.photos, response);
    });

    FlickrService.getPhotos().then(function(response) {
//        $scope.photos = response;
        $scope.photos.push.apply($scope.photos, response);
    });

    $scope.open = function (item) {
        var modalInstance = $modal.open({
            templateUrl: 'viewPhoto.html',
            scope: $scope,
            controller: 'ModalInstanceController',
            resolve: {
                item: function () {
                    return item;
                }
            }
        });
    };

    // check if the uploaded date is within a month from now
    $scope.isRecent = function (date) {
        var date = new Date(date*1000);
        var today = new Date();
        var monthAgo = new Date(today.setMonth(today.getMonth() - 1));
        //TODO: remove the line below to make it work with real data
        //var monthAgo = new Date(2013, 9, 1);
        return (date > monthAgo);
    };
});

app.controller('ModalInstanceController', function ($scope, $modalInstance, item) {
    $scope.item = item;

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    }

    $scope.next = function () {

    }
    $scope.previous = function () {

    }
});

app.controller('GoogleMapController', function($scope) {
    $scope.map = {
        center: {
            // Fresh Meadows, NY 11365
            latitude: 40.739533,
            longitude: -73.802697
        },
        zoom: 13
    };
});

app.controller('EmailController', function($scope) {
    $scope.email  = {
        recipient: 'jewknee620@gmail.com'
    }
})