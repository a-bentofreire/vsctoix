'use strict';
// uuid: 3ea0fe12-a11b-4fde-9d68-ccd7a3ee7208
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

// ------------------------------------------------------------------------
//                               In Transform Utilities
//
// $cattitle: Transform Text Utilities
// ------------------------------------------------------------------------

// ------------------------------------------------------------------------
//                               Utility: capitalize
//
// $keywords: capitalize
// $eg: classNameFunc  ->  ClassNameFunc
// ------------------------------------------------------------------------

export function capitalize(): void {
    um.utilityManager({
        utilType: um.TIXUtilityType.utInTransform,
        pat: /\b(_*\w)/g, repl: (match, p1: string) => p1.toUpperCase()
    });
}

// ------------------------------------------------------------------------
//                               Utility: camelCase
//
// $keywords: camel, camelcase
// $eg: ClassNameFunc  ->  classNameFunc
// ------------------------------------------------------------------------

export function camelCase(): void {
    um.utilityManager({
        utilType: um.TIXUtilityType.utInTransform,
        pat: /\b(_*\w)/g, repl: (match, p1: string) => p1.toLowerCase()
    });
}

// ------------------------------------------------------------------------
//                               Utility: spaceByUpper

// $title: Add Space before Uppercase
// $keywords: space, assignment
// $eg: doActionBefore  ->  do Action Before
// $desc: Useful to transform functions names into documentation
// ------------------------------------------------------------------------

export function spaceByUpper(): void {
    um.utilityManager({
        utilType: um.TIXUtilityType.utInTransform,
        pat: /([A-Z])/g, repl: (match, p1: string) => ' ' + p1
    });
}

// ------------------------------------------------------------------------
//                               Utility: reverseAssignment
//
// $keywords: reverse, assignment
// $eg: x == y[x] + 5  ->  y[x] + 5 == x
// $desc: Reverses the terms of assignments or equal/different comparisons
// ------------------------------------------------------------------------

export function reverseAssignment(): void {
    um.utilityManager({
        utilType: um.TIXUtilityType.utInTransform,
        pat: /\b(.+)(\s+)([=<>]=*|[!:]=+)(\s+)([^;]+)/, repl: '$5$2$3$4$1'
    });
}

// ------------------------------------------------------------------------
//                               Utility: unixToWinSlash
//
// $keywords: slash, windows, unix
// $eg: chocolate/candy  ->  chocolate\candy
// $desc: Converts slashes to backslashes
// ------------------------------------------------------------------------

export function unixToWinSlash(): void {
    um.utilityManager({
        utilType: um.TIXUtilityType.utInTransform,
        pat: /\//g, repl: '\\'
    });
}

// ------------------------------------------------------------------------
//                               Utility: winToUnixSlash
//
// $keywords: slash, windows, unix
// $eg: chocolate\candy  ->  chocolate/candy
// $desc: Converts backslashes to slashes
// ------------------------------------------------------------------------

export function winToUnixSlash(): void {
    um.utilityManager({
        utilType: um.TIXUtilityType.utInTransform,
        pat: /\\/g, repl: '/'
    });
}

// ------------------------------------------------------------------------
//                               Utility: singleToDoubleSlash
//
// $keywords: slash, single slash, double slash
// $eg: find\nagain  ->  find\\\nagain
// ------------------------------------------------------------------------

export function singleToDoubleSlash(): void {
    um.utilityManager({
        utilType: um.TIXUtilityType.utInTransform,
        pat: /\\/g, repl: '\\\\'
    });
}

// ------------------------------------------------------------------------
//                               Utility: doubleToSingleSlash
//
// $keywords: slash, single slash, double slash
// $eg: find\\\nagain -> find\nagain
// ------------------------------------------------------------------------

export function doubleToSingleSlash(): void {
    um.utilityManager({
        utilType: um.TIXUtilityType.utInTransform,
        pat: /\\\\/g, repl: '\\'
    });
}

// ------------------------------------------------------------------------
//                               Utility: urlEncode
// $keywords: encode, urldecode
// $eg: https://github.com  ->  https%3A%2F%2Fgithub.com
// ------------------------------------------------------------------------

export function urlEncode(): void {

    um.utilityManager({
        utilType: um.TIXUtilityType.utTransform
    }, (up): string => encodeURIComponent(up.intext));
}

// ------------------------------------------------------------------------
//                               Utility: urlDecode
// $keywords: decode, urldecode
// $eg: https%3A%2F%2Fgithub.com  ->  https://github.com
// ------------------------------------------------------------------------

export function urlDecode(): void {

    um.utilityManager({
        utilType: um.TIXUtilityType.utTransform
    }, (up): string => decodeURIComponent(up.intext));
}

