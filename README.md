# Install

## WARNING: this is experimental.

## Install:
1. run: `deno install --allow-run --unstable -n lab https://raw.githubusercontent.com/dynocode/lab/master/mod.ts`

For help: `lab --help`


  This is some of the most relevant commands:

    Lab is dependent on yeoman, and the generator-labs you can install them manually or you can run:
        lab install    This will install all Lab dependencies.

    Start a new project:
        lab init [--name]    It will be created in the current dir

    Init modules: Using lab init inits a full new project,
    but you can also init modules, this can be done to an existing project
    or as a way to only start a project with some of the modules.

    Init modules:
        lab init model       Add a model folder, and install needed deps
        lab init schema      Add a schema folder, and install needed deps
        lab init resolver    Add a resolver folder, and install needed deps
        lab init editorConf  Add an editor config file
        lab init lint        Set up a basic linter, and install needed deps

    Create new:
        new model [--name]        Create a new empty model file, index.js is auto updated to export
        new schema [--name]       Create a new empty schema file, index.js is auto updated to export
        new resolver [--name]     Create a new empty resolver file, index.js is auto updated to export


    Other:
        lab model fk      Get list of all models a model links to, it looks for a folder in the current dir named model

    Submit Issues:           https://github.com/dynocode/lab/issues
    Submit Feature request:  https://github.com/dynocode/lab/issues