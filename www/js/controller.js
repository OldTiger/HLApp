app.controller('allProductCtrl', function($scope, HLService, $ionicScrollDelegate) {
        var allProduct = this;
        var callback = {
            getCategoriesCallback: function(data) {
                allProduct.data.categories = data.categories;
                allProduct.data.activeID = data.categories[0].id;
                request.getFirstPage();
            },
            getProductCallback: function(data) {
                var productId, length = allProduct.data.products.length;
                if (length == 0) {
                    productId = -1;
                } else {
                    productId = allProduct.data.products[length - 1].id;
                }
                if (data.products.length == 0 || productId == data.products[0].id) {
                    allProduct.data.canLoadMore = false;
                }
                allProduct.data.products = allProduct.data.products.concat(data.products);
                $scope.$broadcast('scroll.infiniteScrollComplete');
            },
            resetProductsCallBack: function(data) {
                var length = data.products.length;
                var spliceLen = allProduct.data.products.length;
                //±ÜÃâÏÈ´¥·¢infinite scroll
                allProduct.data.products = allProduct.data.products.concat(data.products);
                allProduct.data.products.splice(0, spliceLen);
                $scope.$broadcast('scroll.refreshComplete');
                allProduct.data.canLoadMore = true;
            }
        };
        var request = {
            getFirstPage: function() {
                request.getProductsByCategoryId(allProduct.data.activeID, -1, 8, 0, callback.getProductCallback);
            },
            getCategories: function() {
                HLService.get('categories/categoriesJson', callback.getCategoriesCallback);
            },
            getProductsByCategoryId: function(categoryId, productId, max, dateAsc, callbackFn) {
                var name = 'products/allProJson?categoryId=' + categoryId + '&id=' + productId + '&max=' + max + '&dateasc=' + (dateAsc || '0');
                HLService.get(name, callbackFn);
            }
        };


        var resetProducts = function() {
            var productId = -1;
            var param = "id=" + productId + "&max=8" + "&dateasc=0";
            allProduct.data.canLoadMore = false;
            request.getProductsByCategoryId(allProduct.data.activeID, -1, 8, 0, callback.resetProductsCallBack);
        };
        allProduct.action = {
            doRefresh: function() {
                resetProducts();
            },
            active: function(id) {
                allProduct.data.activeID = id;
                allProduct.data.products = [];
                allProduct.data.canBeLoaded = true;
                request.getFirstPage();
            },
            activeInAllCategories: function(index) {
                allProduct.data.activeIndex = index;
                allProduct.data.showAllCategoriesFlag = false;
                allProduct.data.activeID = allProduct.data.categories[index].id;
                allProduct.data.products = [];
                allProduct.data.canBeLoaded = true;
                request.getFirstPage();
            },
            loadMore: function() {
                var productId, length = allProduct.data.products.length;
                if (length == 0) {
                    productId = -1;
                } else {
                    productId = allProduct.data.products[length - 1].id;
                }
                request.getProductsByCategoryId(allProduct.data.activeID, productId, 8, 0, callback.getProductCallback);
            },
            canBeLoaded: function() {
                return allProduct.data.canLoadMore;
            },
            scrollTop: function() {
                $ionicScrollDelegate.scrollTop(true);
            },
            getTop: function() {
                allProduct.data.top = $ionicScrollDelegate.getScrollPosition().top;
                $scope.$apply();
            }
        }
        allProduct.data = {
            showAllCategoriesFlag: false,
            activeID: -2,
            activeIndex: 0,
            categories: [],
            products: [],
            canLoadMore: true,
            top: 0
        };

        function init() {
            request.getCategories();
        }
        init();
    })
    .controller('productDetailCtrl', function($stateParams, $scope, HLService, $ionicHistory, $ionicSlideBoxDelegate) {
        var productDetail = this;
        productDetail.data = {
            id: $stateParams.id,
            detail: {}
        };
        productDetail.action = {
            goBack: function() {
                $ionicHistory.goBack();
            },
            updateSlide: function() {
                $ionicSlideBoxDelegate.update();
            }
        }
        var request = function getProduct(id) {
            HLService.get("products/detailProJson?id=" + productDetail.data.id, function(data) {
                productDetail.data.detail = data.products;
            })
        }
        request();
    })
    .controller('homeCtrl', function($ionicLoading, $scope, HLService, $ionicScrollDelegate, $ionicSlideBoxDelegate) {
        var home = this;
        var callback = {
            getProductCallback: function(data) {
                var productId, length = home.data.products.length;
                if (length == 0) {
                    productId = -1;
                } else {
                    productId = home.data.products[length - 1].id;
                }
                if (data.products.length == 0 || productId == data.products[0].id) {
                    home.data.canLoadMore = false;
                }
                home.data.products = home.data.products.concat(data.products);
                $scope.$broadcast('scroll.infiniteScrollComplete');
            },
            getSlideCallback: function(data) {
                home.data.slides = data.wheelImages;
                data.wheelImages.forEach(function(element) {
                    element.isProId = !isNaN(Number(element.url));
                });
            },
            resetProductsCallBack: function(data) {
                var length = data.products.length;
                var spliceLen = home.data.products.length;
                //±ÜÃâÏÈ´¥·¢infinite scroll
                home.data.products = home.data.products.concat(data.products);
                home.data.products.splice(0, spliceLen);
                $scope.$broadcast('scroll.refreshComplete');
                home.data.canLoadMore = true;
            }
        };
        var resetProducts = function() {
            var productId = -1;
            var param = "id=" + productId + "&max=8" + "&dateasc=0";
            home.data.canLoadMore = false;
            HLService.get("products/homeProJson?" + param, callback.resetProductsCallBack);
        };
        var request = function() {
            var productId, length = home.data.products.length;
            if (length == 0) {
                productId = -1;
            } else {
                productId = home.data.products[length - 1].id;
            }
            var param = "id=" + productId + "&max=8" + "&dateasc=0";
            HLService.get("products/homeProJson?" + param, callback.getProductCallback);
        };
        var requestSlide = function() {
            HLService.get("/home/wheelImageJson", callback.getSlideCallback);
        }
        home.data = {
            products: [],
            canLoadMore: true,
            top: 0
        };
        home.action = {
            doRefresh: function() {
                resetProducts();
            },
            updateSlide: function() {
                $ionicSlideBoxDelegate.update();
            },
            loadMore: function() {
                request();
            },
            canBeLoaded: function() {
                return home.data.canLoadMore;
            },
            scrollTop: function() {
                $ionicScrollDelegate.scrollTop(true);
            },
            getTop: function() {
                home.data.top = $ionicScrollDelegate.getScrollPosition().top;
                $scope.$apply();
            }
        };
        request();
        requestSlide();
        // .fromTemplate() method
    })
    .controller('searchCtrl', function($scope, HLService, $ionicHistory) {
        var search = this;
        var request = {
            getSearchResult: function(name) {
                HLService.get("products/selectProJson?selectString=" + name, function(data) {
                    search.data.result = data.products;
                });
            }
        };
        search.data = {
            result: [],
            name: ""
        }
        search.action = {
            goBack: function() {
                $ionicHistory.goBack();
            },
            searchName: function() {
                search.data.result = [];
                if (search.data.name != "") {
                    request.getSearchResult(search.data.name);
                }
            }
        }
    })
    .controller('newProductCtrl', function($scope, $ionicScrollDelegate, HLService) {
        var newProduct = this;
        var callback = {
            getProductCallback: function(data) {
                var productId, length = newProduct.data.products.length;
                if (length == 0) {
                    productId = -1;
                } else {
                    productId = newProduct.data.products[length - 1].id;
                }
                if (data.products.length == 0 || productId == data.products[0].id) {
                    newProduct.data.canLoadMore = false;
                }
                newProduct.data.products = newProduct.data.products.concat(data.products);

                data.products.forEach(function(element) {
                    if (newProduct.data.dates[element.createdate] == undefined) {
                        newProduct.data.dates[element.createdate] = [];
                    }
                    newProduct.data.dates[element.createdate].push(element);
                });
                $scope.$broadcast('scroll.infiniteScrollComplete');
            },
            resetProductsCallBack: function(data) {
                callback.getProductCallback(data);
                $scope.$broadcast('scroll.refreshComplete');
                newProduct.data.canLoadMore = true;
            }
        };
        var request = function() {
            var productId, length = newProduct.data.products.length;
            if (length == 0) {
                productId = -1;
            } else {
                productId = newProduct.data.products[length - 1].id;
            }
            var param = "id=" + productId + "&max=8" + "&dateasc=0";
            HLService.get("products/newProJson?" + param, callback.getProductCallback);
        };
        var resetProducts = function() {
            var productId = -1;
            var param = "id=" + productId + "&max=8" + "&dateasc=0";
            newProduct.data.canLoadMore = false;
            newProduct.data.products = [];
            newProduct.data.dates = {};
            HLService.get("products/newProJson?" + param, callback.resetProductsCallBack);
        }
        newProduct.data = {
            products: [],
            dates: {},
            canLoadMore: true,
            top: 0
        };
        newProduct.action = {
            doRefresh: function() {
                resetProducts();
            },
            loadMore: function() {
                request();
            },
            canBeLoaded: function() {
                return newProduct.data.canLoadMore;
            },
            formatDate: function(str) {
                var date = new Date(str);
                var day = date.getDate();
                var month = date.getMonth();
                var year = date.getYear();
            },
            scrollTop: function() {
                $ionicScrollDelegate.scrollTop(true);
            },
            getTop: function() {
                newProduct.data.top = $ionicScrollDelegate.getScrollPosition().top;
                $scope.$apply();
            }
        };
        request();
    })
    .controller('slideHrefCtrl', function($scope, HLService, $ionicHistory, $stateParams, $sce) {
        var slideHref = this;
        slideHref.data = {
            url: $sce.trustAsResourceUrl($stateParams.url)
        }
        slideHref.action = {
            goBack: function() {
                $ionicHistory.goBack();
            }
        }
    })
    .controller('chatCtrl', function($scope, HLService) {
        // var chat = this;
        // var jqLite = angular.element;

        // chat.action = {
        //     getIframe: function() {
        //         var top = document.getElementsByTagName('iframe');
        //         var firstIframe = top.document.getElementsByTagName('iframe')[0].contentWindow.document;
        //         var secondIframe = firstIframe.getElementsByTagName('iframe')[0].contentWindow;
        //         var supportHolder = secondIframe.document.getElementsByClassName('support-holder');
        //         var footer = secondIframe.document.getElementsByClassName('footer');
        //         jqLite(footer).css({
        //             'height': '50px'
        //         });
        //     }

        // }
        // window.onload = function() {
        //     console.log('ready');
        //     var top = document.getElementsByTagName('iframe');
        //     var element = top.document.getElementsByTagName('iframe')[0];
        //     element.onload = chat.action.getIframe();
        // }
    })
    .directive('hlColor', function() {
        return {
            restrict: "A",
            scope: {
                value: "@hlColor"
            },
            link: function(scope, iElement, iAttrs) {
                iElement.css("color", scope.value);
            }
        }
    });
