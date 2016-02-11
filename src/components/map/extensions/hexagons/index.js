'use strict';

/*
 * Bundles the hexagons plugin
 */

import { setupHexagonClick } from 'components/map/extensions/hexagons/eventListeners/select';
import { createHexagon, createVisibleHexagon } from 'components/map/extensions/hexagons/utils/createHexagon';
import { calcShortDiagonal, calcLongDiagonal, getHexagonPoints, hexaHitTest } from 'components/map/extensions/hexagons/utils/hexagonMath';
import { ObjectHexaTerrain, ObjectHexaUnit } from 'components/map/extensions/hexagons/Objects';
import { selectHexagonObject } from 'components/map/extensions/hexagons/selectHexagonPlugin';

export const hexagonPlugin = {
  setupHexagonClick,
  ObjectHexaTerrain,
  ObjectHexaUnit,
  selectHexagonObject,
  utils: {
    createHexagon,
    createVisibleHexagon,
    calcShortDiagonal,
    calcLongDiagonal,
    getHexagonPoints,
    hexaHitTest
  }
}