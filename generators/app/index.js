var Generator = require("yeoman-generator");
// const baseRootPath = './generators/app/templates';
const fs = require("fs");
const path = require("path");

module.exports = class extends Generator {
  constructor(args, options) {
    super(args, options);
    // Use our plain template as source
    // this.sourceRoot(baseRootPath);
    // this.sourceRoot();
    // this.config.save();
    // console.log(this.sourceRoot());
    // console.log(this.destinationRoot());
  }
  initializing() {}
  async prompting() {
    const answers = await this.prompt([
      {
        type: "input",
        name: "appName",
        message: "请输入库名称",
        default: this.appname // Default to current folder name
      },
      {
        type: "input",
        name: "author",
        message: "请输入作者名称",
        default: '路人甲' // Default to current folder name
      }
    ]);

    this.log("app name", answers.name);
    this.log("author  name", answers.author);
    this.appName = answers.appName;
    this.author = answers.author;
  }

  configuring() {
    const baseRootPath = this.sourceRoot();
    let defaultSettings = this.fs.readJSON(`${baseRootPath}/package.json`);
    let packageSettings = {
      name: this.appName,
      private: defaultSettings.private,
      version: defaultSettings.version,
      description: `${this.appName} - Generated by generator-vue-library`,
      main: defaultSettings.main,
      scripts: defaultSettings.scripts,
      repository: '',
      keywords: [],
      author: this.author,
      devDependencies: defaultSettings.devDependencies,
      dependencies: defaultSettings.dependencies
    };
    console.log(packageSettings)
    this.fs.writeJSON(this.destinationPath('package.json'), packageSettings);
  }
  default() {}
  writing() {
    const excludeList = [
      "LICENSE",
      "README.md",
      "CHANGELOG.md",
      "node_modules",
      "package.json",
      ".istanbul.yml",
      ".travis.yml"
    ];

    const baseRootPath = this.sourceRoot();
    
    function readdir(me,currentPath){
        // Get all files in our repo and copy the ones we should
        fs.readdir(currentPath, (err, items) => {
            for (let item of items) {
                // Skip the item if it is in our exclude list
                if (excludeList.indexOf(item) !== -1) {
                    continue;
                }
        
                // Copy all items to our root
                let fullPath = path.join(currentPath, item);
                if (fs.lstatSync(fullPath).isDirectory()) {
                    // console.log(fullPath)
                    readdir(me,fullPath);
                } else {
                    if (item === ".npmignore") {
                        me.fs.copy((fullPath), ".gitignore");
                    } else {
                        let relativePath = path.relative(baseRootPath,currentPath);
                        // console.log(relativePath)
                        me.fs.copy((fullPath), me.destinationPath(path.join(relativePath,item)));
                    }
                }
            }
        });
    }

    readdir(this,this.sourceRoot())
  }
  conflicts() {}
  install() {
    this.installDependencies({
      npm: false,
      bower: false,
      yarn: true
    });
  }
  end() {}
};