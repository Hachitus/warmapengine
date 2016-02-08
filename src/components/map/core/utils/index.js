'use strict';

/* Bundle utils in utils-parent and export them */
import { dataManipulation } from './dataManipulation';
import { effects } from './effects';
import { mouse, resize, environmentDetection, general } from './utils';

export const utils = {
  dataManipulation,
  effects,
  mouse, resize, environmentDetection, general
};