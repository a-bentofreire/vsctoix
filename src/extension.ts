/* WARNING: This file is generated automatically by npm run gen-utilities-data */
'use strict';
// uuid: be9bf2dc-cee0-4f68-986b-641a5cceb191

// ------------------------------------------------------------------------
// Copyright (c) 2018 Alexandre Bento Freire. All rights reserved.
// Licensed under the MIT License+uuid License. See License.txt for details
// ------------------------------------------------------------------------

import * as vscode from 'vscode';
import * as transformutilities from './transformutilities';
import * as lineutilities from './lineutilities';
import * as insertutilities from './insertutilities';

// ------------------------------------------------------------------------
//                               Startup Code
// ------------------------------------------------------------------------

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

    interface TUtilityDef {
        f: () => void;
        id: string;
    }

    const utilities: TUtilityDef[] = [
        { f: transformutilities.capitalize, id: 'editor.capitalize' },
        { f: transformutilities.camelCase, id: 'editor.camelCase' },
        { f: transformutilities.spaceByUpper, id: 'editor.spaceByUpper' },
        { f: transformutilities.reverseAssignment, id: 'editor.reverseAssignment' },
        { f: transformutilities.unixToWinSlash, id: 'editor.unixToWinSlash' },
        { f: transformutilities.winToUnixSlash, id: 'editor.winToUnixSlash' },
        { f: transformutilities.singleToDoubleSlash, id: 'editor.singleToDoubleSlash' },
        { f: transformutilities.doubleToSingleSlash, id: 'editor.doubleToSingleSlash' },
        { f: transformutilities.urlEncode, id: 'editor.urlEncode' },
        { f: transformutilities.urlDecode, id: 'editor.urlDecode' },
        { f: transformutilities.regnize, id: 'editor.regnize' },
        { f: transformutilities.headerToBookmark, id: 'editor.headerToBookmark' },
        { f: transformutilities.mixer, id: 'editor.mixer' },
        { f: lineutilities.removeDuplicatedLines, id: 'editor.removeDuplicatedLines' },
        { f: lineutilities.removeEmptyLines, id: 'editor.removeEmptyLines' },
        { f: lineutilities.joinLines, id: 'editor.joinLines' },
        { f: lineutilities.splitLines, id: 'editor.splitLines' },
        { f: lineutilities.sortNumericallyAscending, id: 'editor.sortNumericallyAscending' },
        { f: lineutilities.indentOneSpace, id: 'editor.indentOneSpace' },
        { f: lineutilities.outdentOneSpace, id: 'editor.outdentOneSpace' },
        { f: insertutilities.insertISODate, id: 'editor.insertISODate' },
        { f: insertutilities.insertISOTimeDate, id: 'editor.insertISOTimeDate' },
        { f: insertutilities.insertUUID, id: 'editor.insertUUID' },
        { f: insertutilities.insertTextAtEnd, id: 'editor.insertTextAtEnd' },
        { f: insertutilities.insertTextAtStart, id: 'editor.insertTextAtStart' },
    ];

    for (const action of utilities) {
        const disposable = vscode.commands.registerCommand(action.id, action.f);
        context.subscriptions.push(disposable);
    }
}

// ------------------------------------------------------------------------
//                               Cleanup Code
// ------------------------------------------------------------------------

export function deactivate() {

}
