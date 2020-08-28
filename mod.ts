import { parse, logger } from './deps.ts';

import { mainHelp, invalidCommand } from './help.ts';

const { args } = Deno;
const inputArgs = parse(args);
// instal yo, clone code gen, npm link

/**
 * should be able to do:
 * 1. `lab new model|schema|resolver -n`
 * 3. `lab init .|name`
 */

export function getParams(parsedArgs:any) {
  return parsedArgs._;
}

export function getFlags(parsedArgs:any) {
  const {_, ...rest} = parsedArgs;
  return rest;
}

const yoCommands = {
  model: ['yo', 'labs:mongo'],
  modelFk: ['yo', 'labs:show-model-fk'],
  schema: ['yo', 'labs:schema'],
  resolver: ['yo', 'labs:resolver'],
  init: ['yo', 'labs:init'],
  editorConf: ['yo', 'labs:editorConf'],
  lint: ['yo', 'labs:lint'],
  indexUpdate: ['yo', 'labs:index-update'],
};

const deps = {
  yo: ['npm', 'i', '-g', 'yo'],
  generator: ['npm', 'i', '-g', 'git+ssh://github.com/dynocode/generator-labs.git'],
};

async function runYo(baseCommand:string[], props?:string[], flags?:string[]) {
  const command = [...baseCommand];
  if (props) {
    command.push(...props);
  }
  if (flags) {
    command.push(...flags);
  }
  const run = await Deno.run({
    cmd: command,
  });

  // await its completion
  await run.status();
}

async function installDeps(dep:any) {
  const run = await Deno.run({
    cmd: dep,
  });

  // await its completion
  await run.status();
}

const commands:any = {
  install: {
    exec: async () => {
      logger.info('Installing yeoman globally');
      await installDeps(deps.yo);
      logger.info('Installing generator-labs globally');
      await installDeps(deps.generator);
      logger.info('Done: dependencies installed');
    },
    help: (params:any, flags:any) => {
      console.log(mainHelp);
    },
  },
  model: {
    fk: {
      exec: async (params:any, flags:any) => {
        return runYo(yoCommands.modelFk);
      },
      help: (params:any, flags:any) => {
        console.log(mainHelp);
      },
    },
    help: (params:any, flags:any) => {
      console.log(mainHelp);
    },
  },
  new: {
    model: {
      exec: async (params:any, flags:any) => {
        const name = flags.n || flags.name;
        if (!name) {
          console.log(invalidCommand('Name: [--name]|[-n] is required.'));
          return console.log(mainHelp)
        }
        await runYo(yoCommands.model, [flags.n]);
        return runYo([...yoCommands.indexUpdate, '--model']);
      },
      help: (params:any, flags:any) => {
        console.log(mainHelp);
      },
    },
    schema: {
      exec: async (params:any, flags:any) => {
        const name = flags.n || flags.name;
        if (!name) {
          console.log(invalidCommand('Name: [--name]|[-n] is required.'));
          return console.log(mainHelp)
        }
        await runYo(yoCommands.schema, [flags.n]);
        return runYo([...yoCommands.indexUpdate, '--schema']);
      },
      help: (params:any, flags:any) => {
        console.log(mainHelp);
      },
    },
    resolver: {
      exec: async (params:any, flags:any) => {
        const name = flags.n || flags.name;
        if (!name) {
          console.log(invalidCommand('Name: [--name]|[-n] is required.'));
          return console.log(mainHelp)
        }
        await runYo(yoCommands.resolver, [flags.n]);
        return runYo([...yoCommands.indexUpdate, '--resolver']);
      },
      help: (params:any, flags:any) => {
        console.log(mainHelp);
      },
    },
  },
  init: {
    exec: async () => {
      return runYo(yoCommands.init);
    },
    model: {
      exec: async (params:any, flags:any) => {
        return runYo(yoCommands.model, [flags.n]);
      },
      help: (params:any, flags:any) => {
        console.log(mainHelp);
      },
    },
    schema: {
      exec: async (params:any, flags:any) => {
        return runYo(yoCommands.schema, [flags.n]);
      },
      help: (params:any, flags:any) => {
        console.log(mainHelp);
      },
    },
    resolver: {
      exec: async (params:any, flags:any) => {
        return runYo(yoCommands.resolver, [flags.n]);
      },
      help: (params:any, flags:any) => {
        console.log(mainHelp);
      },
    },
    editorConf: {
      exec: async (params:any, flags:any) => {
        return runYo(yoCommands.editorConf, [flags.n]);
      },
      help: (params:any, flags:any) => {
        console.log(mainHelp);
      },
    },
    lint: {
      exec: async (params:any, flags:any) => {
        return runYo(yoCommands.lint, [flags.n]);
      },
      help: (params:any, flags:any) => {
        console.log(mainHelp);
      },
    },
    help: (params:any, flags:any) => {
      console.log(mainHelp);
    },
  },
  help: async (params:any, flags:any) => {
    console.log(mainHelp);
  },
};

// TODO: Help func content should be auto generated.
 
function runner(input:any) {
  const params = getParams(input);
  const flags = getFlags(input);
  if (flags.n) {
    flags.n = Array.isArray(flags.n) ? flags.n.join('-') : flags.n;
  }
  const isHelp = flags.h || flags.help;
  const func = params.reduce((result:any, name:any) => {
    if (!result[name]) {
      return false;
    } 
    return result[name];
   }, commands);

   if (isHelp && typeof func.help === 'function') {
     return func.help(params, flags);
   }
   if (!func || typeof func.exec !== 'function') {
    console.log(invalidCommand('Missing/Invalid properties and or required arguments'));
    return console.log(mainHelp)
   }
   return func.exec(params, flags);
}

runner(inputArgs);