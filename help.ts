import {
  red,
  green,
  bold,
  dim,
  italic,
  underline,
  inverse,
  hidden,
  strikethrough,
  black,
  yellow,
  blue,
  magenta,
  cyan,
  white,
  gray,
  bgBlack,
  bgRed,
  bgGreen,
  bgYellow,
  bgBlue,
  bgMagenta,
  bgCyan,
  bgWhite,
} from './deps.ts';

const link = (url:string) => cyan(url);
const command = (text:string) => bold(`lab ${text}`);
const commandDescription = (text:string) => dim(text);
const line = dim(`\n ---------------------------------------------------------------- \n`)

export const mainHelp:string = `
  Usage:    ${bold('lab [--version] [--help]')}
            ${bold('<command> [<args>]')}

  You can read the full documentation on ${link('https://github.com/dynocode/lab')}

  This is some of the most relevant commands:

    Lab is dependent on yeoman, and the generator-labs you can install them manually or you can run:
        ${command('install')}    ${commandDescription(`This will ${green('install')} all Lab dependencies.`)}

    Start a new project:
        ${command('init [--name]')}    ${commandDescription(`It will be created in the current ${bold('dir')}`)}

    Init modules: Using ${command('init')} inits a full new project,
    but you can also init modules, this can be done to an existing project
    or as a way to only start a project with some of the modules.

    Init modules:
        ${command('init model')}       ${commandDescription(`Add a ${underline('model folder')}, and ${green('install')} needed deps`)}
        ${command('init schema')}      ${commandDescription(`Add a ${underline('schema folder')}, and ${green('install')} needed deps`)}
        ${command('init resolver')}    ${commandDescription(`Add a ${underline('resolver folder')}, and ${green('install')} needed deps`)}
        ${command('init editorConf')}  ${commandDescription(`Add an editor config file`)}
        ${command('init lint')}        ${commandDescription(`Set up a basic linter, and ${green('install')} needed deps`)}
    
    Create new:
        ${command('model [--name]')}        ${commandDescription(`Create a new empty ${underline('model file')}, index.js is auto updated to export`)}
        ${command('schema [--name]')}       ${commandDescription(`Create a new empty ${underline('schema file')}, index.js is auto updated to export`)}
        ${command('resolver [--name]')}     ${commandDescription(`Create a new empty ${underline('resolver file')}, index.js is auto updated to export`)}

    
    Other:
        ${command('model fk')}      ${commandDescription('Get list of all models a model links to, it looks for a folder in the current dir named model')}

    ${dim(magenta('Submit Issues'))}:           ${dim(link('https://github.com/dynocode/lab/issues'))} 
    ${dim(green('Submit Feature request'))}:  ${dim(link('https://github.com/dynocode/lab/issues'))} 
`;

export const invalidCommand = (msg?:string) => `${line}${magenta('Invalid command')}: ${msg ? bold(msg) : ''}${line}`;

export const terminalStyleTest:string = `
  ${red('red')}
  ${green('green')}
  ${bold('bold')}
  ${dim('dim')}
  ${italic('italic')}
  ${underline('underline')}
  ${inverse('inverse')}
  ${hidden('hidden')}
  ${strikethrough('strikethrough')}
  ${black('black')}
  ${yellow('yellow')}
  ${blue('blue')}
  ${magenta('magenta')}
  ${cyan('cyan')}
  ${white('white')}
  ${gray('gray')}
  ${bgBlack('bgBlack')}
  ${bgRed('bgRed')}
  ${bgGreen('bgGreen')}
  ${bgYellow('bgYellow')}
  ${bgBlue('bgBlue')}
  ${bgMagenta('bgMagenta')}
  ${bgCyan('bgCyan')}
  ${bgWhite('bgWhite')}
`;