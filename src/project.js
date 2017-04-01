const fs = require('fs');
const path = require('path');

const chalk = require('chalk');
const inquirer = require('inquirer');
const co = require('co');
const npminstall = require('npminstall');

const projectConfig = require('../projects/index');
const { getTemplates, renderTo } = require('./util');

// basic questions
const commonQuestions = [
  {
    name: 'name',
    type: 'input',
    message: 'Project Name:',
    default: path.basename(process.cwd()),
  },
  {
    name: 'version',
    type: 'input',
    message: 'Project Version:',
    default: '1.0.0',
  },
  {
    name: 'author',
    type: 'input',
    message: 'Your Name:',
    default: '',
  },
  {
    name: 'description',
    type: 'input',
    message: 'Project Description:',
    default: 'Best project ever.',
  }
];

exports.init = async (options) => {

  const { type, skipinstall } = options;
  
  if (!projectConfig[type]) {
    console.log(`
      Project: ${chalk.red(type)} is not defined.
    `);
    process.exit(1);
  }

  console.log(`
    Welcome to ehdev project generator!
    I will use project ${chalk.green(type)} to generate your project.
  `);

  const projectQuestions = require(`../projects/${type}/`);

  try {
    const [ answers, templates ] = await Promise.all([
      inquirer.prompt(commonQuestions.concat(projectQuestions)),
      getTemplates(type),
    ]);
    const templateRoot = path.resolve(__dirname, projectConfig[type]);
    templates.forEach(template => {
      renderTo(path.join(templateRoot, template), answers, path.resolve(process.cwd(), template));
    });
    if (!skipinstall) {
      co(function* (){
        yield npminstall({
          root: process.cwd(),
        });
      }).catch(err => {
        console.error(err.stack)
      });
    }

  } catch (e) {
    console.log(`execute error: ${e.stack}`);
    process.exit(1);
  }
};

// exports.initConfig = (type) => {

//   console.log(`
//     Welcome to ehdev project generator!
//     I will generate the ${chalk.green('abc.json')} for your project: ${chalk.green(type)}
//   `);
//   const source = path.resolve(__dirname, projectConfig[type], 'abc.json');
//   const target = path.resolve(process.cwd(), 'abc.json');

//   if (fs.existsSync(source)) {
//     // 判断是否已经存在
//     inquirer.prompt([
//       {
//         type: 'list',
//         name: 'override',
//         message: `The project already has the config file ${chalk.green('abc.json')}. Would you like to override the file ?`,
//         default: 'Yes',
//         choices: ['Yes', 'No'],
//       }
//     ]).then((res) => {
//       if (res.override === 'Yes') {
//         util.extractConfig(source, target);
//       }
//     });
//   } else {
//     util.extractConfig(source, target);
//   }

// };
