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
