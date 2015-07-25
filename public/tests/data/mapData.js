export let mapData = {
  gameID: "53837d47976fed3b24000005",
  turn: 1,
  stages: [{
    type: "Map_stage",
    coord: { x: 0, y: 0 },
    name: "terrainStage",
    element: "#mapCanvas",
    layers: [{
      type: "Map_layer",
      coord: { x: 0, y: 0 },
      name: "terrainBaseLayer",
      specials: [{
        "interactive": false
      }],
      options: {
        cache: true
      },
      objectGroups: [{
        type: "Object_terrain_hexa",
        name: "TerrainBase", // I guess only for debugging?
        typeImageData: "terrainBase",
        objects: [{
           "objType":0,
           "name":"swamp",
           "_id":"53837d49976fed3b240006b8",
           "coord":{
              "x":"0",
              "y":"0"
           },
           "data": {},
           "lastSeenTurn":"1"
        },{
           "objType":1,
           "name":"swamp",
           "_id":"53837d49976fed3b240006bd",
           "coord":{
              "x":"0",
              "y":"141"
           },
           "data": {},
           "lastSeenTurn":"1"
        },
        {
           "objType":3,
           "name":"tundra",
           "_id":"53837d49976fed3b240006c2",
           "coord":{
              "x":"41",
              "y":"70"
           },
           "data": {},
           "lastSeenTurn":"1"
        },
        {
           "objType":2,
           "name":"forest",
           "_id":"53837d49976fed3b240006c7",
           "coord":{
              "x":"41",
              "y":"140"
           },
           "data": {},
           "lastSeenTurn":"1"
        }]
      }]
    },{
      "type": "Map_layer",
      "coord": { "x": "0", "y": "0" },
      "name": "unitLayer",
      "options": {
        "cache": "false"
      },
      "objectGroups": [{
        "type": "Object_unit_hexa",
        "name": "Unit", // I guess only for debugging?
        "typeImageData": "unit",
        "objects": [{
          "objType":0,
          "name": "Horsey the wild",
          "coord": {
            "x": "82", "y": "94"
          },
          "data": {
            "someCustomData": "true"
          },
          "lastSeenTurn":"1"
        }]
      }]
    }]
  }]
};