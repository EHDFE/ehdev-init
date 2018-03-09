import ctrl from './<%= name %>Ctrl';
import service from './<%= name %>Service';
<%_ if(table){ _%>
import table from 'scmsModules/table/table';
<%_ } _%>
<%_ if(city){ _%>
import citysSelectDirect from 'scmsModules/citysSelect/citysSelectDirective';
<%_ } _%>
<%_ if(datePicker){ _%>
import datePickerDirective from 'scmsModules/datePicker/datePickerDirective';
<%_ } _%>
<%_ if(tooltip){ _%>
import tooltip from 'scmsModules/tooltip/tooltip';
<%_ } _%>
<%_ if(detailPage){ _%>
import <%= name %>Detail from './<%= name %>Detail';
<%_ } _%>
import html from './<%= name %>.html';
import './<%= name %>.css';

export default (app, elem, attrs, scope) => {
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
