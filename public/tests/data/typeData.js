export let typeData = {
  "graphicData": {
    "general":{
      "terrain":{
        "tileWidth":82,
        "tileHeight":94
      }
    },
    "terrainBase":{
      "images":
      ["/assets/img/map/testHexagons/testHexagonSpritesheet.png"],
      "frames":[
        [0,0,82,94],[82,0,164,94],[164,0,246,94],[246,0,328,94]
      ],
      "imageSize":[82,94]
    },
    "terrain":{
      "images":["/assets/img/map/amplio2/terrain1.png"],
      "frames":[
        [1,1,96,48],[1,50,96,48],[1,99,96,48],[1,148,96,48],[1,197,96,48],[1,246,96,48],[1,295,96,48],[1,344,96,48],[1,393,96,48]
      ],
      "imageSize":[96,48]
    },
    "dither":{"images":["/assets/img/map/dither2.png"],"frames":[[0,0,96,48]],"imageSize":[96,48]},
    "prettifier":{
      "images":["/assets/img/map/amplio2/mountains.png","/assets/img/map/amplio2/hills.png","/assets/img/map/amplio2/terrain2.png"],
      "frames":[
        [1,1,96,66,0,0,18],[1,1,96,48,1,-4,4],[1,148,96,48,2]
      ]
    },
    "resource":{
      "images":["/assets/img/map/resources/terrain1.png"],
      "frames":[
        [195,1,96,48],[389,1,96,48]
      ]
    },
    "place":{},
    "city":{
      "images":["/assets/img/map/amplio2/medievalcities.png"],
      "frames":[
        [1,1,96,72],[98,1,96,72],[195,1,96,72],[292,1,96,72],[389,1,96,72],[485,1,96,72],[582,1,96,72],[679,1,96,72],[776,1,96,72],[873,1,96,72],[1,74,96,72],[98,74,96,72],[195,74,96,72],[292,74,96,72],[389,74,96,72],[485,74,96,72],[582,74,96,72],[679,74,96,72],[776,74,96,72],[873,74,96,72]
      ]
    },"building":{
      "images":["/assets/img/map/isophex/terrain1.png"],
      "frames":[
        [1,1,64,32],[66,1,64,32],[132,1,64,32],[198,1,64,32],[264,1,64,32],[1,34,64,32],[1,67,64,32],[1,100,64,32],[1,133,64,32],[1,166,64,32]
      ]
    },"modifier":{
      "images":["/assets/img/map/isophex/terrain1.png"],
      "frames":[
        [1,1,64,32],[66,1,64,32],[132,1,64,32],[198,1,64,32],[264,1,64,32],[1,34,64,32],[1,67,64,32],[1,100,64,32],[1,133,64,32],[1,166,64,32]
      ]
    },
    "unit":{
      "images":["/assets/img/map/amplio2/units.png"],
      "frames":{"width":63,"height":50}
    }
  },
  "objectData": {
    "unit":[{
        "name":"tank",
        "desc":"Vrooom...",
        "image":"0",
        "att":"Good",
        "def":"Poor",
        "siege":"Decent",
        "initiate":"90",
        "move":"100",
        "morale":"Average",
        "vision":"150",
        "influenceArea":"30"
      },{
        "name":"carrier","desc":"angry beehive","image":"6","att":"1","def":"2","siege":"2","initiate":"110","move":"100","morale":"Average","vision":"250","influenceArea":"30",
        "modifiers":{
          "unit":{
            "_enemy_":[{
              "from":"thisOnePlace",
              "modifiers":{
                "morale":"suffers morale drop"
      }}]}}},{
        "name":"cavalry","desc":"Give me an apple!","image":"26","att":"3","def":"1","siege":"0","initiate":"50","move":"300","morale":"Average","vision":"100","influenceArea":"30"
    }],
    "terrainBase":[{
        "image":"0","attachedToTerrains":["0"],"propability":"100%"
      },{
        "image":"1","attachedToTerrains":["2"],"propability":"100%"
      },{
        "image":"2","attachedToTerrains":["1"],"propability":"100%"
      },{
        "image":"3","attachedToTerrains":["4"],"propability":"100%"
      },{
        "image":"4","attachedToTerrains":["5"],"propability":"100%"
      },{
        "image":"5","attachedToTerrains":["3"],"propability":"100%"
    }],
    "terrain":[{
        "name":"desert","image":"0","desc":"very dry land",
        "modifiers":{
          "City":{
            "_player_":[{
                "from":"thisOnePlace",
                "modifiers":{
                  "production":"Provides +1 food for cities"
      }}]}}},{
        "name":"plain","image":"1","desc":"Buffalo roaming area",
        "modifiers":{
          "City":{
            "_player_":[{
                "from":"thisOnePlace","modifiers":{
                  "production":"Provides +12% food for cities"
      }}]}}},{
        "name":"forest","image":"2","desc":"Robin hood likes it here",
        "modifiers":{
          "Unit":{
            "_player_":[{
                "from":"thisOnePlace","modifiers":{"defend":"Unit defend +2"}}]}}},{"name":"tundra","desc":"Siberia teaches you","image":"6"},{"name":"arctic","desc":"Your ball will freeze of","image":"7"},{"name":"swamp","desc":"Cranberries and cloudberries","image":"8"}],"dither":[{"image":"0","attachedToTerrains":["0","1","2","3","4","5","6","7","8","9"],"propability":"100%"}],"prettifier":[{"image":"0","zIndex":"1","attachedToTerrains":["3"],"propability":"25%"},{"image":"1","zIndex":"1","attachedToTerrains":["1"],"propability":"40%"},{"image":"2","zIndex":"0","attachedToTerrains":["2"],"propability":"60%"}],"resource":[{"name":"Oasis","image":"0","desc":"Oasis in the middle of desert, or not atm.","modifiers":{"City":{"_player_":[{"from":"thisOnePlace","modifiers":{"production":"food production 5 / week"}}]}},"attachedToTerrains":["0"],"influenceArea":50},{"name":"Oil","image":"1","desc":"Black gold","modifiers":{"City":{"_player_":[{"from":"thisOnePlace","modifiers":{"production":"There is a lot of oil here"}}]}},"attachedToTerrains":["0","4"],"influenceArea":50}],"city":[{"name":"Medieval","vision":"100","image":"0","influenceArea":50},{"name":"Medieval2","vision":"100","image":"1","influenceArea":50}],"place":[],"building":[{"name":"Barracks","image":"0","tooltip":"Enables troop recruitment"},{"name":"Factory","image":"1","tooltip":"Produces weaponry"}],"government":[{"name":"Democrazy","description":"well it's a democrazy :)","tooltip":"Gives +20% happiness","image":"0","requirements":[],"possibleNatValues":[0,1],"modifiers":{"faction":{"politics":{"_player_":[{"from":"thisOnePlace","modifiers":{"happiness":"20%"}}]}}}},{"name":"Communism","description":"You know the one used in the great USSR and inside the great firewall of China","tooltip":"Gives production bonuses","image":"0","requirements":[],"possibleNatValues":[2,3],"modifiers":{"faction":{"politics":{"_player_":[{"from":"thisOnePlace","modifiers":{}}]}},"City":{"building":{"_player_":[{"from":"thisOnePlace","modifiers":{"production":"20%"}}]}}}}],"politics":{"taxRate":[{"min":"0","max":"20","modifiers":{"Unit":{"_player_":[{"from":"thisOnePlace","modifiers":{"attack":"+1"}}]}}},{"min":"21","max":"100","modifiers":{"faction":{"diplomacy":{"_player_":[{"from":"thisOnePlace","modifiers":{"skill":"+5"}}]}}}}],"corruption":[{"min":"0","max":"20","modifiers":{"Unit":{"_player_":[{"from":"thisOnePlace","modifiers":{"attack":"+1"}}]}}},{"min":"21","max":"100","modifiers":{"faction":{"diplomacy":{"_player_":[{"from":"thisOnePlace","modifiers":{"skill":"+5"}}]}}}}],"alignment":[{"min":"0","max":"20","modifiers":{"Unit":{"_player_":[{"from":"thisOnePlace","modifiers":{"attack":"+1"}}]}}},{"min":"21","max":"100","modifiers":{"faction":{"diplomacy":{"_player_":[{"from":"thisOnePlace","modifiers":{"skill":"+5"}}]}}}}],"happiness":[{"min":"0","max":"20","modifiers":{"Unit":{"_player_":[{"from":"thisOnePlace","modifiers":{"attack":"+1"}}]}}},{"min":"21","max":"100","modifiers":{"faction":{"diplomacy":{"_player_":[{"from":"thisOnePlace","modifiers":{"skill":"+5"}}]}}}}],"revoltRisk":[{"min":"0","max":"20","modifiers":{"Unit":{"_player_":[{"from":"thisOnePlace","modifiers":{"attack":"+1"}}]}}},{"min":"21","max":"100","modifiers":{"faction":{"diplomacy":{"_player_":[{"from":"thisOnePlace","modifiers":{"skill":"+5"}}]}}}}],"unity":[{"min":"0","max":"20","modifiers":{"Unit":{"_player_":[{"from":"thisOnePlace","modifiers":{"attack":"+1"}}]}}},{"min":"21","max":"100","modifiers":{"faction":{"diplomacy":{"_player_":[{"from":"thisOnePlace","modifiers":{"skill":"+5"}}]}}}}],"natValue":[{"name":"Integrity","tooltip":"Government and populations shows integrity and trustworthiness","modifiers":{"faction":{"politics":{"_player_":[{"from":"thisOnePlace","modifiers":{"internalRelations":"+10%","diplomacy":"+10%","revolt risk":"-5%","relationsToElite":"-20%"}}]}}}},{"name":"Capitalism","modifiers":{"faction":{"politics":{"_player_":[{"from":"thisOnePlace","modifiers":{"diplomacy":"+5%","relationsToElite":"+5%","morale":"+5%"}}]}}}},{"name":"Hardworking","modifiers":{"faction":{"politics":{"_player_":[{"from":"thisOnePlace","modifiers":{"productivity":"+10%","happiness":"+5%","relationsToElite":"+5%"}}]}}}},{"name":"Leadership","modifiers":{"faction":{"politics":{"_player_":[{"from":"thisOnePlace","modifiers":{"productivity":"+5%","happiness":"-5%","relationsToElite":"+5%","trading":"+10%"}}]}}}}]}}
};