'use strict';

import { Map_API } from 'Map_API';
import { Unit } from 'Object_unit';

Object.assign(Units.prototype, Unit_addActions);

class Unit_addActions {
  constructor() {
    /* These are actions for different objects. These are handled server-side, but they are
    here for clarity, flexibility to give options and possibilities to front end too */
    this.actions = {
      city: {},
      unit: {
        orderMove: function( from, to ) {
          Map_API.move( from, to, this );
          this.actions = {
            move: {
              from: from,
              to: to
            }
          };
        },
        attack: function( from, to ) {
          Map_API.move( from, to, this );
          this.actions = {
             move: {
                from: from,
                to: to
             }
          };
        },
        execMove: function( to ) {
          this.data.coord = to;
          this.x = to.x;
          this.y = to.y;
        },
        changeName: function( name ) {
          this.data.name = name;
        },
        changeType: function( type ) {
          this.data.type = type;
          this.typeData = this.prototype.typeData.unit[ type ];
        },
      }
    }
  }
}

