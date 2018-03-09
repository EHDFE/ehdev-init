import angular from 'angular';

export default (app, elem, attrs, scope) => {
    app.factory('<%= name %>Service', ['$rootScope', '$http', 'G', function ($rootScope, $http, G) {
        return {
            <%_ if(table){ _%>
            getFetchUrl: function () {
                return '<%= listurl %>';
            },
            <%_ } _%>
            <%_ if(detailPage){ _%>
            getDetail: function (opts) {
                return $http({
                    url: '<%= detailPageDetail %>',
                    method: 'post',
                    data: opts,
                    isDebug:<%= isDebug %>,
                    test: '/<%= packageName %>/<%= moduleName %>/<%= name %>/<%= name %>.json'
                });
            }, 
            <%_ } _%>  
            <%_ if(deleteItem){ _%>
            deleteItem: function (opts) {
                return $http({
                    url: '<%= deleteItemUrl %>',
                    method: 'post',
                    data: opts,
                    isDebug:<%= isDebug %>,
                    test: '/<%= packageName %>/<%= moduleName %>/<%= name %>/<%= name %>.json'
                });
            }, 
            <%_ } _%>  
            foo: function (opts) {
                return $http({
                    url: '/goodstaxiAdmin/',
                    method: 'post',
                    data: opts,
                    isDebug:<%= isDebug %>,
                    test: '/<%= packageName %>/<%= moduleName %>/<%= name %>/<%= name %>.json'
                });
            }
        };
    }]);
}
