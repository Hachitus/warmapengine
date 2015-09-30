export let gameData = {
  ID: "53837d47976fed3b24000005",
	dataPackageID: 0,
	graphicTheme: 0,
  turn: 1,
	maxTurns: 150,
	maxPlayers: 10,
  mapSize: { x: 41, y: 47 },
	players: [10],
	skippedTurns: [],
  hexagonRadius: 47,
  pluginsToActivate: {
    map: ["components/map/core/zoom/map_zoom", "components/map/core/move/map_drag", "components/map/extensions/hexagons/object_select/object_select_hexagon"]
  }
};