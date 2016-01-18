app.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
    /*配置安卓navbar和IOS一致*/
    $ionicConfigProvider.platform.ios.tabs.style('standard');
    $ionicConfigProvider.platform.ios.tabs.position('bottom');
    $ionicConfigProvider.platform.ios.navBar.alignTitle('center');
    $ionicConfigProvider.platform.android.navBar.alignTitle('center');
    $ionicConfigProvider.platform.android.tabs.style('standard');
    $ionicConfigProvider.platform.android.tabs.position('standard');

    $stateProvider
        .state('tabs', {
            url: '/tabs',
            templateUrl: 'templates/tabs.html'
        })
        .state('search', {
            url: '/search',
            templateUrl: 'templates/search.html',
            controller: "searchCtrl as search"
        })
        .state('tabs.homepage', {
            url: '/homepage',
            views: {
                'homepage-tab': {
                    templateUrl: 'templates/homepage.html',
                    controller: 'homeCtrl as home'
                }
            }
        })
        .state('tabs.newproduct', {
            url: '/newproduct',
            views: {
                'newproduct-tab': {
                    templateUrl: 'templates/newproduct.html',
                    controller: 'newProductCtrl as newProduct'
                }
            }
        })
        .state('tabs.allproduct', {
            url: '/all-product',
            views: {
                'allproduct-tab': {
                    templateUrl: 'templates/allproduct.html',
                    controller: 'allProductCtrl as allProduct'
                }
            }
        })
        .state('tabs.contact', {
            url: '/contact',
            views: {
                'contact-tab': {
                    templateUrl: 'templates/contact.html',
                    controller: 'chatCtrl as chat'
                }
            }
        })
        .state('productDetail', {
            url: '/product-detail/:id',
            templateUrl: 'templates/product-detail.html',
            controller: 'productDetailCtrl as productDetail'

        });
    $urlRouterProvider.otherwise('/tabs/contact');
})
