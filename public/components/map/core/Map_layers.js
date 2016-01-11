'use strict';

/*---------------------
------ VARIABLES ------
---------------------*/
var _UIObjects = [];

/*---------------------
-------- EXPORT -------
---------------------*/
export class Map_layer extends PIXI.Container {
  /**
   * Creates a basic layer for the Map. This type of layer can not hold subcontainers. Note that different devices and graphic cards can only have specific size of bitmap drawn, and PIXI cache always draws a bitmap thus the default is: 4096, based on this site: http://webglstats.com/ and MAX_TEXTURE_SIZE. This is important also when caching.
   *
   * @class core.Map_layer
   * @constructor
   * @param {Object} options                            optional options
   * @param {String} options.name                       Layers name, used for identifying the layer. Useful in debugging, but can be used for finding correct layers too
   * @param  {Object} options.coord                   coord starting coords of layer. Relative to parent map layer.
   * @param  {Integer} options.coord.x         X coordinate
   * @param  {Integer} options.coord.y         Y coordinate
   * @param  {Object} options.specialLayer            Is this layer special (e.g. UILayer not included in normal operations)
   * @param  {Integer} options.specialLayer.x         X coordinate
   * @param  {Integer} options.specialLayer.y         Y coordinate
   **/
  constructor(options = {
      name: "",
      coord: { x: 0, y: 0 },
      specialLayer: false,
      selectable: false } ) {
    var { name, coord, specialLayer, selectable } = options;

    super();
    Object.assign(this, coord);

    /**
     * Layers name, used for identifying the layer. Useful in debugging, but can be used for finding correct layers too
     *
     * @attribute name
     * @type {String}
     */
    this.name = "" + name;
    /**
     * Is this layer special (e.g. UILayer not included in normal operations)
     *
     * @attribute specialLayer
     * @type {Boolean}
     */
    this.specialLayer = !!specialLayer;
    /**
     * Can you select objects from this layer. For example with Map.getObjectsUnderArea
     *
     * @attribute selectable
     * @type {Boolean}
     */
    this.selectable = selectable;
  }
  /**
   * Does this layer use subcontainers.
   *
   * @method hasSubContainers
   * @return {Boolean} true = uses subcontainers.
   */
  hasSubContainers() {
    return this.subContainersConfig ? true : false;
  }
  /**
   * Is this layer cached at the moment or not.
   *
   * @method isCached
   * @return {Boolean} true = is cached
   */
  isCached() {
    return this.cacheAsBitmap;
  }
  /**
   * Move layer based on given amounts
   *
   * @method move
   * @param  {Object} coord            The amount of x and y coordinates we want the layer to move. I.e. { x: 5, y: 0 }. This would move the map 5 pixels horizontally and 0 pixels vertically
   * @param  {Integer} coord.x         X coordinate
   * @param  {Integer} coord.y         Y coordinate
   **/
  move(coord) {
    this.x += coord.x;
    this.y += coord.y;
    this.drawThisChild = true;
  }
  /**
   * set layer zoom
   *
   * @method setZoom
   * @param {Number} amount The amount that you want the layer to zoom.
   * @return {Number} The same amount that was given, except after transform to 2 decimals and type cast to Number
   * */
  setZoom(amount) {
    this.scale.x = this.scale.y = +amount.toFixed(2);

    return this.scale.x;
  }
  /**
   * get layer zoom
   *
   * @method getZoom
   * @return {Boolean} current amount of zoom
   * */
  getZoom() {
    return this.scale.x;
  }
    /**
   * get UIObjects on this layer, if there are any, or defaulty empty array if no UIObjects are active
   *
   * @method getUIObjects
   * @return {Array} current UIObjects
   * */
  getUIObjects() {
    return _UIObjects;
  }
  /**
   * Remove all the UIObjects from this layer
   *
   * @method emptyUIObjects
   * @return {Array} empty UIObjects array
   * */
  emptyUIObjects() {
    _UIObjects.map(obj => {
      this.removeChild(obj);
      obj = null;
    });

    return _UIObjects;
  }
  /**
   * Add UIObjects to this layer
   *
   * @method addUIObjects
   * @param {Object|Array} objects           Objects can be an object containing one object to add or an Array of objects to add.
   * @return {Array}                         All the UIObjects currently on this layer
   * */
  addUIObjects(objects) {
    _UIObjects = _UIObjects || [];
    if (Array.isArray(objects)) {
      objects.forEach( (/*thisObj*/) => {
        /* We want to make a copy of the object, since if add existing child from another container to UI,
         * it will get removed from the original container and messes up the hierarchy. Probably making a deep copy
         * directly isn't the best way, but it's the easiest atm. */
        //let newObj = utils.general.deepCopy(thisObj);

        //this.addChild(newObj);
      });
    } else {
      //let newObj = utils.general.deepCopy(objects);
      let newObj = objects;

      newObj.specialLayer = true;
      this.addChild( newObj );
    }
    _UIObjects.push( objects );

    return _UIObjects;
  }
  /**
   * Get primary layers, that this layer holds as children. So basically all children that are not special layers (such as UI layers etc.)
   *
   * @method getPrimaryLayers
   * @return {Array}                            Primary children layers under this layer
   * */
  getPrimaryLayers() {
    return this.children.filter(thisChild => {
      return !thisChild.specialLayer;
    });
  }
  /**
   * Get all objects that are this layers children or subcontainers children. Does not return layers, but the objects.
   *
   * @method getObjects
   * @return {Array}                            All the objects (not layers) found under this layer
   * */
  getObjects() {
    var allObjects = [];

    if (this.hasSubContainers()) {
      this.subContainerList.forEach(subcontainer => {
        allObjects.concat(subcontainer.children);
      });
    }

    return allObjects;
  }
  /**
   * @todo TAKE SUBCONTAINERS INTO ACCOUNT!
   *
   * @method setCache
   * @param {Boolean} status      true = activate cache, false = disable cache
   */
  setCache(status) {
    var toCacheStatus = status ? true : false;

    this.cacheAsBitmap = toCacheStatus;

    return toCacheStatus;
  }
}

export class Map_parentLayer extends Map_layer {
  /**
   * Layer designed to hold subcontainers. But can handle objects too.
   *
   * @class core.Map_parentLayer
   * @constructor
   * @param {Object} options
   * @param {String} options.name                    name layer property name, used for identifiying the layer, usefull in debugging, but used also otherwise too
   * @param  {Object} options.coord                  starting coords of layer. Relative to parent map layer.
   * @param  {Integer} options.coord.x               X coordinate
   * @param  {Integer} options.coord.y               Y coordinate
   * @param  {Object} options.subContainers          Subontainer size. If given activated subcontainers, otherwise not.
   * @param  {Integer} options.subContainers.width   width (in pixels)
   * @param  {Integer} options.subContainers.height  height (in pixels)
   * @param {Boolean} options.specialLayer           Is this special layer or not.
   *
   * Different devices graphic cards can only have specific size of bitmap drawn, and PIXI cache always draws a bitmap
   * thus the default is: 4096, based on this site: http://webglstats.com/ and MAX_TEXTURE_SIZE
   */
  constructor(options = { name: "", coord: { x: 0, y: 0 }, subContainers: false, specialLayer: false } ) {
    var { subContainers } = options;

    super(options);

    this.oldAddChild = super.addChild.bind(this);
    this.subContainersConfig = subContainers;
    this.subContainerList = [];
  }
  /**
   * @method addChild
   * @param {PIXI.DisplayObject} displayObject      PIXI.DisplayObject
   */
  addChild(displayObject) {
    if (this.hasSubContainers()) {
      let correctContainer;
      correctContainer = setCorrectSubContainer(displayObject, this);
      this.oldAddChild(correctContainer);
    } else {
      this.oldAddChild(displayObject);
    }

    return displayObject;
  }
  /**
   * @method getSubContainerConfigs
   */
  getSubContainerConfigs() {
    return this.subContainersConfig;
  }
  /**
   * @method getSubcontainersByCoordinates
   * @param  {Object} coordinates
   * @param  {Integer} coordinates.x                  X coordinate
   * @param  {Integer} coordinates.y                  Y coordinate
   * @param  {Object} options                         Optional options.
   * @param  {MapDataManipulator} options.filter      Filter for selecting only certain subcontainers
   */
  getSubcontainersByCoordinates(coordinates, options = { filter: undefined }) {
    if (!this.hasSubContainers()) {
      throw new Error("tried to retrieve subContainers, when they are not present");
    }

    var foundSubcontainers, tempCoordinates;
    var { filter } = options;

    tempCoordinates = this.toLocal(new PIXI.Point(coordinates.x, coordinates.y));
    tempCoordinates.width = coordinates.width;
    tempCoordinates.height = coordinates.height;

    foundSubcontainers = getClosestSubcontainers(this, tempCoordinates, { filter });

    return foundSubcontainers;
  }
  /**
   * @method getSubcontainers
   */
  getSubcontainers() {
    return this.subContainerList;
  }
}

class Map_subContainer extends PIXI.ParticleContainer {
  /**
   * Subcontainers are containers that hold objects like units and terrain etc. under them. They have some restrictions atm. since they are PIXI.ParticleContainers. But when needed we can extend Map_layers with another class which is subcontainer, but not ParticleContainer at the present there is no need, so we won't extend yet. Subcontainers help the layers to make better movement of the map, by making subcontainers visible or invisible and even helping with selecting objects on the map. Thus we don't need to use our inefficient Quadtree.
   *
   * NOTICE! PIXI.ParticleContainer is much more strict than normal containers. When you encounter issues with it. Please check the restrictions on ParticleContainer.
   *
   * @private
   * @class core.Map_subContainer
   * @constructor
   * @param  {Object} size              Subontainer size. If given activated subcontainers, otherwise not.
   * @param  {Integer} size.width       width (in pixels)
   * @param  {Integer} size.height      height (in pixels)
   */
  constructor(size) {
    super();

    this.specialLayer = true;
    this.size = size;
  }
  /**
   * Gets this subcontainers coordinates and size
   *
   * @method getSubcontainerArea
   * @param {Number} scale                              The size of scale the map currently has
   * @param {Boolean} options.toGlobal                  Do we get the global coordinates or local
   */
  getSubcontainerArea (scale, options = { toGlobal: true } ) {
    var coordinates;

    coordinates = options.toGlobal ? this.toGlobal(new PIXI.Point(0, 0)) : this;
    if (scale) {
      coordinates.x /= scale;
      coordinates.y /= scale;
    }

    return {
      x: Math.round( coordinates.x ),
      y: Math.round( coordinates.y ),
      width: Math.round( this.size.width ),
      height: Math.round( this.size.height )
    };
  }
  /**
   * Set cache on or off for this layer
   *
   * @method setCache
   * @param {Boolean} status      true = activate cache, false = disable cache
   */
  setCache(status) {
    var toCacheStatus = status ? true : false;

    this.cacheAsBitmap = toCacheStatus;

    return toCacheStatus;
  }
}
/*---------------------
------- PRIVATE -------
----------------------*/
/**
 * [setCorrectSubContainer description]
 *
 * @private
 * @static
 * @method setCorrectSubContainer
 * @param {PIXI.DisplayObject} displayObject
 * @param {Object} parentLayer
 */
function setCorrectSubContainer(displayObject, parentLayer) {
  var { subContainersConfig, subContainerList } = parentLayer;
  var xIndex = Math.floor( displayObject.x / subContainersConfig.width );
  var yIndex = Math.floor( displayObject.y / subContainersConfig.height );
  var thisSubcontainer;

  subContainerList[xIndex] = subContainerList[xIndex] || [];
  thisSubcontainer = subContainerList[xIndex][yIndex] = subContainerList[xIndex][yIndex] || [];

  if (subContainerList[xIndex][yIndex].length <= 0) {
    thisSubcontainer = new Map_subContainer({
      x: xIndex * subContainersConfig.width,
      y: yIndex * subContainersConfig.height,
      width: subContainersConfig.width,
      height: subContainersConfig.height
    });

    subContainerList[xIndex][yIndex] = thisSubcontainer;
    thisSubcontainer.x = xIndex * subContainersConfig.width;
    thisSubcontainer.y = yIndex * subContainersConfig.height;
    thisSubcontainer.visible = subContainersConfig.isHiddenByDefault ? false : true;
  }

  displayObject.x -= thisSubcontainer.x;
  displayObject.y -= thisSubcontainer.y;
  subContainerList[xIndex][yIndex].addChild(displayObject);

  return subContainerList[xIndex][yIndex];
}
/**
 * Get the closest subcontainers of the given area.
 *
 * @private
 * @static
 * @method getClosestSubcontainers
 * @param  {Object} layer                         Instance of PIXI.Container - The layer being used
 * @param  {Number} xIndex                        x / horizontal index.
 * @param  {Number} yIndex                        y / vertical index.
 * @param  {Object} options                       Optional options.
 * @param  {MapDataManipulator} options.filter    Filter for selecting only wanted subcontainers
 * @return {Array}                                Array of found subcontainers.
 */
function getClosestSubcontainers(layer, givenCoordinates, options = { filter: undefined }) {
  var { filter } = options;
  var coordinates = {
    x: givenCoordinates.x >= 0 ? givenCoordinates.x : 0,
    y: givenCoordinates.y >= 0 ? givenCoordinates.y : 0,
    width: givenCoordinates.width,
    height: givenCoordinates.height
  };
  var { width, height } = layer.getSubContainerConfigs();
  var allFoundSubcontainers = [];
  var xIndex = Math.floor( coordinates.x / width );
  var yIndex = Math.floor( coordinates.y / height );
  var x2 = coordinates.width ? coordinates.x + coordinates.width :  + coordinates.x;
  var y2 = coordinates.height ? coordinates.y + coordinates.height :  + coordinates.y;
  var widthIndex = Math.floor( x2 / width );
  var heightIndex = Math.floor( y2 / height );
  var subContainerList = layer.subContainerList;

  for (let thisXIndex = xIndex; thisXIndex <= widthIndex; thisXIndex++) {
    if (thisXIndex >= 0 && subContainerList && subContainerList[thisXIndex]) {
      for (let thisYIndex = yIndex; thisYIndex <= heightIndex; thisYIndex++) {
        if (thisYIndex >= 0 && subContainerList[thisXIndex][thisYIndex]) {
          if (filter && !filter.filterSubcontainers(subContainerList[thisXIndex][thisYIndex])) {
            continue;
          }
          allFoundSubcontainers.push(subContainerList[thisXIndex][thisYIndex]);
        }
      }
    }
  }

  return allFoundSubcontainers;
}