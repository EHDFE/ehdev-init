define([
    'angular'
], function (
    angular
) {
        return function (app, elem, attrs, scope) {
            app.controller('<%= name %>Ctrl', ['$rootScope', '$scope', '$state', '$stateParams', '$timeout', 'G', '<%= name %>Service', function ($rootScope, $scope, $state, $stateParams, $timeout, G, service) {
                <%_ if(table){ _%>
                $scope.apiUrl = service.getFetchUrl();
                $scope.fetchParam = {};=
                $scope.formatData = function(data){
                    data.forEach(function(item){

                    })
                }
                <%_ } _%>
                <%_ if(city){ _%>
                $scope.$watch('entityid',function(newVal){
                    if(newVal){
                        $scope.fetchParam.city = $scope.dItem.name; 
                    }
                })
                <%_ } _%>
                <%_ if(detailPage){ _%>
                $scope.showDetail = function (detail) {  
                    $scope.detailId = detail.<%= primaryKey %>;
                }
                <%_ } _%>
                <%_ if(deleteItem){ _%>
                $scope.deleteItem = function($event,item) {
                    var $alert = G.confirm({
                        $target: $($event.target),
                        msg: '确认删除这条记录么?',
                        position: 'bottom',
                        submit: function () {
                            service.deleteItem({
                                <%= primaryKey %>: item.<%= primaryKey %>
                            }).then(function (data) {
                                data = data.data;
                                if (data.result === 'success') {
                                    G.alert('删除成功');
                                    $alert.hide();
                                    $scope.fetch({currPage:1})
                                }
                            })
                        }
                    })
                };
                <%_ } _%>
                <%_ if(datePicker){ _%>
                $scope.$watch('datestart',function(newVal){
                    if(newVal){
                        $scope.fetchParam.datestart = newVal+' 00:00:00';
                    }else{
                        $scope.fetchParam.datestart = '';
                    }
                });
                $scope.$watch('dateend',function(newVal){
                    if(newVal){
                        $scope.fetchParam.dateend = newVal+' 23:59:59';
                    }else{
                        $scope.fetchParam.dateend = '';
                    }
                });
                $scope.$watch('fetchParam.startdate',function(newVal){
                    if(newVal){
                        if(newVal.slice(0,10)!==$scope.datestart){
                           $scope.datestart = newVal.slice(0,10);
                        }
                    }
                });
                $scope.$watch('fetchParam.enddate',function(newVal){
                    if(newVal){
                        if(newVal.slice(0,10)!==$scope.dateend){
                           $scope.dateend = newVal.slice(0,10);
                        }
                    }
                });
                <%_ } _%>
                <%_ if(table){ _%>
                $scope.search = function () {
                    $scope.fetch({ currPage: 1 });
                }
                <%_ } _%>
            }]);
        }
    });
