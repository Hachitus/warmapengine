import * as core from 'bundles/coreBundle';
import * as log from 'components/logger/log';
import * as basicActions from 'components/map/extensions/basicActions/basicActions';
import * as mapMovement from 'components/map/extensions/mapMovement/mapMovement';
import * as UISDefault from 'components/map/UIs/default/default';
import * as preloading from 'components/preloading/preloading';
import * as polyfills from 'components/utilities/polyfills';

/* Export factories */
import * as factories from 'factories/index';

/* Export hexagon plugin */
import * as hexagonPlugin from 'components/map/extensions/hexagons/index';

window.flatworld = core;
window.flatworld.log = log;
window.flatworld.preloading = preloading;
window.flatworld.polyfills = polyfills;
window.flatworld.factories = factories;
window.flatworld.UIs = window.flatworld.UIs || {};
window.flatworld.UIs.default = UISDefault;
window.flatworld.extensions = {};
window.flatworld.extensions.hexagons = hexagonPlugin;
window.flatworld.extensions.basicActions = basicActions;
window.flatworld.extensions.mapMovement = mapMovement;