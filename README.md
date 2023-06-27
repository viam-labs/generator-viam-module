# generator-viam-module

Generate [Viam](https://docs.viam.com) [module]((https://docs.viam.com/extend/modular-resources/)) scaffolding using [Yeoman](https://yeoman.io/).

![Example screen recording of usage](./generator-viam-module.gif)

## Current limitations

- This generator currently does not generate stub methods for existing APIs, you will need to create them yourself based on the [proto](https://github.com/viamrobotics/api/tree/main/proto/viam).
- Only Python module generation is currently supported.
- Module generation for existing APIs works well, module generation for resources defining new APIs is not complete.
- The generator currently only supports generation of modules that expose a single modular resource. These modules can be manually extended.

## Usage

First, install node (>=16) and npm if you have not already.
It is usually best to use nvm:

``` bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash
nvm install 16
nvm use 16
```

Now install Yeoman:

``` bash
npm install -g yo
```

Then, install the Viam module generator:

``` bash
npm install -g generator-viam-module
```

Now, go to the directory where you want to start creating your Viam module and run:

``` bash
yo viam-module
```

You will be interactively prompted and your module scaffolding will be created.
To read more about Viam modules and modular resources, [read the docs](https://docs.viam.com/extend/modular-resources/).