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
                tags.push(tag);
                // if tag string has spaces then strip off spaces and add the resulting string as a tag too
                if (tag.indexOf(' ') > -1) {
                    tags.push(tag.replace(/ /g, ''));
                }
            }
        }

//        for (var i = 0, filterLength = filter.length; i < filterLength; i++) {
//            var categoryItem = filter[i].data;
//            var categoryFilter = {
//                category: categoryItem.category,
//                tags: []
//            }
//            for (var j = 0, categoryLength = categoryItem.length; j < categoryLength; j++) {
//                var item = categoryItem[j];
//                if (item.value) {
//                    var tag = item.name.toLowerCase();
//                    categoryItem.tags.push(tag);
//                    // if tag string has spaces then strip off spaces and add the resulting string as a tag too
//                    if (tag.indexOf(' ') > -1) {
//                        categoryItem.tags.push(tag.replace(/ /g, ''));
//                    }
//                    filterSet.push(categoryFilter);
//                }
//            }
//        }


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

        // now apply each category filter to every photo
        //var filteredPhotos = [];

        var filteredPhotos = photos.filter(containTags, tags);
//        for (var i = 0, photosLength = photos.length; i < photosLength; i++) {
//            var photo = photos[i];
//
//            // check for different categories of filter
//            for (var j = 0, filterSetLength = filterSet.length; j < filterSetLength; j++) {
//                var categoryFilter = filterSet[j];
//
//
//                // if photo tags contain one of category tag
//                if (photo.tags.indexOf(categoryFilter.tags) > -1) {
//                }
//            }
//
//            // push if the photo is not already in filteredPhotos
////            if (filteredPhotos.indexOf(photo) < 0) {
//            if (photoSelected) {
//                filteredPhotos.push(photo);
//            }
//        }

//        console.log('filteredPhotos - ', filteredPhotos);
//        for (var i = 0; i < filteredPhotos.length; i++) {
//            var filteredPhoto = filteredPhotos[i];
//        }
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