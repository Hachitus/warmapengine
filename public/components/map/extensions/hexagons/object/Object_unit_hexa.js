'use strict';

import { object_sprite_hexa } from './Object_hexa';
import { Object_sprite_unit } from '../../../core/objects/Object_sprite_unit';
import { hexaHitTest, getHexagonPoints } from '../utils/hexagonMath';

export class Object_unit extends Object_sprite_unit {
  constructor(coords = {x:0, y:0}, data, options) {
    super(coords, data,  options);

    this.name = "DefaultUnitObjects_hexa";
    this.customHitArea = getHexagonPoints(options.radius);

    object_sprite_hexa.build.call(this, options.radius);
  }
  contains(x, y) {
    var hitCoords = { x, y };
		var currentObjCoords = this.localToGlobal(0,0);
		var currentScale = {
			x: this.parent.parent.getScale(),
			y: this.parent.parent.getScale()
		};
    /* Object coordinates + the graphical offset given for the object (regX and regY) + scaling of the 
     * map. Without regX and Y the coordinate we test for would be for the images left upper corner 
     * not it's center. Scaling is also needed as it distorts the proportions */
    var offsetCoords = {
      x: Number(currentObjCoords.x) + Number(this.regX) + currentScale.x,
      y: Number(currentObjCoords.y) + Number(this.regY) + currentScale.y
    };
		var scaledHitArea;
		
		scaledHitArea = this.customHitArea.map(function(point) {
			return { x: point.x * currentScale.x, y: point.y * currentScale.y };
		});

    return hexaHitTest(scaledHitArea, hitCoords, offsetCoords);
  }
}