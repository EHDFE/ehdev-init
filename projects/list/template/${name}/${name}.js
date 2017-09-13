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
    <%_ if(tooltip){ _%>
    'scmsModules/tooltip/tooltip',
    <%_ } _%>
    <%_ if(detailPage){ _%>
    '<%= moduleName %>/<%= name %>/<%= name %>Detail',
    <%_ } _%>
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
    <%_ if(tooltip){ _%>
    tooltip,
    <%_ } _%>
    <%_ if(detailPage){ _%>
    <%= name %>Detail,
    <%_ } _%>
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
    <%_ if(tooltip){ _%>
            tooltip(app, elem, attrs, scope);
    <%_ } _%>     
    <%_ if(detailPage){ _%>               
            <%= name -%>Detail(app, elem, attrs, scope);
    <%_ } _%>
            elem.append(html);
        }
    });