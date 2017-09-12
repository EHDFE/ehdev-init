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

  const { inittype,type, skipinstall } = options;
  
  if (!projectConfig[inittype][type]) {
    console.log(`
      Project: ${chalk.red(type)} is not defined.
    `);
    process.exit(1);
  }

  console.log(`
    Welcome to ehdev project generator!
    I will use ${inittype} ${chalk.green(type)} to generate your project.
  `);

  const projectQuestions = require(`../projects/${type}/`).questions;
  const projectAction = require(`../projects/${type}/`).action;
  const templateFilter = require(`../projects/${type}/`).filter;

  try {
    const questions = inittype === 'project'?commonQuestions.concat(projectQuestions):projectQuestions;
    const [ answers, templates ] = await Promise.all([
      inquirer.prompt(questions),
      getTemplates(inittype,type),
    ]);
    const templateRoot = path.resolve(__dirname, projectConfig[inittype][type]);

    const tpls = templateFilter&&templateFilter(templates,answers)||templates;

    tpls.forEach(template => {
      const targetTemplate = template.replace(/\$\{(\w+)\}/g,function(match,p1,index,oirgin){  
        return answers[p1];
      }) 
      renderTo(path.join(templateRoot, template), answers, path.resolve(process.cwd(), targetTemplate),projectAction);
    });
    if (type ==='project'&&!skipinstall) {
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

