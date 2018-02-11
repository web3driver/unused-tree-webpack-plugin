const glob = require('glob')
const process = require('process')
const path = require('path')
const fs = require('fs')
const cwd = process.cwd();

const util = require('./util')
const treels = require('tree-ls')

class webpackPlugin {

    constructor(opts) {
        let _opts = opts || {};
        this.opts = {
            pathFilter: '',
            extFilter: [],
            exclude: [],
            display: 'tree'
        };
        util.deepCopy(this.opts, _opts);
    }

    apply(compiler) {
        this.compiler = compiler;
        compiler.plugin('done', stats => {
            let webpackFiles = this.selectLocalModules(stats.toJson());
            this.getLocalFileLists((err, files) => {
                let res = files.map(v => path.join(cwd, v))
                    // path filter
                    .filter(v => v.indexOf(path.join(cwd, this.opts.pathFilter)) > -1)
                    // ext filter
                    .filter(v => {
                        return !this.opts.extFilter.length || this.opts.extFilter.indexOf(path.extname(v)) > -1
                    })
                    // exclude folder or files
                    .filter(v => {
                        if (!this.opts.exclude.length) return true
                        let hasExclude = this.opts.exclude.some(_v => v.indexOf(_v) > -1)
                        return !hasExclude
                    })
                    .filter((file) => webpackFiles.indexOf(file) === -1)
                    .map((file) => `${path.relative(cwd, file)}`);
                this.print(this.opts.display, res);
            });
        });
    }

    print(type, res) {
        switch(type) {
            case 'array':
                console.log(res);
                break;
            case 'tree':
            default:
                treels.print(treels.genTreeObjByPathArr(res))
                break;
        }
    }

    getLocalFileLists(callback) {
        glob("!(node_modules)/**/*.*", { cwd: cwd }, callback)
    }

    isWebpackLocal(_path) {
        return (_path.indexOf('./') === 0 && _path.indexOf('./~/') === -1 && _path.indexOf('node_modules') === -1);
    }

    selectLocalModules(webpack) {
        return webpack.modules.filter((module) => this.isWebpackLocal(module.name))
            .map((module) => path.join(cwd, module.name));
    };
}

module.exports = webpackPlugin;