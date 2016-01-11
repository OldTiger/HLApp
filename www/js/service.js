app.factory('HLService', function($http) {
    var factory = {
        server: "http://192.168.0.111:8080/SpinningShop/",
        get: function(name, callback) {
            $http.get(this.server + name).success(callback);
        },
        put: function(name, data, callback) {
            $http.put(this.server + name, JSON.stringify(data)).then(callback);
        },
        patch: function(name, data, callback) {
            $http.patch(this.server + name, JSON.stringify(data)).then(callback);
        }
    };
    return factory;
});
