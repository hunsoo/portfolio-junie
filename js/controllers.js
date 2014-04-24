'use strict';

app.controller('MenuController', function ($scope, $location) {
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

app.controller('PhotoController', function ($scope, $modal, FacebookService, FlickrService, InstagramService, FilterResource) {
    $scope.photos = [];
    InstagramService.getPhotos().then(function (response) {
        $scope.photos.push.apply($scope.photos, response);
    });
    FlickrService.getPhotos().then(function (response) {
        $scope.photos.push.apply($scope.photos, response);
    });

    $scope.shareOnFacebook = FacebookService.share;
//    $scope.shareOnTwitter = TwitterService.share;

    $scope.isCollapsed = false;
    $scope.filters = FilterResource.query(function () {});

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
        var howManyDaysAgo = 7;
        var date = new Date(date * 1000);
        var today = new Date();
        var daysAgo = new Date(today.setDate(today.getDate() - howManyDaysAgo));
        return (date > daysAgo);
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

app.controller('GoogleMapController', function ($scope) {
    $scope.map = {
        center: {
            // Fresh Meadows, NY 11365
            latitude: 40.739533,
            longitude: -73.802697
        },
        zoom: 13
    };
});

app.controller('EmailController', function ($scope) {
    $scope.email = {
        recipient: 'jewknee620@gmail.com'
    }
});