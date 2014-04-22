'use strict';

// Facebook
app.service('FacebookService', function () {
    window.fbAsyncInit = function () {
        FB.init({
            appId: '643852465686530',
            status: true,
            cookie: true,
            xfbml: true
        });
    };
    (function () {
        var e = document.createElement('script');
        e.async = true;
        e.src = document.location.protocol +
            '//connect.facebook.net/en_US/all.js';
        document.getElementById('fb-root').appendChild(e);
    }());

    return {
        share: function (item) {
            FB.ui(
                {
                    method: 'feed',
                    name: "Drawings with Paw",
                    link: 'https://www.flickr.com/photos/101690713@N06/',
                    picture: item.url_c,
                    caption: item.title,
                    description: item.description,
                    message: ''
                });
        }
    }
});

// Instagram
app.factory('InstagramService', ['$http', function ($http) {
    var base_url = "https://api.instagram.com/v1";
    // get your own client id http://instagram.com/developer/
    var access_token = '579952724.1fb234f.70a242ae264d4ef78f165114b4e50a9c';
    var client_id = '50a8a8e965024b7cbc31ec8f88a807dd';
    var user_id = '579952724';

    return {
        getPhotos: function () {
            var request = '/users/' + user_id + '/media/recent';
            var photoset_url = base_url + request;
            var config = {
                'params': {
                    //access_token: access_token,
                    client_id: client_id,
                    callback: 'JSON_CALLBACK'
                }
            };
            // this is for stripping off hashtags
            var regexp = new RegExp('#([^\\s]*)', 'g');

            return $http.jsonp(photoset_url, config)
                .then(function (response) {
                    var photos = response.data.data;
                    angular.forEach(photos, function (value, key) {
                        value.source = 'Instagram';
                        // remove hashtags from description
                        value.title = value.caption.text.replace(regexp, '').trim();
                        value.title = (value.title === '' ? 'Untitled' : value.title);
//                        value.title = value.title.substring(0,18) + (value.title.length > 19 ? '..' : '');
                        value.description = value.caption.text;
                        value.url_c = value.images.standard_resolution.url;
                        value.url_o = value.images.standard_resolution.url;
                        value.dateupload = value.created_time;
                        value.views = value.likes.count;
                    });
                    function ownPictureFilter(photo, index, array) {
                        return (photo.user.username === 'juniekim620');
                    }

//                    photos = photos.filter(ownPictureFilter);
                    return photos;
                });
        }
    };
}]);

// Flickr
app.factory('FlickrService', function ($http) {
    function base58_encode(input) {
        var alphabet = '123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ';
        var base = alphabet.length;

        if (typeof input !== 'number' || input !== parseInt(input))
            throw '"encode" only accepts integers.';
        var encoded = '';
        while (input) {
            var remainder = input % base;
            input = Math.floor(input / base);
            encoded = alphabet[remainder].toString() + encoded;
        }
        return encoded;
    }

    function base58_decode(snipcode) {
        var alphabet = '123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ';
        var base = alphabet.length;
        var num = snipcode.length;
        var decoded = 0;
        var multi = 1;
        for (var i = (num - 1); i >= 0; i--) {
            decoded = decoded + multi * alphabet.indexOf(snipcode[i]);
            multi = multi * base;
        }
        return decoded;
    }

    return {
        getPhotos: function () {
            var photoset;

            var photoset_url = 'https://api.flickr.com/services/rest/';
            var config = {
                params: {
                    method: 'flickr.photosets.getPhotos',
                    api_key: 'cc5ee47ca01f2b7e0517701ad4f89501',
                    photoset_id: '72157638621171243',
                    extras: 'date_upload,tags,views,url_o,url_c,url_q,description',
                    format: 'json',
                    //callback: 'JSON_CALLBACK'
                    nojsoncallback: 1
                }
            };

            photoset = $http.get(photoset_url, config)
                .then(function (response) {
                    var photos = response.data.photoset.photo;
                    angular.forEach(photos, function (value, key) {
                        value.source = 'Flickr';
                        value.description = value.description._content;
                        value.images = {
                            short_url: 'http://flic.kr/p/' + base58_encode(parseInt(value.id)),
                            thumbnail: {
                                url: value.url_q
                            }
                        }
                        delete value.url_q;
                    });
                    return photos;
                });
            return photoset;
        }
    }
});