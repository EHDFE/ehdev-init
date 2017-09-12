const path = require('path');
const packageName = path.resolve(process.cwd(),'../../').split(path.sep).pop();

module.exports = {
    questions:[
        {
            name: 'packageName',
            type: 'input',
            message:'Package Name:',
            default:packageName,
        },
        {
            name: 'name',
            type: 'input',
            message:'Module Name:',
            default:'listGenerator',
        },
        {
            name: 'pluginList',
            type: 'checkbox',
            message:'Plugins :',
            choices:['tableDirective','citySelectDirective','datePickerDirective','searchInputPlaceholder'],
            default:['tableDirective'],
        },
        {
            name: 'listurl',
            type: 'input',
            message:'list url:',
            default:'/goodstaxiAdmin/getUrl',
            when:function(answers){
                return (answers.pluginList.indexOf('tableDirective')>-1)
            }
        },
        {
            name: 'searchInputPlaceholder',
            type: 'input',
            message:'search input placeholder :',
            default:'请填写关键字',
            when:function(answers){
                return (answers.pluginList.indexOf('searchInputPlaceholder')>-1)
            }
        },
        {
            name: 'detailPage',
            type: 'confirm',
            message:'Do you need detail page?',
        },
        {
            name: 'detailPageDetail',
            type: 'input',
            message:'Detail page url:',
            default:'/goodstaxiAdmin/getDetailUrl',
            when:function(answers){
                return answers.detailPage;
            }
        },
        {
            name: 'isDebug',
            type: 'confirm',
            message:'Is debug?',
            default:true,
        },


    ],
    action:function(data){
        var pwd = path.basename(process.cwd());
        return Object.assign({},data,{
            moduleName:pwd,
            table:(data.pluginList.indexOf('tableDirective')>-1),
            city:(data.pluginList.indexOf('citySelectDirective')>-1),
            datePicker:(data.pluginList.indexOf('datePickerDirective')>-1),
            searchInputPlaceholder:(data.pluginList.indexOf('searchInputPlaceholder')>-1)&&data.searchInputPlaceholder,
            detailDirective:data.name.replace(/([A-Z])/g,(match,p1)=>{return '-'+p1.toLowerCase()})+'-detail',
            packageName
        });
    },
    filter:function(templates,data){
        return data.detailPage?templates:templates.filter((template)=>{
            return !/Detail/.test(template)
        });
    }
};