import { parse, logger } from './deps.ts';

import { mainHelp, invalidCommand } from './help.ts';

const { args } = Deno;
const inputArgs = parse(args);
// instal yo, clone code gen, npm link

/**
 * TODO:
 * The formatting need more work, the code gen should handle it, not the cli...
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
  format: ['yo', 'labs:format-file'],
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
        await runYo([...yoCommands.indexUpdate, '--model']);
        // TODO: the generator should add the file type. (need TS)
        return runYo([...yoCommands.format, '--relativePath', `${name}.js`, '--relToModel']);
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
        await runYo([...yoCommands.indexUpdate, '--schema']);
        return runYo([...yoCommands.format, '--relativePath', `${name}.js`, '--relToSchema']);
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
        await runYo([...yoCommands.indexUpdate, '--resolver']);
        return runYo([...yoCommands.format, '--relativePath', `${name}.js`, '--relToResolver']);
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