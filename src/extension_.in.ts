/* WARNING: __AUTO_GEN_WARN__ */
'use strict';
// uuid: be9bf2dc-cee0-4f68-986b-641a5cceb191

// ------------------------------------------------------------------------
// Copyright (c) 2018 Alexandre Bento Freire. All rights reserved.
// Licensed under the MIT License+uuid License. See License.txt for details
// ------------------------------------------------------------------------

import * as vscode from 'vscode';
import * as um from './utilitymanager';
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
        f: () => void,
        id: string
    };

    const utilities: TUtilityDef[] = [
/* __UTILITYDEFS__ */
    ];

    for (const action of utilities) {
        let disposable = vscode.commands.registerCommand(action.id, action.f);
        context.subscriptions.push(disposable);
    }
}

// ------------------------------------------------------------------------
//                               Cleanup Code
// ------------------------------------------------------------------------

export function deactivate() {

}