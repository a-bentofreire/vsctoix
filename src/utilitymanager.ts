'use strict';
// uuid: 85d79009-f9ac-4c0f-a948-6d1d90ad3db7

// ------------------------------------------------------------------------
// Copyright (c) 2018 Alexandre Bento Freire. All rights reserved.
// Licensed under the MIT License+uuid License. See License.txt for details
// ------------------------------------------------------------------------

import * as vscode from 'vscode';
import { window } from 'vscode';

// ------------------------------------------------------------------------
//                               Types
// ------------------------------------------------------------------------

export interface TIXUtilityParams {
  changes?: { location: vscode.Position | vscode.Range | vscode.Selection, value: string }[];
  userinputs: string[];
  intext?: string;
  inlines?: string[];
  selNr?: number;

  editor?: vscode.TextEditor;
  doc?: vscode.TextDocument;
  sel?: vscode.Selection;
};

export type TIXUtilityFunc = (up: TIXUtilityParams) => void | string | string[];
export enum TIXUtilityType {
  /// preforms inline transforms replacing pat with repl. doesn't calls ActionFunc
  utInTransform,
  /// passes intext and replaces the selection with the return text
  utTransform,
  /// calls line by line and replaces each line with the returning result
  utLineUtility,
  /// passes inlines and replaces the selection with return lines
  utLinesUtility,
  /// inserts text at the start of the selection or at cursor point if no text is selected
  utInsertAtStartUtility,
  /// inserts text at the end of the selection or at cursor point if no text is selected
  utInsertAtEndUtility
};

export interface TIXUtilityDef {
  utilType: TIXUtilityType;
  pat?: string | RegExp;
  repl?;
};

export interface TIXUserInputReq {
  prompt?: string;
};

enum TIXAddLineStage { firstLine, middleLine, lastLine };

// ------------------------------------------------------------------------
//                               addInputLine
// ------------------------------------------------------------------------

function addInputLine(up: TIXUtilityParams, text: string, stage: TIXAddLineStage): void {

  if (stage != TIXAddLineStage.firstLine) {
    up.intext += '\n' + text;
  } else {
    up.intext = text;
  }
}

// ------------------------------------------------------------------------
//                               utilityManager
// ------------------------------------------------------------------------

export async function utilityManagerWithUserInputs(utilDef: TIXUtilityDef,
  IXUserInputReqs: TIXUserInputReq[],
  utilFunc: TIXUtilityFunc) {

  if (IXUserInputReqs.length) {
    let reqCount = IXUserInputReqs.length;
    let userinputs = [];

    for (let i = 0; i < reqCount; i++) {
      let userinput = await window.showInputBox(IXUserInputReqs[i]);
      if (userinput === undefined) {
        return;
      }
      userinputs.push(userinput);
    }
    _utilityManager(utilDef, utilFunc, { userinputs });
  }
}


export function utilityManager(utilDef: TIXUtilityDef, utilFunc?: TIXUtilityFunc): void {
  _utilityManager(utilDef, utilFunc, { userinputs: [] });
}

function _utilityManager(utilDef: TIXUtilityDef, utilFunc: TIXUtilityFunc, up: TIXUtilityParams): void {

  up.changes = [];
  up.editor = vscode.window.activeTextEditor;
  up.doc = up.editor.document;
  up.selNr = 0;

  let sels = up.editor.selections;
  // WARN: assumes the VSC API will give one selection and is empty when no text is selected
  let hasNoSels = (sels.length === 1) && (sels[0].isEmpty);
  for (const sel of sels) {
    up.sel = sel;
    up.inlines = [];
    switch (utilDef.utilType) {
      case TIXUtilityType.utInsertAtStartUtility:
      case TIXUtilityType.utInsertAtEndUtility:

        let insertText = '';

        if (hasNoSels) {
          up.intext = '';
          insertText = utilFunc(up) as string;
          if (insertText)
            up.changes.push({
              location: new vscode.Position(up.sel.start.line, up.sel.start.character),
              value: insertText
            });

        } else {
          // this code is only when there is a non-empty selection
          let lineInsMin = up.sel.start.line;
          let lineInsMax = up.sel.end.line;
          let xMin: number;
          let xMax: number;

          for (let lineI = lineInsMin; lineI <= lineInsMax; lineI++) {

            xMin = (lineI === lineInsMin) ? up.sel.start.character : 0;
            xMax = (lineI === lineInsMax) ? up.sel.end.character : up.doc.lineAt(lineI).text.length;
            let minPos = new vscode.Position(lineI, xMin);
            let maxPos = new vscode.Position(lineI, xMax);

            up.intext = up.doc.getText(new vscode.Range(minPos, maxPos)) || '';

            let insertText = utilFunc(up) as string;

            if (insertText)
              up.changes.push({
                location: utilDef.utilType === TIXUtilityType.utInsertAtStartUtility ?
                  minPos : maxPos, value: insertText
              });

            up.selNr++;
          }
          // the last line can't add the selNr otherwise
          // selNr will have +2 for the next cursor selection, instead +1
          up.selNr--;
        }

        break;



      case TIXUtilityType.utLinesUtility:
      case TIXUtilityType.utLineUtility:

        let lineMin = hasNoSels ? 0 : sel.start.line;
        let lineMax = hasNoSels ? up.doc.lineCount - 1 : sel.end.line;

        for (let lineI = lineMin; lineI <= lineMax; lineI++) {
          let line = up.doc.lineAt(lineI).text;

          switch (utilDef.utilType) {
            case TIXUtilityType.utLinesUtility:
              up.inlines.push(line);
              break;

            case TIXUtilityType.utLineUtility:
              up.intext = line;
              let outLine = utilFunc(up) as string;
              if (line !== outLine) {
                up.changes.push({
                  location: new vscode.Range(new vscode.Position(lineI, 0),
                    new vscode.Position(lineI, line.length)), value: outLine
                });
              }
              break;
          }
        }
        // run after all the selected lines
        if (utilDef.utilType == TIXUtilityType.utLinesUtility) {
          let outLines = utilFunc(up) as string[];
          let outRg = new vscode.Range(new vscode.Position(lineMin, 0),
            new vscode.Position(lineMax, up.doc.lineAt(lineMax).text.length));
          up.changes.push({ location: outRg, value: outLines.join('\n') });
        }

        break;



      case TIXUtilityType.utInTransform:
      case TIXUtilityType.utTransform:

        let outSel: vscode.Range | vscode.Selection;

        // when there is no selection it processes the whole code
        if (hasNoSels) {
          up.intext = up.doc.getText();

          outSel = new vscode.Range(new vscode.Position(0, 0),
            new vscode.Position(up.doc.lineCount, 0));

          // processes when there is one or more selections
        } else {
          outSel = up.sel;
          if (sel.isEmpty) {
            // transformations only happen if there is selected text
            // in case of multiple selections some might be empty
            break;
          }
          // processes the first line of a selection
          addInputLine(up, up.doc.lineAt(sel.start.line).text.substring(sel.start.character),
            TIXAddLineStage.firstLine);

          // processes the middle lines of a selection
          if (sel.start.line !== sel.end.line) {
            for (let i = sel.start.line + 1; i < sel.end.line; i++) {
              addInputLine(up, up.doc.lineAt(i).text,
                TIXAddLineStage.middleLine);
            }

            // processes the last line of a selection
            addInputLine(up, up.doc.lineAt(sel.end.line).text.substr(0, sel.end.character),
              TIXAddLineStage.lastLine);
          } else {
            // processes a single line selection
            addInputLine(up, up.intext.substr(0, sel.end.character - sel.start.character),
              TIXAddLineStage.firstLine);
          }
        }

        // calls the utilities function transforming up.intext into outSelText
        let outSelText: string;
        if (utilDef.utilType === TIXUtilityType.utInTransform) {
          outSelText = up.intext.replace(utilDef.pat, utilDef.repl);
        }
        else { outSelText = utilFunc(up) as string; }

        if (up.intext !== outSelText) {
          up.changes.push({ location: outSel, value: outSelText });
        }

        break;

    }
    up.selNr++;
  }

  // executed after all the selections or the full text is processed
  if (up.changes.length) {
    up.editor.edit((edit) => {
      for (const change of up.changes) {
        edit.replace(change.location, change.value);
      }
    });

  }
}
