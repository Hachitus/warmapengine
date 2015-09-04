'use strict';

import { createHexagon } from '../../components/map/extensions/hexagons/utils/createHexagon';
import { createHexagon as pixi_createHexagon } from '../../components/map/extensions/hexagons/utils/pixi_createHexagon';
import hexagonMath from '../../components/map/extensions/hexagons/utils/hexagonMath';

describe("unitTest pixi.js utils.createHexagon -> ", function() {
  it("=> ... ", function(){
    expect(createHexagon).toBeDefined();
  });
});