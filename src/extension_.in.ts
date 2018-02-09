/* WARNING: __AUTO_GEN_WARN__ */
'use strict';
// uuid: be9bf2dc-cee0-4f68-986b-641a5cceb191
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