'use strict';
// uuid: 3ea0fe12-a11b-4fde-9d68-ccd7a3ee7208

// ------------------------------------------------------------------------
// Copyright (c) 2018 Alexandre Bento Freire. All rights reserved.
// Licensed under the MIT License+uuid License. See License.txt for details
// ------------------------------------------------------------------------

import * as vscode from 'vscode';
import * as um from './utilitymanager';
import * as ep from './expressionprocessor';

// ------------------------------------------------------------------------
//                               In Transform Utilities
//
// $cattitle: Transform Text Utilities
// ------------------------------------------------------------------------

// ------------------------------------------------------------------------
// $utility: capitalize
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
// $utility: camelCase
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
// $utility: spaceByUpper
//
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
// $utility: reverseAssignment
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
// $utility: unixToWinSlash
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
// $utility: winToUnixSlash
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
// $utility: singleToDoubleSlash
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
// $utility: doubleToSingleSlash
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
// $utility: urlEncode
//
// $keywords: encode, urldecode
// $eg: https://github.com  ->  https%3A%2F%2Fgithub.com
// ------------------------------------------------------------------------

export function urlEncode(): void {

  um.utilityManager({
    utilType: um.TIXUtilityType.utTransform
  }, (up): string => encodeURIComponent(up.intext));
}

// ------------------------------------------------------------------------
// $utility: urlDecode
//
// $keywords: decode, urldecode
// $eg: https%3A%2F%2Fgithub.com  ->  https://github.com
// ------------------------------------------------------------------------

export function urlDecode(): void {

  um.utilityManager({
    utilType: um.TIXUtilityType.utTransform
  }, (up): string => decodeURIComponent(up.intext));
}

// ------------------------------------------------------------------------
// $utility: regnize
//
// $desc: Adds slash to regular expression metachars
// $keywords: regular expressions
// $eg: (\w+)[A-Z]a*b+text  ->  \(\\w\+\)\[A-Z\]a\*b\+text
// ------------------------------------------------------------------------

export function regnize(): void {

  um.utilityManager({
    utilType: um.TIXUtilityType.utTransform
  }, (up): string => ep.regnize(up.intext, true));
}

// ------------------------------------------------------------------------
// $utility: headerToBookmark
//
// $desc: Converts markdown header text to Html Bookmark
// $keywords: markdown html bookmark
// $eg: Is this the header 你好?  ->  is-this-the-header-你好
// ------------------------------------------------------------------------

export function headerToBookmark(): void {

  um.utilityManager({
    utilType: um.TIXUtilityType.utTransform
  }, (up): string => up.intext.trim().toLowerCase()
    .replace(/[^\w\- \u0080-\uFFFFF]+/ug, ' ')
    .replace(/\s+/g, '-').replace(/\-+$/, ''));
}

