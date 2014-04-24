'use strict';

/* Filters */
app.filter('PhotosFilter', function () {
    return function (photos, filter) {
        if (!filter) {
            return;
        }

        // create new tags array with only relevant tags and also concatenate tags with spaces
        var tags = [];
        var categoryItems = filter.data;
        for (var j = 0, categoryLength = filter.data.length; j < categoryLength; j++) {
            var item = categoryItems[j];
            if (item.value) {
                var tag = item.name.toLowerCase();

                // if tag string has spaces then strip off spaces and add the resulting string as a tag too
                // if no space, just add the string as a tag
                if (tag.indexOf(' ') > -1) {
                    tags.push(tag.replace(/ /g, ''));
                } else {
                    tags.push(tag);
                }
            }
        }

        function containTags(photo, index, array) {
            var tags = this;
//            console.log('tags - ', tags);
            for (var index in tags) {
                var tag = tags[index];
//                console.log('**contain tag - ' + tag + ': ', photo.tags.indexOf(tag) > -1);
                if (photo.tags.indexOf(tag) > -1) {
                    // we found a match
                    return true;
                }
            };
            // no match
            return false;
        }

        var filteredPhotos = photos.filter(containTags, tags);
        return filteredPhotos;
    }
});

app.filter('IdentityFilter', function () {
    return function (photos, filter) {
        return photos;
    }
});

app.filter('Partition', function() {
  var cache = {};
  var filter = function(arr, size) {
    if (!arr) { return; }
    var newArr = [];
    for (var i=0; i<arr.length; i+=size) {
      newArr.push(arr.slice(i, i+size));
    }
    var arrString = JSON.stringify(arr);
    var fromCache = cache[arrString+size];
    if (JSON.stringify(fromCache) === JSON.stringify(newArr)) {
      return fromCache;
    }
    cache[arrString+size] = newArr;
    return newArr;
  };
  return filter;
});