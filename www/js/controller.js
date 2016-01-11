app.controller('allProductCtrl', function($scope, HLService) {
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
        allProduct.action = {
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
                $scope.$broadcast('scroll.infiniteScrollComplete');
            },
            canBeLoaded: function() {
                return allProduct.data.canLoadMore;
            }
        }
        allProduct.data = {
            showAllCategoriesFlag: false,
            activeID: -2,
            activeIndex: 0,
            categories: [],
            products: [],
            canLoadMore: true
        };

        function init() {
            request.getCategories();
        }
        init();
    })
    .controller('productDetailCtrl', function($stateParams, $scope, HLService) {
        var productDetail = this;
        productDetail.data = {
            id: $stateParams.id,
            detail: {}
        };
        var request = function getProduct(id) {
            HLService.get("products/detailProJson?id=" + productDetail.data.id, function(data) {
                productDetail.data.detail = data.products;
                console.log(productDetail.data.detail);

            })
        }
        request();
    })
    .controller('homeCtrl', function($scope, HLService) {
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
                home.data.products.forEach(function(element) {
                    console.log(element.id);
                })
            }
        };
        var request = function() {
            var productId, length = home.data.products.length;
            if (length == 0) {
                productId = -1;
            } else {
                productId = home.data.products[length - 1].id;
            }
            var param = "id=" + productId + "&max=8" + "&dateasc=0";
            console.log(param);
            HLService.get("products/homeProJson?" + param, callback.getProductCallback);
        };
        home.data = {
            products: [],
            canLoadMore: true
        };
        home.action = {
            loadMore: function() {
                request();
                $scope.$broadcast('scroll.infiniteScrollComplete');
            },
            canBeLoaded: function() {
                return home.data.canLoadMore;
            }
        };
        request();
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
