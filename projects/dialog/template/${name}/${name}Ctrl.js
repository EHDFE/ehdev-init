define([
    'angular'
], function (
    angular
) {
        return function (app, elem, attrs, scope) {
            app.controller('<%= name %>Ctrl', ['$rootScope', '$scope', '$state', '$stateParams', '$timeout', 'G', '<%= name %>Service', function ($rootScope, $scope, $state, $stateParams, $timeout, G, service) {
                $scope.apiUrl = service.getFetchUrl();
                $scope.fetchParam = {};
                <%_ if(city){ _%>
                $scope.$watch('entityid',function(newVal){
                    if(newVal){
                        $scope.fetchParam.city = $scope.dItem.name; 
                    }
                })
                <%_ } _%>
                
                <%_ if(detailPage){ _%>
                $scope.showDetail = function (detail) {  
                    $scope.detailId = detail.detailId;
                }
                <%_ } _%>

                $scope.search = function () {
                    $scope.fetch({ currPage: 1 });
                }
            }]);
        }
    });
