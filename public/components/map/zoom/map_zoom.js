'user strict';

Map = Map || {};

;(function() {
    Map.prototype.zoom = zoom;
    Map.prototype.setMaxZoom = setMaxZoom;
    Map.prototype.getZoomLevel = getZoomLevel;

    /** ==== Public functions */
    function zoom(amount) {
        validators._validate_ZoomLevel(amount);

        this.zoomLevel = amount;

        return this;
    }
    function setMaxZoom(max, min) {
        validators._validate_zoomLevel(max);
        validators._validate_zoomLevel(min);

        this.maxZoom = max;
        this.minZoom = min;

        return this;
    }
    function getZoomLevel() {
    }
})();