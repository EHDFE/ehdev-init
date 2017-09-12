const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const inquirer = require('inquirer');

const pkg = require('../package.json');
const project = require('./project');
const projectConfig = require('../projects/index.js');

const projectRoot = process.cwd();
const configPath = path.join(projectRoot, 'abc.json');

// create a new abc.json
const createConfigJson = (exist) => {
  let method;
  if (exist) {
    method = 'writeFile';
  } else {
    method = 'appendFile';
  }
  return new Promise((resolve, reject) => {
    fs[method](configPath, require('./template'), (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  })
};

async function setup() {
  if (fs.existsSync(configPath)) {
    inquirer.prompt([
      {
        type: 'list',
        name: 'override',
        message: 'The project already has the config file (abc.json). Would you like to override the file ?',
        default: 'Yes',
        choices: ['Yes', 'No'],
      }
    ]).then((res) => {
      if (res.override === 'Yes') {
        createConfigJson(true);
      }
    });
  } else {
    createConfigJson(false);
  }
}

module.exports = {

  command: 'init',

  description: pkg.description,

  options: [
    [ '    --type <type>', '项目类型' ],
    [ '    --skipinstall', '跳过安装依赖' ],
    // [ '-c, --config', 'generate config only' ]
  ],

  action(command) {
    const options = {
      skipinstall: command.skipinstall,
    };
    if (command.type) {
      project.init(Object.assign(options, {
        type: command.type,
      }));
    } else {
      inquirer.prompt([        {
        type: 'list',
        name: 'inittype',
        message: 'Please select your initial type?',
        default: 'module',
        choices: ['module','project'],
      }]).then((initType)=>{
        const typelist = Object.keys(projectConfig[initType.inittype]);
        inquirer.prompt([
          {
            type: 'list',
            name: 'type',
            message: `Please select your ${initType.inittype} type?`,
            default: typelist[0],
            choices: typelist,
          }
        ]).then((res) => {
          project.init(Object.assign(options, {
            type: res.type,
            inittype:initType.inittype
          }));
        });
      })
    }
  },
};