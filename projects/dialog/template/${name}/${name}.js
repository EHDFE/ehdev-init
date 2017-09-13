define([
    'angular',
    <%_if(table){ _%>
    'scmsModules/table/table',
    <%_ } _%>
    <%_ if(city){ _%>
    'scmsModules/citysSelect/citysSelectDirective',
    <%_ } _%>
    <%_ if(datePicker){ _%>
    'scmsModules/datePicker/datePickerDirective',
    <%_ } _%>
    '<%= moduleName %>/<%= name %>/<%= name %>Service',
    'text!<%= moduleName %>/<%= name %>/<%= name %>.html',
    'css!<%= moduleName %>/<%= name %>/<%= name %>.css'
], function (
    angular,
    <%_ if(table){ _%>
    table,
    <%_ } _%>
    <%_ if(city){ _%>
    citysSelectDirect,
    <%_ } _%>
    <%_ if(datePicker){ _%>
    datePickerDirective,
    <%_ } _%>
    service,    
    html) {
        return function (app, elem, attrs, scope) {
            <%_ if(table){ _%>
            table(app, elem, attrs, scope);
            <%_ } _%>               
             <%_ if(city){ _%>
            citysSelectDirect(app, elem, attrs, scope);
            <%_ } _%>                    
            <%_ if(datePicker){ _%>
            datePickerDirective(app, elem, attrs, scope);
            <%_ } _%>  
            service(app, elem, attrs, scope);
            app.directive('<%= name %>', ['$cookies','<%= name %>Service','G',function ($cookies,service,G) {
                return {
                    template: html,
                    restrict: 'EA',
                    replace: true,
                    scope: {
                       foo: '='
                    },
                    link: function postLink($scope, $element, $attrs) {
                    },

                    controller: function ($scope, $element, $attrs, $transclude, $log, $http, G) {
                        $scope.submit = function($event){

                        }
                    }
                };
            }]);
        }
    });
