'use strict';
// uuid: 84b415dd-ce34-4cc9-bb37-4cd61b1e47ef
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
//                               Insert Utilities
//
// $cattitle: Insert Text Utilities
// ------------------------------------------------------------------------

// ------------------------------------------------------------------------
//                               Utility: insertISODate
// $title: Insert ISODate
// $keywords: date
// $eg: 2018-02-08
// ------------------------------------------------------------------------

export function insertISODate(): void {
  um.utilityManager({
    utilType: um.TIXUtilityType.utInsertAtEndUtility
  }, (up): string => ep.ISODate()
  );
}

// ------------------------------------------------------------------------
//                               Utility: insertUUID
// $title: Insert UUID
// $keywords: uuid, guid
// $eg: 7fff60f8-91e8-40ba-9053-56b0f3a487f0
// ------------------------------------------------------------------------

export function insertUUID(): void {
  um.utilityManager({
    utilType: um.TIXUtilityType.utInsertAtEndUtility
  }, (up): string => ep.uuidv4()
  );
}

// ------------------------------------------------------------------------
//                               Utility: insertTextAtEnd
// $keywords: insert, text
// $eg: red||green||-> expr: = \c{1}||red = 1||green = 2
// ------------------------------------------------------------------------

export function insertTextAtEnd(): void {
  um.utilityManagerWithUserInputs({
    utilType: um.TIXUtilityType.utInsertAtEndUtility
  },
    [{ prompt: 'Expression' }],

    (up): string => {
      let userInput = ep.processExpression(up.userinputs[0], up.selNr, up.intext);
      return userInput;
    });
}

// ------------------------------------------------------------------------
//                               Utility: insertTextAtStart
// $keywords: insert, text
// $eg: red||green||->expr: const \e{upper} =||const RED = red||const GREEN = green
// ------------------------------------------------------------------------

export function insertTextAtStart(): void {
  um.utilityManagerWithUserInputs({
    utilType: um.TIXUtilityType.utInsertAtStartUtility
  },
    [{ prompt: 'Expression' }],

    (up): string => {
      let userInput = ep.processExpression(up.userinputs[0], up.selNr, up.intext);
      return userInput;
    });
}
