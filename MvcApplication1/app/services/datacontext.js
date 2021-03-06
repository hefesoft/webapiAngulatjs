(function () {
    'use strict';

    var serviceId = 'datacontext';
    angular.module('app').factory(serviceId,
        ['common', '$http','$resource', datacontext]);

    function datacontext(common, $http, $resource) {
        var $q = common.$q;

        var service = {
            getPeople: getPeople,
            getMessageCount: getMessageCount,
            obtenerValues: obtenerValues,
            saveValue: saveValue,
            removeValue: removeValue,
            updateValue: updateValue
        };

        return service;

        function getMessageCount() { return $q.when(72); }

        function getPeople() {
            var people = [
                { firstName: 'John', lastName: 'Papa', age: 25, location: 'Florida' },
                { firstName: 'Ward', lastName: 'Bell', age: 31, location: 'California' },
                { firstName: 'Colleen', lastName: 'Jones', age: 21, location: 'New York' },
                { firstName: 'Madelyn', lastName: 'Green', age: 18, location: 'North Dakota' },
                { firstName: 'Ella', lastName: 'Jobs', age: 18, location: 'South Dakota' },
                { firstName: 'Landon', lastName: 'Gates', age: 11, location: 'South Carolina' },
                { firstName: 'Haley', lastName: 'Guthrie', age: 35, location: 'Wyoming' }
            ];
            return $q.when(people);
        }


        // Como se hace con promesas
        //function obtenerValues() {
        //    var deferred = $q.defer();
        //    $http({
        //        method: 'GET',
        //        url: 'api/values'
        //    }).
        //     success(function (data, status, headers, config) {
        //         deferred.resolve(data);
        //     }).
        //     error(function (data, status) {
        //         deferred.reject(data);
        //     });

        //    return deferred.promise;
        //}
        
        // Como se hace con recursos
        function obtenerValues() {
            return $resource('api/values').query();
        }
        
        function saveValue(value) {
            return $resource('api/values').save(value);
        }
        
        function updateValue(value) {
            return $http.put('api/values/', value);
        }
        
        function removeValue(value) {
            
            return $resource('api/values/'+value).delete();
        }
    }
})();