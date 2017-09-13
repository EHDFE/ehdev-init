const path = require('path');
const packageName = path.resolve(process.cwd(), '../../').split(path.sep).pop();

module.exports = {
  questions: [{
      name: 'packageName',
      type: 'input',
      message: 'Package Name:',
      default: packageName,
    },
    {
      name: 'name',
      type: 'input',
      message: 'Module Name:',
      default: 'listGenerator',
    },
    {
      name: 'pluginList',
      type: 'checkbox',
      message: 'Plugins :',
      choices: ['tableDirective', 'selectInput','searchInput','deleteFunc','citySelectDirective', 'datePickerDirective','tooltip','panel'],
      default: ['tableDirective'],
    },
    {
      name: 'listurl',
      type: 'input',
      message: 'List url:',
      default: '/goodstaxiAdmin/getUrl',
      when: function (answers) {
        return (answers.pluginList.indexOf('tableDirective') > -1)
      }
    },
    {
      name: 'deleteItemUrl',
      type: 'input',
      message: 'Delete url:',
      default: '/goodstaxiAdmin/deleteUrl',
      when: function (answers) {
        return (answers.pluginList.indexOf('deleteFunc') > -1)
      }
    },
    {
      name: 'detailPage',
      type: 'confirm',
      message: 'Do you need detail page?',
      default:false
    },
    {
      name: 'primaryKey',
      type: 'input',
      message: 'Primary key:',
      default: 'partyid',
      when: function (answers) {
        return answers.detailPage;
      }
    },
    {
      name: 'detailPageDetail',
      type: 'input',
      message: 'Detail page url:',
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
      deleteItem: (data.pluginList.indexOf('deleteFunc') > -1),
      selectInput: (data.pluginList.indexOf('selectInput') > -1),
      searchInput: (data.pluginList.indexOf('searchInput') > -1),
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