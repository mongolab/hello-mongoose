/**
 * Created by özge on 2/21/2016.
 */
angular.module('message', []).factory('$message', ['$http',
    function($http) {
        return {
            create: function(params) {
                var method = 'POST';
                var url = "http://serene-woodland-88772.herokuapp.com/";
                console.log($.param(params));
                return $http({
                    method: method,
                    url : url,
                    data: $.param(params),
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                });
            }
        };
    }
]);