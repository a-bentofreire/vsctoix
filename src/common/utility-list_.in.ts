'use strict';
// uuid: 62bc5bad-3e1b-45c5-a60f-7c96dbefb57e

// ------------------------------------------------------------------------
// Copyright (c) 2018 Alexandre Bento Freire. All rights reserved.
// Licensed under the MIT License+uuid License. See License.txt for details
// ------------------------------------------------------------------------

import { transformutilities } from './transformutilities';
import { lineutilities } from './lineutilities';
import { insertutilities } from './insertutilities';

export interface TUtilityDef {
  f: () => void;
  id: string;
}

export const utilityList: TUtilityDef[] = [
  /* __UTILITYDEFS__ */
];
