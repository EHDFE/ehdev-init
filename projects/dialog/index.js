const path = require('path');
const packageName = path.resolve(process.cwd(),'../../').split(path.sep).pop();

module.exports = {
    questions:[
        {
            name: 'packageName',
            type: 'input',
            message:'Package Name(包名):',
            default:packageName,
        },
        {
            name: 'name',
            type: 'input',
            message:'Module Name(模块名):',
            default:'listGenerator',
        },
        {
            name: 'dialogName',
            type: 'input',
            message:'Dialog title(弹框标题):',
            default:'对话框',
        },
        {
            name: 'pluginList',
            type: 'checkbox',
            message:'Plugins(插件/功能):',
            choices:['citySelectDirective','datePickerDirective','tableDirective'],
            default:[],
        },
        {
            name: 'hasForm',
            type: 'confirm',
            message:'Do you want a form(是否需要外嵌Form标签)?',
            default:true,
        },
        {
            name: 'twoButton',
            type: 'confirm',
            message:'Two button(是否需要两个底部按钮)?',
            default:true,
        }
    ],
    action:function(data){
        var pwd = path.basename(process.cwd());
        return Object.assign({},data,{
            moduleName:pwd,
            table:(data.pluginList.indexOf('tableDirective')>-1),
            city:(data.pluginList.indexOf('citySelectDirective')>-1),
            datePicker:(data.pluginList.indexOf('datePickerDirective')>-1),
            packageName,
            btnClass:data.twoButton?'modal-button-two':''
        });
    }
};