'use strict';
// uuid: 3a8efce5-1586-424d-8f5e-58d3e6ea8a80

// ------------------------------------------------------------------------
// Copyright (c) 2018 Alexandre Bento Freire. All rights reserved.
// Licensed under the MIT License+uuid License. See License.txt for details
// ------------------------------------------------------------------------

import { um } from './utilitymanager';

export namespace clipboardutilities {

  const copyPaste = require("copy-paste");

  // ------------------------------------------------------------------------
  //                               Clipboard Utilities
  //
  // $cattitle: Clipboard Utilities
  // ------------------------------------------------------------------------

  // ------------------------------------------------------------------------
  // $utility: extractText
  //
  // $keywords: clipboard, text
  // $desc: Copies to the clipboard the captured group of a regular expression. Each capture is separated by tabs
  // $eg: (\w+) = (\w+)
  // ------------------------------------------------------------------------

  export function extractText(): void {
    um.utilityManagerWithUserInputs({
      utilType: um.TIXUtilityType.utImmutableLinesUtility,
    },
      [{ prompt: 'Pattern' }],

      (up): void => {
        const text = up.inlines.join('\n');
        const foundPatterns = [];
        text.replace(new RegExp(up.userinputs[0], 'g'), (all, ...p) => {
          const len = p.length - 2;
          const captures = [];
          for (let i = 0; i < len; i++) {
            captures.push(p[i]);
          }
          foundPatterns.push(captures.join('\t'));
          return all;
        });
        copyPaste.copy(foundPatterns.join('\n'));
      });
  }

}

declare var module;
module.exports = { clipboardutilities };
