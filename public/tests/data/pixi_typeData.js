export let typeData = {
  "graphicData": {
    "terrainBase":{
      "json": "/assets/img/map/testHexagons/pixi_testHexagonSpritesheet.json"
    },
    "unit":{
      "json": "/assets/img/map/units/testHexagonUnits.json"
    }
  },
  "objectData": {
    "terrainBase":[{
        "image":"terrain_blueHexagon.png",
        "attachedToTerrains":["0"],
        "propability":"100%",
        "name": "forDebugging - terrainBase 0"
      },{
        "image":"terrain_greenHexagon.png",
        "attachedToTerrains":["2"],
        "propability":"100%",
        "name": "forDebugging - terrainBase 1"
      },{
        "image":"terrain_redHexagon.png",
        "attachedToTerrains":["1"],
        "propability":"100%",
        "name": "forDebugging - terrainBase 2"
      },{
        "image":"terrain_yellowHexagon.png",
        "attachedToTerrains":["4"],
        "propability":"100%",
        "name": "forDebugging - terrainBase 3"
      }],
    "unit":[{
        "name":"tank",
        "desc":"Vrooom...",
        "image":"tank.png",
        "att":"Good",
        "def":"Poor",
        "siege":"Decent",
        "initiate":"90",
        "move":"100",
        "morale":"Average",
        "vision":"150",
        "influenceArea":"30"
      },{
        "name":"artillery",
        "desc":"Whistlers",
        "image":"artillery.png",
        "att":"1",
        "def":"2",
        "siege":"2",
        "initiate":"110",
        "move":"100",
        "morale":"Average",
        "vision":"250",
        "influenceArea":"30",
        "modifiers":{
          "unit":{
            "_enemy_":[{
              "from":"thisOnePlace",
              "modifiers":{
                "morale":"suffers morale drop"
              }
            }]
          }
        }
    }]
  }
};