import { parse, logger } from './deps.ts';

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
  schema: ['yo', 'labs:schema'],
  resolver: ['yo', 'labs:resolver'],
  init: ['yo', 'labs:init'],
  editorConf: ['yo', 'labs:editorConf'],
  lint: ['yo', 'labs:lint'],
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
      logger.info('Help');
    },
  },
  new: {
    model: {
      exec: async (params:any, flags:any) => {
        return runYo(yoCommands.model, [flags.n]);
      },
      help: (params:any, flags:any) => {
        logger.info('Help');
      },
    },
    schema: {
      exec: async (params:any, flags:any) => {
        return runYo(yoCommands.schema, [flags.n]);
      },
      help: (params:any, flags:any) => {
        logger.info('Help');
      },
    },
    resolver: {
      exec: async (params:any, flags:any) => {
        return runYo(yoCommands.resolver, [flags.n]);
      },
      help: (params:any, flags:any) => {
        logger.info('Help');
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
        logger.info('Help');
      },
    },
    schema: {
      exec: async (params:any, flags:any) => {
        return runYo(yoCommands.schema, [flags.n]);
      },
      help: (params:any, flags:any) => {
        logger.info('Help');
      },
    },
    resolver: {
      exec: async (params:any, flags:any) => {
        return runYo(yoCommands.resolver, [flags.n]);
      },
      help: (params:any, flags:any) => {
        logger.info('Help');
      },
    },
    editorConf: {
      exec: async (params:any, flags:any) => {
        return runYo(yoCommands.editorConf, [flags.n]);
      },
      help: (params:any, flags:any) => {
        logger.info('Help');
      },
    },
    lint: {
      exec: async (params:any, flags:any) => {
        return runYo(yoCommands.lint, [flags.n]);
      },
      help: (params:any, flags:any) => {
        logger.info('Help');
      },
    },
    help: (params:any, flags:any) => {
      logger.info('Help');
    },
  },
  help: (params:any, flags:any) => {
    logger.info('Help');
  },
};
 
function runner(input:any) {
  const params = getParams(input);
  const flags = getFlags(input);
  if (flags.n) {
    flags.n = Array.isArray(flags.n) ? flags.n[1] : null;
  }
  const func = params.reduce((result:any, name:any) => {
    if (!result[name]) {
      // TODO: return help
      throw new Error('Not a command');
    } 
    return result[name];
   }, commands);
   if (typeof func.exec !== 'function') {
     // TODO: return help
     return logger.info('Missing props');
   }
   return func.exec(params, flags);
}

runner(inputArgs);