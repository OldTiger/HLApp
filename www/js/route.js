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
        .state('tabs.homepage', {
            url: '/homepage',
            views: {
                'homepage-tab': {
                    templateUrl: 'templates/homepage.html',
                    controllers: ''
                }
            }
        })
        .state('tabs.newproduct', {
            url: '/newproduct',
            views: {
                'newproduct-tab': {
                    templateUrl: 'templates/newproduct.html',
                    controllers: ''
                }
            }
        })
        .state('/allproduct', {
            url: '/allproduct',
            views: {
                'allproduct-tab': {
                    templateUrl: 'templates/allproduct.html',
                    controllers: ''
                }
            }
        })
        .state('/contact', {
            url: '/contact',
            views: {
                'contact-tab': {
                    templateUrl: 'templates/contact.html',
                    controllers: ''
                }
            }
        });
    $urlRouterProvider.otherwise('/tabs/homepage');
})