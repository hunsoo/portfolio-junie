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
    $scope.categoryFilters = FilterResource.query(function () {});

    $scope.open = function (item, items) {
//        var modalInstance =
        $modal.open({
            templateUrl: 'viewPhoto.html',
            scope: $scope,
            controller: 'ModalInstanceController',
            resolve: {
                item: function () {
                    return item;
                },
                items: function () {
                    return items;
                }
            }
        });
    };

    // check if the uploaded date is within a month from now
    $scope.isRecent = function (date) {
        var howManyDaysAgo = 7;
        // convert integer date value to Date object
        date = new Date(date * 1000);
        var today = new Date();
        var daysAgo = new Date(today.setDate(today.getDate() - howManyDaysAgo));
        return (date > daysAgo);
    };
});

app.controller('ModalInstanceController', function ($scope, $modalInstance, $timeout, $document, item, items) {
    $scope.item = item;
    var size = items.length;
    var index = items.indexOf(item);

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };

    $scope.prevImage = function () {
        index = (index - 1 + size) % size;
        $scope.item = items[index];
    };

    $scope.nextImage = function () {
        index = (index + 1) % size;
        $scope.item = items[index];
    };

    $document.bind('keydown', function (event) {
        switch (event.which) {
            case 39: // right arrow key
                // don't know why the view doesn't update without this manual digest
                $timeout(function () {
                    $scope.nextImage();
                });
                return false;
            case 37: // left arrow key
                $timeout(function () {
                    $scope.prevImage();
                });
                return false;
        }
    });
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