'use strict';

/*
 * This one bundles the core functionality by importing and re-exporting the core functionality. You can then use
 * some bundler or transpiler, like JSPM to bundle the core functionality to one build-file.
 */
export * from 'components/map/core/utils/index';
export * from 'components/map/core/Objects';
export * from 'components/map/core/eventlisteners';
export * from 'components/map/core/Map';
export * from 'components/map/core/MapDataManipulator';
export * from 'components/map/core/MapLayers';
export * from 'components/map/core/mapEvents';
export * from 'components/map/core/ObjectManager';
export * from 'components/map/core/UI';
export * from 'components/map/core/UI_themeBase';

/* Adds to glocal namespace! */
import * as PIXI from 'assets/lib/pixi/pixi.js';
import * as hamster from '/assets/lib/hamsterjs/hamster.js';
// purely for internet explorer. Though I think this issue is only in EI11,not in edge?
import * as es6StringPoly from '/assets/lib/polyfills/es6StringPoly/es6StringPoly.js';