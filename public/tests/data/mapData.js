export let mapData = {
  gameID: "53837d47976fed3b24000005",
  turn: 1,
  stages: [{
    type: "Map_stage",
    coordinates: { x: 0, y: 0 },
    name: "terrainStage",
    element: "#canvasTerrain",
    layers: [{
      type: "Map_layer",
      coordinates: { x: 0, y: 0 },
      name: "terrainBaseLayer",
      specials: [{
        "interactive": false
      }],
      options: {
        cache: true
      },
      objectGroups: [{
        type: "Objects_terrain",
        name: "TerrainBase", // I guess only for debugging?
        typeImageData: "terrainBase",
        objects: [{
           "objType":5,
           "name":"swamp",
           "_id":"53837d49976fed3b240006b8",
           "coord":{
              "x":"0",
              "y":"240"
           },
           "data": {},
           "lastSeenTurn":"1"
        },{
           "objType":5,
           "name":"swamp",
           "_id":"53837d49976fed3b240006bd",
           "coord":{
              "x":"0",
              "y":"480"
           },
           "data": {},
           "lastSeenTurn":"1"
        },
        {
           "objType":3,
           "name":"tundra",
           "_id":"53837d49976fed3b240006c2",
           "coord":{
              "x":"0",
              "y":"720"
           },
           "data": {},
           "lastSeenTurn":"1"
        },
        {
           "objType":2,
           "name":"forest",
           "_id":"53837d49976fed3b240006c7",
           "coord":{
              "x":"0",
              "y":"960"
           },
           "data": {},
           "lastSeenTurn":"1"
        },
        {
           "objType":2,
           "name":"forest",
           "_id":"53837d49976fed3b240006cc",
           "coord":{
              "x":"0",
              "y":"1200"
           },
           "data": {},
           "lastSeenTurn":"1"
        },
        {
           "objType":3,
           "name":"tundra",
           "_id":"53837d49976fed3b240006d1",
           "coord":{
              "x":"0",
              "y":"1440"
           },
           "data": {},
           "lastSeenTurn":"1"
        },
        {
           "objType":2,
           "name":"forest",
           "_id":"53837d49976fed3b240006d6",
           "coord":{
              "x":"48",
              "y":"72"
           },
           "data": {},
           "lastSeenTurn":"1"
        },
        {
           "objType":2,
           "name":"forest",
           "_id":"53837d49976fed3b240006b4",
           "coord":{
              "x":"0",
              "y":"48"
           },
           "data": {},
           "lastSeenTurn":"1"
        },
        {
           "objType":5,
           "name":"swamp",
           "_id":"53837d49976fed3b240006b9",
           "coord":{
              "x":"0",
              "y":"288"
           },
           "data": {},
           "lastSeenTurn":"1"
        },
        {
           "objType":3,
           "name":"tundra",
           "_id":"53837d49976fed3b240006be",
           "coord":{
              "x":"0",
              "y":"528"
           },
           "data": {},
           "lastSeenTurn":"1"
        },
        {
           "objType":2,
           "name":"forest",
           "_id":"53837d49976fed3b240006c3",
           "coord":{
              "x":"0",
              "y":"768"
           },
           "data": {},
           "lastSeenTurn":"1"
        },
        {
           "objType":3,
           "name":"tundra",
           "_id":"53837d49976fed3b240006c8",
           "coord":{
              "x":"0",
              "y":"1008"
           },
           "data": {},
           "lastSeenTurn":"1"
        },
        {
           "objType":2,
           "name":"forest",
           "_id":"53837d49976fed3b240006cd",
           "coord":{
              "x":"0",
              "y":"1248"
           },
           "data": {}
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
        "type": "Objects_unit",
        "name": "Unit", // I guess only for debugging?
        "typeImageData": "unit",
        "objects": [{
          "objType":2,
          "name": "Horsey the wild",
          "coord": { "x": "60", "y": "60" },
          "data": {
            "someCustomData": "true"
          },
          "lastSeenTurn":"1"
        }]
      }]
    }]
  }]
};