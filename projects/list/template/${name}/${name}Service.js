define([
    'angular'
], function (angular) {
    return function (app, elem, attrs, scope) {
        app.factory('<%= name %>Service', ['$rootScope', '$http', 'G', function ($rootScope, $http, G) {
            return {
                getFetchUrl: function () {
                    return '<%= listurl %>';
                },
                <%_ if(detailPage){ _%>
                getDetail: function (opts) {
                    return $http({
                        url: '<%= detailPageDetail %>',
                        method: 'post',
                        data: opts,
                        isDebug:<%= isDebug %>,
                        test: '/<%= packageName %>/<%= moduleName %>/<%= name %>/<%= name %>.json'
                    });
                } 
                <%_ } _%>  
            };
        }]);
    }
});