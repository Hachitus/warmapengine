  /* This is equivalent to drawMapObject, except for fog of war */
  drawFOWGraphics( data, actionTypes, coords ) {
     this.data = this.data || {};
     this.data.coords = this.data.coords || {};

     if ( actionTypes.indexOf( data.action ) === -1 ) {
        throw new Error(
           "Unallowed actionType in JSON. Has to be one from the actionTypes-array" );
     }

     data.parameters[ 0 ] = coords;
     H_Lib.drawing.drawShape[ data.action ].apply( this, data.parameters );

     return this;
  }