const fs = require('fs');
const path = require('path');

const chalk = require('chalk');
const inquirer = require('inquirer');

const tplConfig = require('./template.js');
const util = require('./util');


exports.init = (type) => {

  console.log(`
    Welcome to ehdev project generator!
    I will use this template to generate your project: ${chalk.green(type)}
  `);
  util.extractTemplate(tplConfig[type], process.cwd());

};

exports.initConfig = (type) => {

  console.log(`
    Welcome to ehdev project generator!
    I will generate the ${chalk.green('abc.json')} for your project: ${chalk.green(type)}
  `);
  const source = path.resolve(__dirname, tplConfig[type], 'abc.json');
  const target = path.resolve(process.cwd(), 'abc.json');

  if (fs.existsSync(source)) {
    // 判断是否已经存在
    inquirer.prompt([
      {
        type: 'list',
        name: 'override',
        message: `The project already has the config file ${chalk.green('abc.json')}. Would you like to override the file ?`,
        default: 'Yes',
        choices: ['Yes', 'No'],
      }
    ]).then((res) => {
      if (res.override === 'Yes') {
        util.extractConfig(source, target);
      }
    });
  } else {
    util.extractConfig(source, target);
  }

};
