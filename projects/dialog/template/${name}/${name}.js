define([
    '<%= moduleName %>/<%= name %>/<%= name %>Ctrl',
    '<%= moduleName %>/<%= name %>/<%= name %>Service',
    <%_if(table){ _%>
    'scmsModules/table/table',
    <%_ } _%>
    <%_ if(city){ _%>
    'scmsModules/citysSelect/citysSelectDirective',
    <%_ } _%>
    <%_ if(datePicker){ _%>
    'scmsModules/datePicker/datePickerDirective',
    <%_ } _%>
    '<%= moduleName %>/<%= name %>/<%= name %>Detail',
    'text!<%= moduleName %>/<%= name %>/<%= name %>.html',
    'css!<%= moduleName %>/<%= name %>/<%= name %>.css'
], function (
    ctrl,
    service,
    <%_ if(table){ _%>
    table,
    <%_ } _%>
    <%_ if(city){ _%>
    citysSelectDirect,
    <%_ } _%>
    <%_ if(datePicker){ _%>
    datePickerDirective,
    <%_ } _%>
    <%= name %>Detail,
    html) {
        return function (app, elem, attrs, scope) {
            ctrl(app, elem, attrs, scope);
            service(app, elem, attrs, scope);
    <%_ if(table){ _%>
            table(app, elem, attrs, scope);
    <%_ } _%>               
    <%_ if(city){ _%>
            citysSelectDirect(app, elem, attrs, scope);
    <%_ } _%>                    
    <%_ if(datePicker){ _%>
            datePickerDirective(app, elem, attrs, scope);
    <%_ } _%>                    
            <%= name -%>Detail(app, elem, attrs, scope);
            elem.append(html);
        }
    });