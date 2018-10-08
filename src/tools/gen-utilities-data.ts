'use strict';
// uuid: 822965e4-2f5d-48ab-8707-d366e2b19136

// ------------------------------------------------------------------------
// Copyright (c) 2018 Alexandre Bento Freire. All rights reserved.
// Licensed under the MIT License+uuid License. See License.txt for details
// ------------------------------------------------------------------------

/*
  This script scans typescripts for utilities,
  and transforms the output file templates by inserting the list of utilities
*/

let fs = require('fs');

const INPUT_UTILITY_FILES = ['transformutilities', 'lineutilities', 'insertutilities'];
const FOLDER = '../../src';
const OUTPUT_FILES = ['extension.ts', '../package.json', '../README.md'];
const AUTO_GEN_WARN = 'This file is generated automatically by npm run gen-utilities-data';

// ------------------------------------------------------------------------
//                               from systoix.js
// ------------------------------------------------------------------------

function loadText(filename: string, encoding?: string): string {
  return fs.readFileSync(filename, { encoding: encoding || 'utf-8' });
}

function saveText(filename: string, data: string): void {
  return fs.writeFileSync(filename, data);
}

// ------------------------------------------------------------------------
//                               getTitleFromName
// ------------------------------------------------------------------------

function getTitleFromName(name: string): string {
  return name[0].toUpperCase() + name.substr(1).replace(/([A-Z])/g, ' $1');
}

// ------------------------------------------------------------------------
//                               buildMacros
// ------------------------------------------------------------------------

interface TUtility {
  name: string;
  title: string;
  funcstr: string;
  eg: string;
  desc: string;
}

interface TMacro {
  key: string;
  value: string;
}

function buildMacros(utilities: TUtility[]): TMacro[] {

  const macros: TMacro[] = [
    { key: '__AUTO_GEN_WARN__', value: `${AUTO_GEN_WARN}` },
  ];

  const actionDefs: string[] = [];
  const commands: string[] = [];
  const ACTIVATION_EVENTS: string[] = [];

  utilities.forEach(utility => {
    actionDefs.push(`        { f: ${utility.funcstr}, id: 'editor.${utility.name}' }`);
    commands.push(`{ "command": "editor.${utility.name}", "title": "IX: ${utility.title}"}`);
    ACTIVATION_EVENTS.push(`"onCommand:editor.${utility.name}"`);
  });

  macros.push({ key: '/* __UTILITYDEFS__ */', value: actionDefs.join(',\n') });
  macros.push({ key: '"__COMMANDS__"', value: commands.join(',\n') });
  macros.push({ key: '"__ACTIVATION_EVENTS__"', value: ACTIVATION_EVENTS.join(',\n') });

  return macros;
}

// ------------------------------------------------------------------------
//                               run
// ------------------------------------------------------------------------
// WARN: Don't name it as 'run' since it conflicts with mocha/index.d.ts
function runGenerator(): void {

  console.log('  >> Started <<');

  const utilities: TUtility[] = [];
  const keywords: string[] = [];
  const utilityTable: { [cat: string]: TUtility[] } = {};
  const catTitles: { [utilityFile: string]: string } = {};

  INPUT_UTILITY_FILES.forEach(utilityFile => {

    const utilityCat = utilityTable[utilityFile] = [];

    const temText = loadText(`${FOLDER}/common/${utilityFile}.ts`);

    temText.replace(/\$cattitle\s*:\s*([^\n]+)\s*/, (_match, catTitle) => {
      catTitles[utilityFile] = catTitle;
      return '';
    });

    temText.replace(/\/\/\s*\$utility:\s*(\w+)((?:.|\n|\r)*?)\s*\/\/\s+-{15,}/g, (_match, name, paramData) => {

      const utility: TUtility = {
        name,
        title: getTitleFromName(name),
        funcstr: `${utilityFile}.${name}`,
        eg: '',
        desc: '',
      };
      paramData.replace(/\/\/\s*\$(\w+)\s*:\s*([^\n]*)\s*/g, (_match1, key, value) => {
        console.log(`    ${key}:${value}`);
        switch (key) {

          case 'title':
            utility.title = value;
            break;

          case 'keywords':
            value.split(',').forEach(valueKeyword => {
              valueKeyword = '"' + valueKeyword.trim() + '"';
              if (keywords.indexOf(valueKeyword) === -1) { keywords.push(valueKeyword); }
            });

          case 'eg':
            utility.eg = value;
            break;

          case 'desc':
            utility.desc = value;
            break;
        }
      });

      utilityCat.push(utility);
      console.log(`${utility.name} -> "${utility.title}"\n`);
      utilities.push(utility);
      return '';
    });
  });

  const macros = buildMacros(utilities);

  macros.push({ key: '"__KEYWORDS__"', value: keywords.join(',\n') });
  macros.push({ key: '__UTILITYCOUNT__', value: utilities.length.toString() });
  macros.push({
    key: '__UTILITY_LIST_TABLE__', value:
      Object.keys(utilityTable).map(utilityCat => {
        return `\n* ${catTitles[utilityCat]}\n` +
          utilityTable[utilityCat].map(utility => {
            let eg = utility.eg;
            if (eg === '__NONE__') { eg = ''; }
            if (eg) {
              if (eg.indexOf('||') === -1) { eg = ' ```e.g. ' + eg + '```'; } else {
                eg = '  \ne.g.  \n>' + eg.replace(/\|\|/g, '  \n>') + '  \n';
              }
            }
            let title = utility.title;
            if (utility.desc) { title = `${title} - **${utility.desc}**  \n`; }
            return `   * ${title}${eg}`;
          },
          ).join('\n');
      }).join('\n'),
  });

  OUTPUT_FILES.forEach(outputName => {
    const templateFile = outputName.replace(/(\.\w+)$/, '_.in$1');
    let temText = loadText(`${FOLDER}/${templateFile}`);

    macros.forEach(macro => { temText = temText.replace(macro.key, macro.value); });

    saveText(`${FOLDER}/${outputName}`, temText);
  });
  console.log('  >> Done <<');
}

runGenerator();
