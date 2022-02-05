const fs = require('fs')
const resolve = require('path').resolve
const glob = require('glob')
const validationOptions = require('schema-utils')
const merge = require('lodash.merge')

const schema = {
  type: 'object',
  properties: {
    basePath: {
      description: 'Path to a project root',
      type: 'string'
    },
    src: {
      description: 'According to this path library file will be created',
      type: 'string'
    },
    componentFolder: {
      description: "Folder where components exists, it's relative to a src folder",
      type: 'string'
    },
    componentGlob: {
      description: "Glob pattern to component files, it's relative to a component folder",
      type: 'string'
    },
    fileName: {
      description: 'Library file name',
      type: 'string'
    },
    componentPrefix: {
      description: 'Prefix will be added to component names',
      type: 'string'
    }
  },
  additionalProperties: false
}

module.exports = class ComponentLibraryGeneration {
  constructor(options = {}) {
    validationOptions(schema, options, 'ComponentLibraryGeneration')

    this.opts = merge(
      {
        src: './src/',
        componentFolder: './components/',
        componentGlob: './**/index.vue',
        fileName: 'index.js',
        componentPrefix: '',
        basePath: __dirname
      },
      options
    )
  }

  apply(compiler) {
    compiler.hooks.watchRun.tapAsync('ComponentLibraryGeneration', (params, callback) => {
      this.generateMain()
      callback()
    })
  }

  generateMain() {
    const components = this.getComponentArr()
    const list = components.reduce((result, value) => {
      const componentName = value.match(/components\/(.*)\/index.vue/)[1]

      return [
        ...result,
        `export { default as ${this.opts.componentPrefix}${componentName} } from '${this.opts.componentFolder}${componentName}'`
      ]
    }, [])
    list.unshift("import './assets/ui-kit.css'")
    list.unshift("import './../lib/Validator.js'")
    list.unshift("import './../lib/saveStateToStorage.js'")
    list.unshift("import './../lib/Tooltip.js'")
    list.unshift("export { default as TooltipModal } from '../lib/Tooltip.js'")
    const file = list.join('\r\n')
    this.writeFile(file)
  }

  getComponentArr() {
    return glob.sync(resolve(this.opts.basePath, this.opts.src, this.opts.componentFolder, this.opts.componentGlob))
  }

  writeFile(file) {
    fs.writeFileSync(resolve(this.opts.basePath, this.opts.src, this.opts.fileName), file, (error) => {
      if (error) throw new Error(`[generateMain] can't write into file: ${error}`)
    })
  }
}
