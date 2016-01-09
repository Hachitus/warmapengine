'use strict';

/* Bundle utils in utils-parent and export them */
import { dataManipulation } from './dataManipulation';
import { Quadtree } from './Quadtree';
import { effects } from './effects';
import { mouse, resize, environmentDetection, general } from './utils';

export const utils = {
  dataManipulation,
  Quadtree,
  effects,
  mouse, resize, environmentDetection, general
};