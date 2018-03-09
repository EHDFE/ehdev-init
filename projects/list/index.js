const path = require('path');
const packageName = path.resolve(process.cwd(), '../../../').split(path.sep).pop();

module.exports = {
  questions: [{
      name: 'packageName',
      type: 'input',
      message: 'Package Name(包名):',
      default: packageName,
    },
    {
      name: 'name',
      type: 'input',
      message: 'Module Name(模块名):',
      default: 'listGenerator',
    },
    {
      name: 'pluginList',
      type: 'checkbox',
      message: 'Plugins(插件/功能):',
      choices: ['tableDirective', 'selectInput(选择框)','searchInput(搜索框)','deleteFunc(删除某一项)', 'export(导出)', 'citySelectDirective', 'datePickerDirective','tooltip','panel'],
      default: ['tableDirective'],
    },
    {
      name: 'listurl',
      type: 'input',
      message: 'List url(列表接口):',
      default: '/goodstaxiAdmin/getUrl',
      when: function (answers) {
        return (answers.pluginList.indexOf('tableDirective') > -1)
      }
    },
    {
      name: 'deleteItemUrl',
      type: 'input',
      message: 'Delete url(删除接口):',
      default: '/goodstaxiAdmin/deleteUrl',
      when: function (answers) {
        return (answers.pluginList.indexOf('deleteFunc(删除某一项)') > -1)
      }
    },
    {
      name: 'detailPage',
      type: 'confirm',
      message: 'Do you need detail page(是否需要详情页)?',
      default:false
    },
    {
      name: 'primaryKey',
      type: 'input',
      message: 'Primary key(主键):',
      default: 'partyid',
      when: function (answers) {
        return answers.detailPage||(answers.pluginList.indexOf('deleteFunc(删除某一项)') > -1);
      }
    },
    {
      name: 'detailPageDetail',
      type: 'input',
      message: 'Detail page url(详情接口):',
      default: '/goodstaxiAdmin/getDetailUrl',
      when: function (answers) {
        return answers.detailPage;
      }
    },
    {
      name: 'isDebug',
      type: 'confirm',
      message: 'Is debug?',
      default: true
    },


  ],
  action: function (data) {
    var pwd = path.basename(process.cwd());
    return Object.assign({}, data, {
      moduleName: pwd,
      table: (data.pluginList.indexOf('tableDirective') > -1),
      city: (data.pluginList.indexOf('citySelectDirective') > -1),
      datePicker: (data.pluginList.indexOf('datePickerDirective') > -1),
      panel: (data.pluginList.indexOf('panel') > -1),
      tooltip: (data.pluginList.indexOf('tooltip') > -1),
      deleteItem: (data.pluginList.indexOf('deleteFunc(删除某一项)') > -1),
      selectInput: (data.pluginList.indexOf('selectInput(选择框)') > -1),
      searchInput: (data.pluginList.indexOf('searchInput(搜索框)') > -1),
      exportButton: (data.pluginList.indexOf('export(导出)') > -1),
      detailDirective: data.name.replace(/([A-Z])/g, (match, p1) => {
        return '-' + p1.toLowerCase()
      }) + '-detail',
      packageName
    });
  },
  filter: function (templates, data) {
    return data.detailPage ? templates : templates.filter((template) => {
      return !/Detail/.test(template)
    });
  }
};