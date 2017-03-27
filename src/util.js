const path = require('path');
const fs = require('fs');
const chalk = require('chalk');

const wrapPromise = exports.wrapPromise = (method, ctx = null) => {
  return (...args) => new Promise((resolve, reject) => {
    method.apply(ctx, [...args, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    }])
  });
} 

exports.extractTemplate = async (src, dest) => {
  try {
    const dir = path.resolve(__dirname, src);
    const dirTree = await getDirTree(dir);
    copyDir(dirTree, process.cwd());
  } catch (e) {
    console.log(chalk.red(e));
  }
};

exports.extractConfig = (filepath, dest) => {
  copyFile(filepath, dest);
};

const readdir = wrapPromise(fs.readdir);
const stat = wrapPromise(fs.stat);
const mkdir = wrapPromise(fs.mkdir);

function copyFile(file, target) {
  const readStream = fs.createReadStream(file);
  const writeSteam = fs.createWriteStream(target);
  readStream.pipe(writeSteam);
}

// 递归拿到目录树
async function getDirTree(src) {
  let fileList = [];
  let directoryList = [];

  try {
    const files = await readdir(src);
    for (let file of files) {
      const fileObj = {
        path: path.join(src, file),
      };
      const stats = await stat(fileObj.path);
      if (stats.isFile()) {
        fileList.push(Object.assign({
          fileName: file,
          isDir: false,
        }, fileObj));
      } else if (stats.isDirectory()) {
        const subFiles = await getDirTree(fileObj.path);
        directoryList.push(Object.assign({
          isDir: true,
          dirName: file,
          children: subFiles,
        }, fileObj));
      }
    }
  } catch (e) {
    console.log(chalk.red(e));
  }

  return Promise.resolve(fileList.concat(directoryList));
}

// 复制整个目录树
function copyDir(dirTree, dest) {
  dirTree.forEach(o => {
    if (!o.isDir) {
      copyFile(o.path, path.resolve(dest, o.fileName));
    } else {
      const targetDir = path.resolve(dest, o.dirName);
      if (!fs.existsSync(targetDir)) {
        mkdir(targetDir).then(() => {
          copyDir(o.children, targetDir);
        });
      } else {
        copyDir(o.children, targetDir);
      }
    }
  });
}
