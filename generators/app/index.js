var Generator = require('yeoman-generator');
const path = require('node:path'); 

module.exports = class extends Generator {
    // The name `constructor` is important here
    constructor(args, opts) {
      // Calling the super constructor is important so our generator is correctly set up
      super(args, opts);
      
      this.nm = this.appname
      this.nm = this.nm.replace(/\s+/g, '_')

      this.option('current_dir', {
        type: Boolean,
        required: true,
        defaults: true,
        desc: 'Use current directory',
      });

      this.option('name', {
        type: String,
        required: true,
        defaults: this.nm,
        desc: 'Model name',
      });

      this.option('ns', {
        type: String,
        required: true,
        desc: 'Model namespace',
      });

      this.option('family', {
        type: String,
        required: true,
        desc: 'Model family',
      });

      this.option('language', {
        type: String,
        required: true,
        defaults: 'python',
        desc: 'Viam SDK language to generate module scaffolding.',
      });

      this.option('api', {
        type: String,
        required: true,
        desc: 'API triplet',
      });

      this.option('existing_api', {
        type: Boolean,
        required: true,
        default: true,
        desc: 'API is a new API',
      });
    }

    async prompting() {
        this.answers = await this.prompt([
          {
            type: "confirm",
            name: "current_dir",
            message: "Create module structure within current directory?  If no, will create a new directory with current directory matching the module name you select",
            default: this.options.current_dir
          },
            {
              type: "input",
              name: "model",
              message: "Your model triplet in the format namespace:family:modelname",
              default: this.options.model
            },
            {
                type: "input",
                name: "language",
                message: "The language your module will be written in, must match Viam SDK language selected (python currently supported)",
                default: this.options.language
            },
            {
              type: "input",
              name: "api",
              message: "The API triplet this module uses (for example: rdk:component:motor). Expectation is that the second element is 'component' or 'service'.",
              default: this.options.api
            },
            {
              type: "confirm",
              name: "existing_api",
              message: "Is this an existing API?",
              default: this.options.existing_api
            }
          ]);

          this.log("Will create module scaffolding for module - ",  (this.answers.model.split(':'))[2]);
          this.log("API - ", this.answers.api)
          this.log("Model - " + this.answers.model)
    }

    writing() {
      let dest_prefix = this.answers.current_dir ? '.' : './' + (this.answers.model.split(':'))[2]
      let api_family = (this.answers.api.split(':'))[1]
      let api_name = (this.answers.api.split(':'))[2]
      let api_name_lower = api_name
      api_name = api_name.charAt(0).toUpperCase() + api_name.slice(1)
      let service_dir = this.answers.existing_api ? '' : api_name_lower + '/'
      let name = (this.answers.model.split(':'))[2]
      let name_sanitized = name.replace(/-([a-z])/g, function (g) { return g[1].toUpperCase(); });
      let template_params = {
        name: name, name_sanitized: name_sanitized, api: this.answers.api, api_family: api_family, api_name: api_name,
        api_name_lower: api_name_lower, api_initial: this.answers.api, api_source: this.answers.api,
        namespace: (this.answers.model.split(':'))[0], family: (this.answers.model.split(':'))[1], 
        stub_code: '# methods go here', additional_imports: "", stub_class_pre: ""
      }
      
      if (this.answers.language == 'python') {
        // in the python SDK, api triplet looks like viam.[components|services].model instead of sdk:[component|service]:model
        let api = this.answers.api.replace(/:/g, '.')
        api = api.replace('rdk', 'viam')
        api = api.replace('component', 'components')
        api = api.replace('service', 'services')
        template_params.api = api

        this.fs.copyTpl(
          this.templatePath(this.answers.language + '/requirements.txt'),
          this.destinationPath(dest_prefix + '/requirements.txt'),
          template_params
        );
        this.fs.copyTpl(
          this.templatePath(this.answers.language + '/run.sh'),
          this.destinationPath(dest_prefix + '/run.sh'),
          template_params
        );

        if (!this.answers.existing_api) {
          template_params.api_source = ".api"

          this.fs.copyTpl(
            this.templatePath(this.answers.language + '/src/main_newapi.py'),
            this.destinationPath(dest_prefix + '/src/main.py'),
            template_params
          );

          this.fs.copyTpl(
            this.templatePath(this.answers.language + '/src/__init__newapi.py'),
            this.destinationPath(dest_prefix + `/src/${service_dir}__init__.py`),
            template_params
          );

          this.fs.copyTpl(
            this.templatePath(this.answers.language + '/buf.gen.yaml'),
            this.destinationPath(dest_prefix + '/buf.gen.yaml'),
            template_params
          );
          this.fs.copyTpl(
            this.templatePath(this.answers.language + '/buf.yaml'),
            this.destinationPath(dest_prefix + '/buf.yaml'),
            template_params
          );
          this.fs.copyTpl(
            this.templatePath(this.answers.language + '/src/proto/module.proto'),
            this.destinationPath(dest_prefix + '/src/proto/'+ api_name_lower + '.proto'),
            template_params
          );
          this.fs.copyTpl(
            this.templatePath(this.answers.language + '/src/api.py'),
            this.destinationPath(dest_prefix + '/src/'+ service_dir + 'api.py'),
            template_params
          );
        } else {
          this.fs.copyTpl(
            this.templatePath(this.answers.language + '/src/main.py'),
            this.destinationPath(dest_prefix + '/src/main.py'),
            template_params
          );

          this.fs.copyTpl(
            this.templatePath(this.answers.language + '/src/__init__.py'),
            this.destinationPath(dest_prefix + `/src/${service_dir}__init__.py`),
            template_params
          );

          // read in stub methods from Viam SDK
          let stub_path = path.join(__dirname, '/../../viam-python-sdk/src/', api.replace(/\./g, '/'),  `/${api_name_lower}.py`)
          let stub_code = this.fs.read(stub_path)

          let additional_imports = stub_code.replace(/class[\s\S]+/m,'')
          additional_imports = additional_imports.replace(/import abc/, '')
          additional_imports = additional_imports.replace(/from viam.resource.types import RESOURCE_NAMESPACE_RDK, RESOURCE_TYPE_COMPONENT, Subtype/, '')
          additional_imports = additional_imports.replace(/from ..component_base[\s\S]+?\n/,'')
          additional_imports = additional_imports.replace(/from . import/,`from ${api} import`)
          template_params.additional_imports = additional_imports

          let stub_class_pre = stub_code.replace(/[\s\S]+?class[\s\S]+?:/m, '')
          stub_class_pre = stub_class_pre.replace(/@abc.abstractmethod[\s\S]+/m,'')
          stub_class_pre = stub_class_pre.replace(/SUBTYPE[\s\S]+?\)/m,'')
          stub_class_pre = stub_class_pre.replace(/This acts as an abstract[\s\S]+?"""/m,'"""')
          // replace multiple linebreaks with one
          stub_class_pre = stub_class_pre.replace(/\n\s*\n/g, '\n');
          template_params.stub_class_pre = stub_class_pre

          stub_code = stub_code.replace(/[\s\S]+?@abc.abstractmethod/m, '')
          stub_code = stub_code.replace(/@abc.abstractmethod/g, '')
          template_params.stub_code = stub_code
        }

        this.fs.copyTpl(
          this.templatePath(this.answers.language + '/src/module.py'),
          this.destinationPath(dest_prefix + '/src/'+ service_dir +  name_sanitized + '.py'),
          template_params
        );
      }
    }
  };