import * as core from 'bundles/coreBundle';
import * as log from 'components/logger/log';
import * as basicActions from 'components/map/extensions/basicActions/basicActions';
import * as mapMovement from 'components/map/extensions/mapMovement/mapMovement';
import * as UIDefaultTemplate from 'components/map/UIs/default/default';
import * as Preload from 'components/preloading/Preload';
import * as generalUtils from 'components/utilities/index';

/* Export factories */
import { factories as factories } from 'factories/index';

/* Export hexagon plugin */
import * as hexagonPlugin from 'components/map/extensions/hexagons/index';

window.flatworld = core;
window.flatworld.Q = Q;
window.flatworld.log = log;
window.flatworld.Preload = Preload.Preload;
window.flatworld.generalUtils = generalUtils;
window.flatworld.factories = factories;
window.flatworld.UITemplates = window.flatworld.UITemplates || {};
window.flatworld.UITemplates.default = UIDefaultTemplate;
window.flatworld.extensions = window.flatworld.extensions || {};
window.flatworld.extensions.hexagons = hexagonPlugin;
window.flatworld.extensions.basicActions = basicActions;
window.flatworld.extensions.mapMovement = mapMovement;