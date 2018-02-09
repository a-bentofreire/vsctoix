'use strict';
// uuid: d477c481-d965-4afa-baac-56343a395d74
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

import * as vscode from 'vscode';
import * as um from './utilitymanager';
import * as ep from './expressionprocessor';

// ------------------------------------------------------------------------
//                               Line Utilities
//
// $cattitle: Line Utilities
// ------------------------------------------------------------------------

// ------------------------------------------------------------------------
//                               Utility: removeDuplicatedLines
// $keywords: remove, duplicates
// $eg: first||second||second||->||first||second
// $desc: Removes consecutive duplicated lines
// ------------------------------------------------------------------------

export function removeDuplicatedLines(): void {
  um.utilityManager({
    utilType: um.TIXUtilityType.utLinesUtility
  }, (up): string[] => {
    let arr = up.inlines;
    for (let i = arr.length - 1; i >= 0; i--) {
      if (arr[i + 1] === arr[i]) {
        arr.splice(i + 1, 1);
      }
    }
    return arr;
  });
}

// ------------------------------------------------------------------------
//                               Utility: removeEmptyLines
// $keywords: remove, empty
// $eg: first||||second||->||first||second
// ------------------------------------------------------------------------

export function removeEmptyLines(): void {
  um.utilityManager({
    utilType: um.TIXUtilityType.utLinesUtility
  }, (up): string[] => {
    let arr = up.inlines;
    for (let i = arr.length - 1; i >= 0; i--) {
      if (!arr[i].trim()) {
        arr.splice(i, 1);
      }
    }
    return arr;
  });
}

// ------------------------------------------------------------------------
//                               Utility: joinLines
// $keywords: join, lines
// $eg: red||green||-> expr:(x\c{X0A}),||red(x0A),green(x0B)
// $desc: Joins lines adding the computed expression at the end of every line
// ------------------------------------------------------------------------

export function joinLines(): void {
  um.utilityManagerWithUserInputs({
    utilType: um.TIXUtilityType.utLinesUtility,
  },
    [{ prompt: 'Expression' }],
    (up): string[] => {
      let userInput = up.userinputs[0];

      // when the userInput doesn't have dynamic values
      // is much faster to bypass processing line by line
      if (ep.hasDynamicValues(userInput)) {
        up.inlines.forEach((line, index) => {
          up.inlines[index] += ep.processExpression(userInput, up.selNr + index, line);
        });
        userInput = '';
      } else {
        userInput = ep.processExpression(userInput, up.selNr, up.intext);
      }

      let joinedLines = up.inlines.join(userInput);
      return [joinedLines];
    });
}

// ------------------------------------------------------------------------
//                               Utility: splitLines
// $keywords: split, lines
// $eg: red,green||-> expr: = \c{1}||red = 1||green = 2
// $desc: Split lines by an expression. Dynamic values aren't supported
// ------------------------------------------------------------------------

export function splitLines(): void {
  um.utilityManagerWithUserInputs({
    utilType: um.TIXUtilityType.utLinesUtility,
  },
    [{ prompt: 'Expression' }],
    (up): string[] => {
      let userInput = ep.processExpression(up.userinputs[0], up.selNr, up.intext);
      let resLines = [];
      let index = 0;
      up.inlines.forEach((line) => {
        resLines = resLines.concat(line.split(userInput));
      });
      return resLines;
    });
}

// ------------------------------------------------------------------------
//                               Utility: sortNumericallyAscending
// $keywords: sort
// $eg: 10. red||2. green||->||2. green||10. red
// $desc: For each line uses the first number as sort key
// ------------------------------------------------------------------------

export function sortNumericallyAscending(): void {
  um.utilityManager({
    utilType: um.TIXUtilityType.utLinesUtility,
  },
    (up): string[] => {
      let keylines: any[][] = up.inlines.map((line => {
        let match = line.match(/(\d+)/);
        let key = match ? parseInt(match[0]) : 0;
        return [key, line];
      }));
      keylines.sort((a, b) => a[0] - b[0]);
      return keylines.map(keypair => keypair[1]);
    });
}
