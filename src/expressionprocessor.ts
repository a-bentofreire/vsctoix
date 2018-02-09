'use strict';
// uuid: c6f19622-ddfd-4987-8823-85301440bc7e
/**
 * @preserve Copyright (c) 2018 Alexandre Bento Freire. All rights reserved.
 * @author Alexandre Bento Freire
 *
 * Permission is hereby granted, free of charge, to any person obtaining a
 * copy of this software and associated documentation files (the "Software"),
 * to deal in the Software without restriction, including without limitation
 * the rights to use, copy, modify, merge, publish, distribute, sublicense,
 * and/or sell copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice, and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
 * DEALINGS IN THE SOFTWARE.
 *
 */

// ------------------------------------------------------------------------
//                               utilities
// ------------------------------------------------------------------------

export function ISODate(): string {
  return new Date().toISOString().substr(0, 10);
}

// this function is credited to @broofa
// https://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
export function uuidv4(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

// ------------------------------------------------------------------------
//                               processMacro
// ------------------------------------------------------------------------

function processMacro(macro: string, inpText: string): string {
  switch (macro) {
    case 'upper': return inpText.toUpperCase();
    case 'lower': return inpText.toLowerCase();
    case 'capitalize': return inpText[0].toUpperCase() + inpText.substr(1);
    case 'isodate': return ISODate();
    case 'uuid': return uuidv4();
  }
  return inpText;
}

// ------------------------------------------------------------------------
//                               processExpression
// ------------------------------------------------------------------------
/**
 * Tests if the expression has macros that dynamic
 */
export function hasDynamicValues(expression: string): boolean {
  return /\\(c|e)/.test(expression);
}

/**
 * Splits the selected text into lines, and process line by line.
 * This way a selection of multiple lines can have macros with different values
 */
/* unused code
export function processExpressionLines(expression: string,
  selNr?: number, selText?: string): string {

  let lines = selText.split(/\n/);
  lines.forEach((line, index) => {
    lines[index] = processExpression(expression, selNr, selText);
    selNr++;
  });

  return lines.join('\n');
}*/


/**
 * Replaces macros with its text
 * Each macro starts with a slash (\), and can have dynamic values
 */
// Special Characters: \t \n
// Macros:
//  \c | \c{start} - Replaces with value with a counter starting from 'start'
//                   e.g. \c   \c{5}   \c{x00ff} \c{X0A}
//  \e{function} - Replaces the selected text transformed by the function
//                   e.g. \e{upper}   \e{lower}

export function processExpression(expression: string,
  selNr?: number, selText?: string): string {

  return expression.replace(/\\(n|t|(?:c|e)(?:\{(\w+)\}){0,1})/g,
    (match: string, tag: string, valueParam: string): string => {
      switch (tag.substr(0, 1)) {
        case 'n': return '\n';
        case 't': return '\t';
        case '\\': return '\\';
        case 'c':
          let value = selNr++;
          if (valueParam) {
            let firstChar = valueParam[0];

            // handles hex numbers
            if (firstChar === 'x' || firstChar === 'X') {
              value += parseInt(valueParam.substr(1), 16);
              let eres = Number(value).toString(16);
              // makes sure that the output has the same case as the input
              eres = firstChar === 'x' ? eres.toLowerCase() : eres.toUpperCase();
              // makes sure that the output has the same length or greater as the input
              let outLen = valueParam.length - 1;
              if (eres.length < outLen) eres = Array(outLen - eres.length + 1).join('0') + eres;
              return eres;

            } else {
              value += parseInt(valueParam);
            }
          }
          return Number(value).toString();

        case 'e': return processMacro(valueParam, selText);
      }
      return match;
    });
}

