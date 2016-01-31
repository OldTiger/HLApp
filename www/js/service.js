app.factory('HLService', function($http, $q, $timeout, $ionicPopup) {
        var factory = {
            server: "http://120.55.82.56:8080/SpinningShop/",
            //server: "http://192.168.0.111:8080/SpinningShop/",
            get: function(name, callback) {
                var deferred = $q.defer();
                $timeout(function() {
                    deferred.resolve(); // this aborts the request!
                }, 20000);
                $http.get(this.server + name, {
                    timeout: deferred.promise
                }).then(function(response) {
                    callback(response.data);
                }, function(reject) {
                    // error handler
                    if (reject.status === 0) {
                        // $http timeout
                        var alertPopup = $ionicPopup.alert({
                            template: '亲，网络好像有点不好哟~',
                            cssClass: 'custom-popup', // Add
                        });
                        $timeout(function() {
                            alertPopup.close(); //close the popup after 3 seconds for some reason
                        }, 2000);
                    } else {
                        // response error status from server
                    }
                });
            },
            put: function(name, data, callback) {
                $http.put(this.server + name, JSON.stringify(data)).then(callback);
            },
            patch: function(name, data, callback) {
                $http.patch(this.server + name, JSON.stringify(data)).then(callback);
            }
        };
        return factory;
    })
    .directive('splashScreen', function($timeout) {
        function link(scope, element, attrs) {
            $timeout(function() {
                element.remove();
            }, 2000);
        }
        return {
            restrict: 'A',
            scope: {},
            link: link
                //templateUrl: "../templates/splash.html"
        }
    });
// .directive('goToTop', function($ionicScrollDelegate) {
//     function link(scope, element, attrs) {
//         scope.top = $ionicScrollDelegate.getScrollPosition().top;
//         // $ionicScrollDelegate.getScrollView().onScroll = function() {
//         //     console.log(scope.top);

//         //     scope.top = $ionicScrollDelegate.getScrollPosition().top;
//         //     scope.$apply();
//         // }
//         console.log($ionicScrollDelegate);

//         //scope.$apply(scope.top);
//         element.on('click', function() {
//             $ionicScrollDelegate.scrollTop(true);
//         });
//     }
//     return {
//         restrict: 'E',
//         scope: {},
//         link: link,
//         templateUrl: '../templates/go-to-top.html'
//     };
// });;
