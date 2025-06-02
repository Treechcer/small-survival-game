import { player } from "./player.js"

export function redrawBoard() {
    var map = world.maps[player.position.map].map;
    for (let y = 0; y < map.length; y++) {
        for (let i = 0; i < map.length; i++) {
            changeBlock({ x: y, y: i });
        }
    }
}

export function changeBlock(position) {
    var id = String(position.x) + String(position.y);
    var color = test(position.x, position.y);
    document.getElementById(id).style.backgroundColor = color;
}

export function generateBiome(mapNum) {
    var ret;

    if (biomes.length == 0) {
        mapBiomes.check = false;
        biomes = ["plains", "desert", "hills"];
    }

    var temp = Math.floor(Math.random() * biomes.length);
    var chosenBiome = biomes[temp];
    mapBiomes.biomeCount[chosenBiome]++;
    ret = chosenBiome;

    if (mapBiomes.check) {
        for (let i = biomes.length - 1; i >= 0; i--) {
            if (mapBiomes.biomeCount[biomes[i]] >= 3) {
                biomes.splice(i, 1);
            }
        }
    }

    mapBiomes["map" + mapNum] = ret;

    //console.log(chosenBiome, biomes, ret);

    return ret;

    //this is some... God awfull code, but it looks like it works lmao
}

export function generateMap(exitT, exitB, exitL, exitR, biome) { //these variables are true or false to disables exits
    var mapElements = biomeCheck(biome);

    var map = [];
    for (let i = 0; i < 11; i++) {
        let row = [];
        for (let j = 0; j < 11; j++) {
            var element = Math.random() * 3;
            var mapPart;
            if (element > mapElements[0].chance) {
                mapPart = mapElements[0].type;
            }
            else if (element > mapElements[1].chance) {
                mapPart = mapElements[1].type;
            }
            else if (element > mapElements[2].chance) {
                mapPart = mapElements[2].type;
            }
            else if (element > mapElements[3].chance) {
                mapPart = mapElements[3].type;
            }
            row.push(mapPart);
        }
        map[i] = row;
    }

    if (exitT) {
        map[0][5] = "nextMap"
    }
    if (exitB) {
        map[10][5] = "nextMap"
    }
    if (exitL) {
        map[5][0] = "nextMap"
    }
    if (exitR) {
        map[5][10] = "nextMap"
    }

    return map;
}

export function biomeCheck(biome) {
    var mapElements;

    if (biome == "plains") {
        mapElements = [
            { type: "stone", chance: 2.85 },
            { type: "bush", chance: 1.7 },
            { type: "water", chance: 1.3 },
            { type: "", chance: 0 }
        ]
    }
    else if (biome == "desert") {
        mapElements = [
            { type: "cactus", chance: 2.4 },
            { type: "stone", chance: 2 },
            { type: "water", chance: 1.6 },
            { type: "sand", chance: 0 }
        ]
    }
    else if (biome == "hills") {
        mapElements = [
            { type: "ironOre", chance: 2.7 },
            { type: "stone", chance: 1.8 },
            { type: "bush", chance: 1.3 },
            { type: "rockyBottom", chance: 0 }
        ]
    }

    return mapElements;
}


export var biomes = ["plains", "desert", "hills"];

export var mapBiomes = {
    biomeCount: {
        plains: 0,
        desert: 0,
        hills: 0,
    },
    check: true,
    map1: "",
    map2: "",
    map3: "",
    map4: "",
    map5: "",
    map6: "",
    map7: "",
    map8: "",
    map9: "",
}

export var world = {
    time: { day: 0, hour: 12, minute: 0 },
    maps: {
        map1: { map: generateMap(false, true, false, true, generateBiome(1), 1), num: 1 },
        map2: { map: generateMap(false, true, true, true, generateBiome(2), 2), num: 2 },
        map3: { map: generateMap(false, true, true, false, generateBiome(3), 3), num: 3 },
        map4: { map: generateMap(true, true, false, true, generateBiome(4), 4), num: 4 },
        map5: { map: generateMap(true, true, true, true, generateBiome(5), 5), num: 5 },
        map6: { map: generateMap(true, true, true, false, generateBiome(6), 6), num: 6 },
        map7: { map: generateMap(true, false, false, true, generateBiome(7), 7), num: 7 },
        map8: { map: generateMap(true, false, true, true, generateBiome(8), 8), num: 8 },
        map9: { map: generateMap(true, false, true, false, generateBiome(9), 9), num: 9 }
    },
    farms: {
        increasingNum: 0,
        // hierarchy ==>
        // world -> farms -> farm + increasingNum (0-n) -> {position : {X, Y, MAP}, 
        // phase : 1-5, time : {placeTime : 
        // {world.time.hour , world.time.minute, world.time.day}
        // how long is built: //counter of time}}
    },
    furnaces: {
        increasingNum: 0,

        // furnace + n -> position : {x, y, map}

    },
    weather: {
        currentWeather: "Sunny",
        emoji: "☀️",
        nextWeatherChanceTimeHours: 6,
        currentWeatherTime: 0,
    }
}

export function test(x, y) {
    var color;

    if (player.position.y == y && player.position.x == x) {
        color = "orange";
    }
    else if (world.maps[player.position.map].map[y][x] == "bush") {
        color = "green";
    }
    else if (world.maps[player.position.map].map[y][x] == "water") {
        color = "DeepSkyBlue";
    }
    else if (world.maps[player.position.map].map[y][x] == "nextMap") {
        color = "Crimson";
    }
    else if (world.maps[player.position.map].map[y][x] == "farm") {
        color = "SaddleBrown";
    }
    else if (world.maps[player.position.map].map[y][x] == "stone") {
        color = "	#778899";
    }
    else if (world.maps[player.position.map].map[y][x] == "finishedFarm") {
        color = "brown";
    }
    else if (world.maps[player.position.map].map[y][x] == "sand") {
        color = "#F0E68C";
    }
    else if (world.maps[player.position.map].map[y][x] == "cactus") {
        color = "#2E8B57";
    }
    else if (world.maps[player.position.map].map[y][x] == "rockyBottom") {
        color = "lightgray";
    }
    else if (world.maps[player.position.map].map[y][x] == "ironOre") {
        color = "#b7410e";
    }
    else if (world.maps[player.position.map].map[y][x] == "furnace") {
        color = "#3d3d3d"
    }
    else {
        color = "lightgreen";
    }

    return color;
}