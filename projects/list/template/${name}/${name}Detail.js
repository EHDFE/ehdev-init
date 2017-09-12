define([
    'angular',
    '<%= moduleName %>/<%= name %>/<%= name %>Service',
    'text!<%= moduleName %>/<%= name %>/<%= name %>Detail.html',
    'css!<%= moduleName %>/<%= name %>/<%= name %>Detail.css'
], function (
    angular,
    service,
    html) {
        return function (app, elem, attrs, scope) {
            service(app, elem, attrs, scope);
            app.directive('<%= name %>Detail', ['$cookies','<%= name %>Service','G',function ($cookies,service,G) {
                return {
                    template: html,
                    restrict: 'EA',
                    replace: true,
                    scope: {
                        detailId: '='
                    },
                    link: function postLink($scope, $element, $attrs) {
                    },

                    controller: function ($scope, $element, $attrs, $transclude, $log, $http, G) {
                        function getDetail(){
                            service.getDetail({
                                detailId:$scope.detailId
                            }).then(function(data){
                                if(data.data&&data.data.result==='success'){
                                    $scope.detail = data.data.data;
                                }else{
                                    G.alert((data.data&&data.data.msg||'获取详情信息失败!'),{type:'error'});
                                }
                            },function(){
                                    G.alert('获取详情信息失败!',{type:'error'});
                            })
                        }
                        $element.on('show.bs.modal',function(){
                            getDetail();
                        })

                    }
                };
            }]);
        }
    });
