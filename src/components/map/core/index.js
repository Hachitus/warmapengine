'use strict';

/* Bundle utils in utils-parent and export them */
export { eventListeners } from 'components/map/core/eventListeners';
export { Flatworld } from 'components/map/core/Flatworld';
export { MapDataManipulator } from 'components/map/core/MapDataManipulator';
export { mapEvents } from 'components/map/core/mapEvents';
import * as mapLayers from 'components/map/core/MapLayers';
export { ObjectManager } from 'components/map/core/ObjectManager';
import * as Objects from 'components/map/core/Objects';
export { Sound } from 'components/map/core/Sound';
export { UI } from 'components/map/core/UI';
export { UITemplateBase } from 'components/map/core/UITemplateBase';
import { mouse, resize, environmentDetection, general, effects } from 'components/map/core/utils/index';

/* extensions */
import { baseEventlisteners } from 'components/map/core/baseEventlisteners/baseEventlisteners';
import { mapDrag } from 'components/map/core/move/mapDrag';
import { mapZoom } from 'components/map/core/zoom/mapZoom';

export var utils = {
  mouse, resize, environmentDetection, general, effects
};
export var extensions = {
  baseEventlisteners, mapDrag, mapZoom
};
export { mapLayers };
export { Objects };