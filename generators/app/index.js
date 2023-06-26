var Generator = require('yeoman-generator');

module.exports = class extends Generator {
    // The name `constructor` is important here
    constructor(args, opts) {
      // Calling the super constructor is important so our generator is correctly set up
      super(args, opts);
      
      this.nm = this.appname
      this.nm = this.nm.replace(/\s+/g, '_')

      this.option('name', {
        type: String,
        required: true,
        defaults: this.nm,
        desc: 'Module name',
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
    }

    async prompting() {
        this.answers = await this.prompt([
            {
              type: "input",
              name: "name",
              message: "Your module name - will also be used for model name in the model triplet",
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
              message: "The API triplet this module uses (for example: rdk:component:motor)",
              default: this.options.api
            },
            {
              type: "confirm",
              name: "new_api",
              message: "Is this an existing API?"
            }
          ]);

          this.log("Will create module scaffolding for module:", this.answers.name);
          this.log("API:", this.answers.api)
          this.log("Model:" + this.answers.ns + ":" + this.answers.family + ":" + this.answers.name)
    }
  };