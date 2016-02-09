'use strict';

/*---------------------
------- IMPORT --------
----------------------*/
export {extendUnit as extendUnit};

/*---------------------
--------- API ---------
----------------------*/
function extendUnit (object) {
  object.prototype.move = function () {};
}