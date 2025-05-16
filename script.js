function startGame(map){
    const game = document.getElementById("game");
    game.innerHTML = "";

    for (let y = 0; y < map.length; y++){
        var color;
        var line = '<div class="mainG">';
        for (let i = 0; i < map.length; i++){
            var color = test(i,y);
            line += `<div> <div class="gameS" style="background-color:${color}" id="${i}${y}"> </div> </div>`;
        }
        line += "</div>";

        game.innerHTML += line;   
    }

    game.innerHTML += '<div id="butts"> </div>'

    buttoTest();
}

function buttoTest(){
    var bonusButtons = {mine: {}, build: {}};
    //console.log(player.position, map[player.position.y][player.position.x])
    var p0 = `<button style="cursor:default"> </button>`;
    var p1 = p0;
    var p2 = p0;
    var p3 = p0;
    if (world.maps[player.position.map].map[player.position.y][player.position.x] == "bush"){
        bonusButtons.mine = {action: 'onclick="chop()"', buttonIcon : "🌲"}
        p0 = `<button ${bonusButtons.mine.action}> ${bonusButtons.mine.buttonIcon} </button>`
    }
    else if (world.maps[player.position.map].map[player.position.y][player.position.x] == "stone"){
        bonusButtons.mine = {action: 'onclick="chop()"', buttonIcon : "🪨"}
        p0 = `<button ${bonusButtons.mine.action}> ${bonusButtons.mine.buttonIcon} </button>`
    }
    else if (world.maps[player.position.map].map[player.position.y][player.position.x] == ""){
        bonusButtons.build = {action: `onclick="build('farm')"`, buttonIcon : "🏠"}
        p1 = `<button ${bonusButtons.build.action}> ${bonusButtons.build.buttonIcon} </button>`
    }

    var button = document.getElementById("butts");
    button.innerHTML = "";
    button.innerHTML += `<div style="display:flex;"> \
    <div id="top-left" class="gameS buttons" style="height:50px; width:50px; background-color:gray;"> ${p0} </div> \
    <div id="top-mid" class="gameS buttons" style="height:50px; width:50px; background-color:lightgray;"><button onclick="move(0,-1,)">↑</button></div> \
    <div id="top-right" class="gameS buttons" style="height:50px; width:50px; background-color:gray;">${p1}</div> \
</div>`;
    button.innerHTML += `<div style="display:flex;"> \
    <div id="mid-left" class="gameS buttons" style="height:50px; width:50px; background-color:lightgray;"><button onclick="move(-1,0)">←</button></div> \
    <div id="mid-mid" class="gameS buttons" style="height:50px; width:50px; background-color:gray;"><button>≡</button></div> \
    <div id="mid-right" class="gameS buttons" style="height:50px; width:50px; background-color:lightgray;"><button onclick="move(1,0)">→</button></div> \
</div>`;
    button.innerHTML += `<div style="display:flex;"> \
    <div id="bot-left"class="gameS buttons" style="height:50px; width:50px; background-color:gray;"> ${p2} </div> \
    <div id="bot-mid"class="gameS buttons" style="height:50px; width:50px; background-color:lightgray;"><button onclick="move(0,1)">↓</button></div> \
    <div id="bot-right"class="gameS buttons" style="height:50px; width:50px; background-color:gray;"> ${p3} </div> \
</div>`;
}

function changeBlock(id, position){
    var color = test(position.x, position.y);
    document.getElementById(id).style.color = color;
}

function generateMap(exitT, exitB, exitL, exitR){ //these variables are true or false to disables exits
    var map = [];
    for (let i = 0; i < 11; i++){
        let row = [];
        for (let j = 0; j < 11; j++){
            var element = Math.random()*3;
            var mapPart;
            if (element > 2.85){
                mapPart = "stone";
            }
            else if(element > 1.7){
                mapPart = "bush";
            }
            else if (element > 1.3){
                mapPart = "water";
            }
            else if (element > 0){
                mapPart = ""
            }
            row.push(mapPart);
        }
        map[i] = row;
    }

    if (exitT){
        map[0][5] = "nextMap"
    }
    if (exitB){
        map[10][5] = "nextMap"
    }
    if (exitL){
        map[5][0] = "nextMap"
    }
    if (exitR){
        map[5][10] = "nextMap"
    }

    return map;
}

function build(building){
    // TODO: make the building work, hopefully add more things? maybe upgrades? maybe other things? farms?

    if (building == "farm"){
        world.maps[player.position.map].map[player.position.y][player.position.x] = "farm";
        world.farms["farm" + world.farms.increasingNum] = {
            pos : {
                posX : player.position.x,
                posY : player.position.y,
                map : player.position.map
            },
            phase : 1,
            time : {
                hour : world.time.hour,
                minut : world.time.minute,
                day : world.time.day
            }
        }

        world.farms.increasingNum++;
        
        console.log(world.farms)
    }
}

function chop(){
    if (world.maps[player.position.map].map[player.position.y][player.position.x] == "bush"){
        world.maps[player.position.map].map[player.position.y][player.position.x] = "";
        player.inventory.sticks += Math.floor(Math.random() * 2) + 1;
        player.inventory.leaves += Math.floor(Math.random() * 3) + 2;
        //startGame(world.maps[player.position.map].map);
        changeBlock(String(player.position.y) + String(player.position.x), {x : player.position.x, y : player.position.y});
        buttoTest();
    }
    else if (world.maps[player.position.map].map[player.position.y][player.position.x] == "stone"){
        world.maps[player.position.map].map[player.position.y][player.position.x] = "";
        player.inventory.stone += Math.floor(Math.random()) + 1;
        player.inventory.pebble += Math.floor(Math.random() * 2) + 2;
        //startGame(world.maps[player.position.map].map);
        changeBlock(String(player.position.y) + String(player.position.x), {x : player.position.x, y : player.position.y});
        buttoTest();
    }
}

function move(x, y){
    if (!(player.position.x + x <= -1 || player.position.x + x >= 11) && !(player.position.y + y <= -1 || player.position.y + y >= 11)){
        player.position.x += x;
        player.position.y += y;
        if (player.position.x == 0 && player.position.y == 5 && world.maps[player.position.map].map[player.position.y][player.position.x] == "nextMap"){
            player.position.map = "map" + (world.maps[player.position.map].num - 1);
            player.position.x = 9;
            startGame(world.maps[player.position.map].map);
        }
        else if (player.position.x == 10 && player.position.y == 5 && world.maps[player.position.map].map[player.position.y][player.position.x] == "nextMap"){
            player.position.map = "map" + (world.maps[player.position.map].num + 1);
            player.position.x = 1;
            startGame(world.maps[player.position.map].map);
        }
        else if (player.position.x == 5 && player.position.y == 0 && world.maps[player.position.map].map[player.position.y][player.position.x] == "nextMap"){
            player.position.map = "map" + (world.maps[player.position.map].num - 3);
            player.position.y = 9;
            startGame(world.maps[player.position.map].map);
        }
        else if (player.position.x == 5 && player.position.y == 10 && world.maps[player.position.map].map[player.position.y][player.position.x] == "nextMap"){
            player.position.map = "map" + (world.maps[player.position.map].num + 3);
            player.position.y = 1;
            startGame(world.maps[player.position.map].map);
        }
        else{
            document.getElementById(String(player.position.x-x) + String(player.position.y-y)).style.backgroundColor = test(player.position.x-x, player.position.y-y);
            document.getElementById(String(player.position.x) + String(player.position.y)).style.backgroundColor = test(player.position.x, player.position.y);
        }

        buttoTest();
    }
}

function test(x,y){
    var color;

    if (player.position.y == y && player.position.x == x){
        color = "orange";
    }
    else if (world.maps[player.position.map].map[y][x] == "bush"){
        color = "green";
    }
    else if(world.maps[player.position.map].map[y][x] == "water"){
        color = "DeepSkyBlue";
    }
    else if (world.maps[player.position.map].map[y][x] == "nextMap"){
        color = "red";
    }
    else if (world.maps[player.position.map].map[y][x] == "farm"){
        color = "brown";
    }
    else if (world.maps[player.position.map].map[y][x] == "stone"){
        color = "lightgray";
    }
    else{
        color = "lightgreen";
    }

    return color;
}

function everythingTime(){
    world.time.minute += 30;
    
    world.time.minute == 60 ? (()=>{world.time.hour++;
    world.time.minute = 0})() : null;
    
    world.time.hour == 24 ? (world.time.hour = 0, world.time.day++) : null;
    
    //document.getElementById("time").innerHTML = `${world.time.hour} : ${world.time.minute}`

    var body = document.querySelector("body");
    if (world.time.hour == 0) {
        body.style.backgroundColor = "dimgray";
    }
    else if (world.time.hour == 6) {
        body.style.backgroundColor = "darkgray";
    }
    else if (world.time.hour == 8) {
        body.style.backgroundColor = "gray";
    }
    else if (world.time.hour == 10) {
        body.style.backgroundColor = "lightgray";
    }
    else if (world.time.hour == 12) {
        body.style.backgroundColor = "whitesmoke";
    }
    else if (world.time.hour == 14) {
        body.style.backgroundColor = "gainsboro";
    }
    else if (world.time.hour == 16) {
        body.style.backgroundColor = "lightgray";
    }
    else if (world.time.hour == 18) {
        body.style.backgroundColor = "darkgray";
    }
    else if (world.time.hour == 20) {
        body.style.backgroundColor = "dimgray";
    }

    //This is for testing purposes, this makes the map have nothing inside - I used if for testing respawning
    /*
    for (let i = 0; i < 11; i++){
        let row = [];
        for (let j = 0; j < 11; j++){
            var mapPart;
            mapPart = "";
            row.push(mapPart);
        }
        world.maps[player.position.map].map[i] = row;
    }
    */
    var many = Math.ceil(Math.random() * 4) + 1;

    for (let i = 0; i < many; i++){
        respawn();
    }
}

function respawn(){
    var element = Math.random()*2;
    var mapPart;
    if (element >= 1){
        mapPart = "bush";
    }
    else if (element >= 0){
        mapPart = "stone";
    }

    var num1 = Math.floor(Math.random() * 11);
    var num2 = Math.floor(Math.random() * 11);
    if (world.maps[player.position.map].map[num1][num2] == ""){
        world.maps[player.position.map].map[num1][num2] = mapPart;
        //console.log(num1, num2, mapPart);
        startGame(world.maps[player.position.map].map);
    }
}

var player = {
    position : {x : Math.floor(Math.random()*10), y : Math.floor(Math.random()*10), map : "map" + Math.floor(Math.random() * 9 + 1)},
    inventory : {leaves : 0, sticks : 0, stone : 0, pebble : 0},
}

var world = {
    time : {day : 0, hour : 12, minute : 0},
    maps : {
        map1 : {map : generateMap(false, true, false, true), num : 1},
        map2 : {map : generateMap(false, true, true, true), num : 2},
        map3 : {map : generateMap(false, true, true, false), num : 3},
        map4 : {map : generateMap(true, true, false, true), num : 4},
        map5 : {map : generateMap(true, true, true, true), num : 5},
        map6 : {map : generateMap(true, true, true, false), num : 6},
        map7 : {map : generateMap(true, false, false, true), num : 7},
        map8 : {map : generateMap(true, false, true, true), num : 8},
        map9 : {map : generateMap(true, false, true, false), num : 9}
    },
    farms : {
        increasingNum : 0,
        // hierarchy ==>
        // world -> farms -> farm + increasingNum (0-n) -> {position : {X, Y, MAP}, 
        // phase : 1-5, time : {placeTime : 
        // {world.time.hour , world.time.minute, world.time.day}}}
    }
}

console.log(player.position.map)

setInterval(everythingTime, 12500)
//setInterval(everythingTime, 300) //for testing purposes when you need fast time

startGame(world.maps[player.position.map].map);