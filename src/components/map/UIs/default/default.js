(function () {
  'use strict';

  /*---------------------
  ------- IMPORT --------
  ----------------------*/
  var { PIXI } = window.flatworld_libraries;
  var templates = window.flatworld.UIs.default.templates;
  var createVisibleHexagon = window.flatworld.extensions.hexagons.utils.createVisibleHexagon;
  var UITemplateBase = window.flatworld.UITemplateBase;
  var drawShapes = window.flatworld.UIs.default.utils.drawShapes;

  /*---------------------
  ------ VARIABLES ------
  ----------------------*/
  var cssClasses = {
    select: "#dialog_select"
  };
  var elements = {};

  /*---------------------
  --------- API ---------
  ----------------------*/
  class UIDefault extends UITemplateBase {
    /**
     * The simplest default UI implementation. Implemented UI functionalities for: showSelections, highlightSelectedObject
     *
     * @class UIs.default
     * @constructor
     * @requires Handlebars
     * @requires hexagon extension
     * @param  {HTMLElement} modal
     * @param  {Map} map
     * @param  {Object} options
     */
    constructor(modal, map, options = { styles: "#F0F0F0" }) {
      super(cssClasses);
      // Add a media (and/or media query) here if you'd like!
      // style.setAttribute("media", "screen")
      // style.setAttribute("media", "only screen and (max-width : 1024px)")

      this.map = map;
      this.modal = modal || document.getElementById("dialog_select");
      this.styles = options.styles;
    }
    /**
     * @method getTemplates
     * Required by the map/core/UI.js API
     */
    getTemplates() {
      return templates;
    }
    /**
     * Required by the map.UI API
     *
     * @method showSelections
     * @param  {Object} objects     Objects that have been selected. See core.UI for more information
     * @param {Object} getDatas       See explanation in core.UI
     * @param {Object} options        Extra options
     */
    showSelections(objects, getDatas, options) {
      var updateCB = this.map.drawOnNextTick.bind(this.map);
      var UILayer = this.map.getMovableLayer();
      var cb;

      /* We add the objects to be highlighted to the correct UI layer */
      //objectsToUI(UILayer, objects);

      if (objects && objects.length > 1) {
        cb = () => {
          this.modal.innerHTML = templates.multiSelection({
            title: "Objects",
            objects
          });

          this.showModal(this.modal, cssClasses);

          _getElement("select").style.display = 'block';
        };
      } else if (objects.length === 1) {
        cb = () => {
          this.highlightSelectedObject(objects[0]);
        };
      } else {
        cb = () => {
          UILayer.deleteUIObjects();
          updateCB();
          console.log("Error occured selecting the objects on this coordinates! Nothing found");
        };
      }

      _getElement("select").style.display = 'none';
      cb();
    }
    /**
     * Required by the map.UI API
     *
     * @method highlightSelectedObject
     * @param  {Object} object        Object that has been selected. See core.UI for more information
     * @param {Object} getDatas       See explanation in core.UI
     * @param {Object} options        Extra options. Like dropping a shadow etc.
     */
    highlightSelectedObject(object, getDatas, options = {shadow: { color: "0x0000", distance: 5, alpha: 0.55, angle: 45, blur: 5 }}) {
      var { shadow } = options;
      var highlightableObject, objectDatas;

      objectDatas = getDatas.allData(object);

      this.modal.innerHTML = templates.singleSelection({
        title: "Selected",
        object: {
          name: objectDatas.name
        }
      });
      this.showModal(this.modal, cssClasses);

      highlightableObject = this._highlightSelectedObject(object, this.map.getRenderer());

      highlightableObject.dropShadow({
        color: shadow.color,
        distance: shadow.distance,
        alpha: shadow.alpha,
        angle: shadow.angle,
        blur: shadow.blur
      });

      this.map.drawOnNextTick();

      _getElement("select").style.display = 'block';

      return highlightableObject;
    }
    /**
     * @method showUnitMovement
     * @param {PIXI.Point} to       Global coordinates that were clicked
     */
    showUnitMovement(object, to) {
      const UINAME = "movementArrow";
      var localTo, localFrom, currentArrow;

      localTo = this.map.getMovableLayer().toLocal(to);
      localFrom = this.map.getMovableLayer().toLocal(object.toGlobal(new PIXI.Point(0,0)));

      currentArrow = drawShapes.line(new PIXI.Graphics(), localFrom, localTo );

      this.map.removeUIObject(this.map.layerTypes.movableType.id, UINAME);

      this.map.addUIObject(this.map.layerTypes.movableType.id, currentArrow, UINAME);
      this.map.drawOnNextTick();
    }
    /**
     * @method init
     */
    init() {}

    /*----------------------
    ------- PRIVATE --------
    ----------------------*/
    /**
     * @private
     * @static
     * @method _highlightSelectedObject
     * @param  {Object} object
     * @param  {MapLayer} movableLayer
     * @param  {PIXI.Renderer} renderer
     */
    _highlightSelectedObject(object, renderer) {
      var movableLayer = this.map.getMovableLayer();
      var clonedObject;

      clonedObject = object.clone(renderer);
      clonedObject.__proto__ = object.__proto__;

      var coord = object.toGlobal(new PIXI.Point(0,0));
      coord = movableLayer.toLocal(coord);

      coord.x -= object.width * object.anchor.x;
      coord.y -= object.height * object.anchor.y;

      this.createHighlight(clonedObject, { coords: coord });

      return clonedObject;
    }
    /**
     * @private
     * @static
     * @method createHighlight
     */
    createHighlight(object, options = { coords: new PIXI.Point(0, 0) }) {
      const RADIUS = 47;
      const UI_CONTAINER_NAME = "unit highlight";
      const movableLayer = this.map.getMovableLayer();
      const container = new this.map.createSpecialLayer("UILayer", { toLayer: movableLayer});
      const objCoords = {
        x: Number(object.x),
        y: Number(object.y)
      };
      var highlighterObject;

      highlighterObject = createVisibleHexagon(RADIUS, { color: "#F0F0F0" });
      highlighterObject.x = objCoords.x + 32;
      highlighterObject.y = objCoords.y + 27;

      highlighterObject.alpha = 0.5;

      /* We add the children first to subcontainer, since it's much easier to handle the x and y in it, rather than
       * handle graphics x and y */
      container.addChild(highlighterObject);
      container.addChild(object);

      container.position = options.coords;

      this.map.removeUIObject(this.map.layerTypes.movableType.id);
      this.map.addUIObject(this.map.layerTypes.movableType.id, container, UI_CONTAINER_NAME);
    }

  }

  /*----------------------
  ------- PRIVATE --------
  ----------------------*/
  /**
   * @private
   * @static
   * @method _getElement
   * @param  {[type]} which [description]
   * @return {[type]}       [description]
   */
  function _getElement(which) {
    if (!elements[which]) {
      let element = document.querySelector(cssClasses[which]);
      elements[which] = element;
    }

    return elements[which];
  }

  window.flatworld.UIs.default.init = UIDefault;
})();