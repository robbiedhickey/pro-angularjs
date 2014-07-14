angular.module("customFilters", [])
    .filter("unique", function() {
        return function(data, propertyName) {
            if (angular.isArray(data) && angular.isString(propertyName)) {
                var results = [];
                var keys = {};
                for (var i = 0; i < data.length; i++) {
                    var val = data[i][propertyName];
                    if (angular.isUndefined(keys[val])) {
                        keys[val] = true;
                        results.push(val);
                    }

                }
                return results;
            } else {
                return data;
            }
        };
    })
    //builds on top of limitTo filter to implement paging
    .filter("range", function($filter) {
        return function(data, page, size) {
            if (angular.isArray(data) && angular.isNumber(page) && angular.isNumber(size)) {
                var start_index = (page - 1) * size;
                if (data.length < start_index) {
                    return [];
                } else {
                    return $filter("limitTo")(data.splice(start_index), size);
                }
            } else {
                return data;
            }
        };
    })
    // this is a bit of a hack. ng-repeat only works on data arrays, you can't tell it to repeat a 
    // specified number of times. Instead, we determine how many pages an array of data can display, 
    // then we return an array with as many elements as would correspond with the number of pages.
    // In the UI, we use the ng-repeat index to build the page numbers. Hack, but it works.
    .filter("pageCount", function() {
        return function(data, size) {
            if (angular.isArray(data)) {
                var result = [];
                for (var i = 0; i < Math.ceil(data.length / size); i++) {
                    result.push(i);
                }
                return result;
            } else {
                return data;
            }
        };
    });
