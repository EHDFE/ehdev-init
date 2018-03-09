import angular from 'angular';
<%_if(table){ _%>
import table from 'scmsModules/table/table';
<%_ } _%>
<%_ if(city){ _%>
import citysSelectDirect from 'scmsModules/citysSelect/citysSelectDirective';
<%_ } _%>
<%_ if(datePicker){ _%>
import datePickerDirective from 'scmsModules/datePicker/datePickerDirective';
<%_ } _%>
import from '<%= moduleName %>/<%= name %>/<%= name %>Service';
import from 'text!<%= moduleName %>/<%= name %>/<%= name %>.html';
import 'css!<%= moduleName %>/<%= name %>/<%= name %>.css';

export default (app, elem, attrs, scope) => {
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

