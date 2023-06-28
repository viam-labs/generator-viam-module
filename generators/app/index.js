var Generator = require('yeoman-generator');

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
              name: "name",
              message: "Your model name - used for model name in the model triplet",
              default: this.options.name
            },
            {
              type: "input",
              name: "ns",
              message: "Your module namespace for the model triplet namespace:family:name",
              default: this.options.ns
            },
            {
              type: "input",
              name: "family",
              message: "Your module family for the model triplet namespace:family:name",
              default: this.options.family
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
              message: "The API triplet this module uses (for example: rdk:components:motor)",
              default: this.options.api
            },
            {
              type: "confirm",
              name: "existing_api",
              message: "Is this an existing API?",
              default: this.options.existing_api
            }
          ]);

          this.log("Will create module scaffolding for module:", this.answers.name);
          this.log("API:", this.answers.api)
          this.log("Model:" + this.answers.ns + ":" + this.answers.family + ":" + this.answers.name)
    }

    writing() {
      let dest_prefix = this.answers.current_dir ? '.' : './' + this.answers.name
      let api_name = (this.answers.api.split(':'))[2]
      let api_name_lower = api_name
      api_name = api_name.charAt(0).toUpperCase() + api_name.slice(1)
      let service_dir = this.answers.existing_api ? '' : api_name_lower + '/'
      let template_params = { name: this.answers.name, api: this.answers.api, api_name: api_name, namespace: this.answers.ns, api_name_lower: api_name_lower, 
          api_initial: this.answers.api, namespace: this.answers.ns, family: this.answers.family, stub_code: '# methods go here' }
      
      if (this.answers.language == 'python') {
        // in the python SDK, api triplet looks like viam.resourcetype.model instead of sdk:resourcetype:model
        let api = this.answers.api.replace(/:/g, '.')
        api = api.replace('rdk', 'viam')
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

        if (!this.answers.existing_api) {
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
          // read in stub methods from SDK
          let stub_path = process.cwd() + '/viam-python-sdk/src/' + api.replace(/\./g, '/') + `/${api_name_lower}.py`
          let stub_code = this.fs.read(stub_path)
          stub_code = stub_code.replace(/[\s\S]+?@abc.abstractmethod/m, '')
          stub_code = stub_code.replace(/@abc.abstractmethod/g, '')
          template_params.stub_code = stub_code
        }

        this.fs.copyTpl(
          this.templatePath(this.answers.language + '/src/module.py'),
          this.destinationPath(dest_prefix + '/src/'+ service_dir + this.answers.name + '.py'),
          template_params
        );
      }
    }
  };