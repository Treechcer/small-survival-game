function startGame(map){
    const game = document.getElementById("game");
    game.innerHTML = "";
    var line = `<div id="gameWrap">`;

    for (let y = 0; y < map.length; y++){
        line += '<div class="mainG">';
        for (let i = 0; i < map.length; i++){
            var color = test(i,y);
            line += `<div> <div class="gameS" style="background-color:${color}" id="${i}${y}"> </div> </div>`;
        }
        line += "</div>";
 
    }
    line += "</div>";
    game.innerHTML = line; 
    game.innerHTML += '<div id="butts"> </div>'

    buttoTest();
}

function redrawBoard(){
    var map = world.maps[player.position.map].map;
    for (let y = 0; y < map.length; y++){
        for (let i = 0; i < map.length; i++){
            changeBlock({x : y, y : i});   
        }
    }
}

function buttoTest(){
    var bonusButtons = {mine: {}, build: {}};
    //console.log(player.position, map[player.position.y][player.position.x])
    var p0 = `<button style="cursor:default"> </button>`;
    var p1 = p0;
    var p2 = p0;
    var p3 = p0;

    var truthTable = [false, false, false, false]

    if (world.maps[player.position.map].map[player.position.y][player.position.x] == "bush"){
        bonusButtons.mine = {action: 'onclick="chop()"', buttonIcon : "🌲"}
        p0 = `<button ${bonusButtons.mine.action}> ${bonusButtons.mine.buttonIcon} </button>`
        truthTable[0] = true;
    }
    else if (world.maps[player.position.map].map[player.position.y][player.position.x] == "stone"){
        bonusButtons.mine = {action: 'onclick="chop()"', buttonIcon : "🪨"}
        p0 = `<button ${bonusButtons.mine.action}> ${bonusButtons.mine.buttonIcon} </button>`
        truthTable[0] = true;
    }
    else if (world.maps[player.position.map].map[player.position.y][player.position.x] == "finishedFarm"){
        bonusButtons.mine = {action: 'onclick="chop()"', buttonIcon : "🌾"}
        p0 = `<button ${bonusButtons.mine.action}> ${bonusButtons.mine.buttonIcon} </button>`
        truthTable[0] = true;
    }
    
    if (world.maps[player.position.map].map[player.position.y][player.position.x] == ""){
        bonusButtons.build = {action: `onclick="build('farm')"`, buttonIcon : "🏠"}
        p1 = `<button ${bonusButtons.build.action}> ${bonusButtons.build.buttonIcon} </button>`
        if (player.inventory.sticks > 2 && player.inventory.leafes > 4){
            truthTable[1] = true;
        }
    }

    var inventory = makeInventory();
    var crafting = makeCraftring();

    var button = document.getElementById("butts");
    button.innerHTML = "";

    button.innerHTML = `
  <div style="display: flex; gap: 10px;">
    <div style=" border: 3px solid black; border-radius: 10px; display:flex; padding:10px; box-shadow: 2px 3px 5px black; background-color:#bfbfbf">
        ${inventory.first}
        ${inventory.second}
        ${inventory.third}
    </div>
    <div style="display: flex; flex-direction: column; border: 3px solid black; border-radius: 10px; padding:10px; box-shadow: 2px 3px 5px black; background-color:#bfbfbf">
      <div style="display: flex;">
        <div id="top-left" class="gameS" style="height:50px; width:50px; background-color:gray;">${p0}</div>
        <div id="top-mid" class="gameS button" style="height:50px; width:50px; background-color:lightgray;">
          <button onclick="move(0,-1)">↑</button>
        </div>
        <div id="top-right" class="gameS" style="height:50px; width:50px; background-color:gray;">${p1}</div>
      </div>
      <div style="display: flex;">
        <div id="mid-left" class="gameS button" style="height:50px; width:50px; background-color:lightgray;">
          <button onclick="move(-1,0)">←</button>
        </div>
        <div id="mid-mid" class="gameS button" style="height:50px; width:50px; background-color:gray;">
          <button onclick="openMenu()">≡</button>
        </div>
        <div id="mid-right" class="gameS button" style="height:50px; width:50px; background-color:lightgray;">
          <button onclick="move(1,0)">→</button>
        </div>
      </div>
      <div style="display: flex;">
        <div id="bot-left" class="gameS" style="height:50px; width:50px; background-color:gray;">${p2}</div>
        <div id="bot-mid" class="gameS button" style="height:50px; width:50px; background-color:lightgray;">
          <button onclick="move(0,1)">↓</button>
        </div>
        <div id="bot-right" class="gameS" style="height:50px; width:50px; background-color:gray;">${p3}</div>
      </div>
    </div>

    <div style=" border: 3px solid black; border-radius: 10px; display:flex; padding:10px; box-shadow: 2px 3px 5px black; background-color:#bfbfbf">
        ${inventory.first}
        ${inventory.second}
        ${inventory.third}
    </div>
  </div>
`;

    
    var indexedIds = ["top-left", "top-right", "bot-left", "bot-right"]
    for (let i = 0; i < 4; i++){
        if (truthTable[i]){
            var el = document.getElementById(indexedIds[i]);
    
            el.classList.add("button")
        }
    }
}

function changePage(isRight){
    if (!isRight){
        player.page--;
    }
    else if (isRight){
        player.page++;
    }

    buttoTest();
}

function makeCraftring(){
    
    //TODO: Make this actually work and not just inventroy 2 lmao

    var page = [];
    var on = {button1: {class: "", HTMLatribute : "", func : "changePage(false)"}, button2 : {class: "", HTMLatribute : "", func : "changePage(true)"}}

    if (player.UI.CraftPage == 0){
        page[0] = `🪵: ${player.inventory.sticks}`
        page[1] = `🍃: ${player.inventory.leafes}`
        page[2] = `🪨: ${player.inventory.pebble}`
        page[3] = `💧: ${player.inventory.watter}`
        page[4] = `🧵: ${player.inventory.fiber}`
        page[5] = `⛰️: ${player.inventory.stone}`
        page[6] = `🫐: ${player.inventory.berries}`
        on.button1.HTMLatribute = "disabled";
        on.button1.class = "dis";

        on.button2.HTMLatribute = "";
        on.button2.class = "button";
    }
    else if (player.UI.CraftPage == 1){
        page[0] = `🍞: ${player.inventory.bread}`
        page[1] = `🌾: ${player.inventory.wheat}`
        page[2] = ``
        page[3] = ``
        page[4] = ``
        page[5] = ``
        page[6] = ``

        on.button2.HTMLatribute = "disabled";
        on.button2.class = "dis";

        on.button1.HTMLatribute = "";
        on.button1.class = "button";
    }
}

function makeInventory(){
    /*
    inspiration on how to make it, because I wrote similar code:

    <div id="top-left" class="gameS" style="height:50px; width:50px; background-color:gray;"> ${p0} </div> \
    <div id="top-mid" class="gameS button" style="height:50px; width:50px; background-color:lightgray;"><button onclick="move(0,-1,)">↑</button></div> \
    <div id="top-right" class="gameS" style="height:50px; width:50px; background-color:gray;">${p1}</div> \

    */
    var page = [];
    var on = {button1: {class: "", HTMLatribute : "", func : "changePage(false)"}, button2 : {class: "", HTMLatribute : "", func : "changePage(true)"}}

    if (player.UI.InvPage == 0){
        page[0] = `🪵: ${player.inventory.sticks}`
        page[1] = `🍃: ${player.inventory.leafes}`
        page[2] = `🪨: ${player.inventory.pebble}`
        page[3] = `💧: ${player.inventory.watter}`
        page[4] = `🧵: ${player.inventory.fiber}`
        page[5] = `⛰️: ${player.inventory.stone}`
        page[6] = `🫐: ${player.inventory.berries}`
        on.button1.HTMLatribute = "disabled";
        on.button1.class = "dis";

        on.button2.HTMLatribute = "";
        on.button2.class = "button";
    }
    else if (player.UI.InvPage == 1){
        page[0] = `🍞: ${player.inventory.bread}`
        page[1] = `🌾: ${player.inventory.wheat}`
        page[2] = ``
        page[3] = ``
        page[4] = ``
        page[5] = ``
        page[6] = ``

        on.button2.HTMLatribute = "disabled";
        on.button2.class = "dis";

        on.button1.HTMLatribute = "";
        on.button1.class = "button";
    }


    var inv = {
    first: `<div style="display: flex; flex-direction: column;">
            <div class="inv" style="background-color:gray;"> ${page[0]} </div>
            <div class="inv ${on.button1.class}" style="background-color:gray;"> <button onclick="${on.button1.func}" class="${on.button1.class}" ${on.button1.HTMLatribute}> ← </button> </div>
            <div class="inv" style="background-color:gray;"> ${page[1]} </div>
    </div>`,
    second: `<div style="display: flex; flex-direction: column;">
            <div class="inv" style="background-color:gray;"> ${page[2]} </div>
            <div class="inv" style="background-color:gray;"> ${page[3]} </div>
            <div class="inv" style="background-color:gray;"> ${page[4]}</div>
    </div>`,
    third: `<div style="display: flex; flex-direction: column;">
            <div class="inv" style="background-color:gray; "> ${page[5]} </div>
            <div class="inv ${on.button2.class}" style="background-color:gray;"> <button onclick="${on.button2.func}" class="${on.button2.class}" ${on.button2.HTMLatribute}> → </button> </div>
            <div class="inv" style="background-color:gray;"> ${page[6]} </div>
    </div>`
};

    return inv;
}

function changeBlock(position){
    var id = String(position.x) + String(position.y);
    var color = test(position.x, position.y);
    document.getElementById(id).style.backgroundColor = color;
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

    if (building == "farm" && player.inventory.sticks >= 3 && player.inventory.leafes >= 5){
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
                day : world.time.day,
                timer : 0
            }
        }

        world.farms.increasingNum++;
        player.inventory.sticks -= 3;
        player.inventory.leafes -= 5;
        //console.log(world.farms);
    }

    buttoTest();
}

function chop(){
    if (world.maps[player.position.map].map[player.position.y][player.position.x] == "bush"){
        world.maps[player.position.map].map[player.position.y][player.position.x] = "";
        player.inventory.sticks += Math.floor(Math.random() * 2) + 1;
        player.inventory.leafes += Math.floor(Math.random() * 3) + 2;
        //startGame(world.maps[player.position.map].map);
        changeBlock({x : player.position.x, y : player.position.y});
        buttoTest();
    }
    else if (world.maps[player.position.map].map[player.position.y][player.position.x] == "stone"){
        world.maps[player.position.map].map[player.position.y][player.position.x] = "";
        player.inventory.stone += Math.floor(Math.random()) + 1;
        player.inventory.pebble += Math.floor(Math.random() * 2) + 2;
        //startGame(world.maps[player.position.map].map);
        changeBlock({x : player.position.x, y : player.position.y});
        buttoTest();
    }
    else if (world.maps[player.position.map].map[player.position.y][player.position.x] == "finishedFarm"){
        world.maps[player.position.map].map[player.position.y][player.position.x] = "";
        player.inventory.wheat += Math.ceil(Math.random() * 3) + 1;
        //startGame(world.maps[player.position.map].map);
        changeBlock({x : player.position.x, y : player.position.y});
        buttoTest();
    }

    console.log(player.inventory);
}

function move(x, y){

    function movinator3000(){
        player.move.canMove = true;
        clearInterval(player.move.intervalID);
    }

    if (!(player.position.x + x <= -1 || player.position.x + x >= 11) && !(player.position.y + y <= -1 || player.position.y + y >= 11) && player.move.canMove){
        player.position.x += x;
        player.position.y += y;

        player.move.canMove = false;
        player.move.intervalID = setInterval(movinator3000, 175);

        if (player.position.x == 0 && player.position.y == 5 && world.maps[player.position.map].map[player.position.y][player.position.x] == "nextMap"){
            player.position.map = "map" + (world.maps[player.position.map].num - 1);
            player.position.x = 9;
            //startGame(world.maps[player.position.map].map);
            redrawBoard();
        }
        else if (player.position.x == 10 && player.position.y == 5 && world.maps[player.position.map].map[player.position.y][player.position.x] == "nextMap"){
            player.position.map = "map" + (world.maps[player.position.map].num + 1);
            player.position.x = 1;
            //startGame(world.maps[player.position.map].map);
            redrawBoard()
        }
        else if (player.position.x == 5 && player.position.y == 0 && world.maps[player.position.map].map[player.position.y][player.position.x] == "nextMap"){
            player.position.map = "map" + (world.maps[player.position.map].num - 3);
            player.position.y = 9;
            //startGame(world.maps[player.position.map].map);
            redrawBoard()
        }
        else if (player.position.x == 5 && player.position.y == 10 && world.maps[player.position.map].map[player.position.y][player.position.x] == "nextMap"){
            player.position.map = "map" + (world.maps[player.position.map].num + 3);
            player.position.y = 1;
            //startGame(world.maps[player.position.map].map);
            redrawBoard()
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
        color = "Crimson";
    }
    else if (world.maps[player.position.map].map[y][x] == "farm"){
        color = "SaddleBrown";
    }
    else if (world.maps[player.position.map].map[y][x] == "stone"){
        color = "lightgray";
    }
    else if (world.maps[player.position.map].map[y][x] == "finishedFarm"){
        color = "brown";
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


    //farm checking and stuff

    for (let farm in world.farms){
        if (farm != "increasingNum"){
            if (world.farms[farm].time.timer >= 5 && world.farms[farm].phase < 5){
                world.farms[farm].phase++;
                world.farms[farm].time.timer = 0;
            }

            if (world.farms[farm].phase == 5){
                world.maps[world.farms[farm].pos.map].map[world.farms[farm].pos.posY][world.farms[farm].pos.posX] = "finishedFarm";
                changeBlock({x: world.farms[farm].pos.posX, y : world.farms[farm].pos.posY})
            }

             world.farms[farm].time.timer++;
        }
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
        //startGame(world.maps[player.position.map].map);
        changeBlock({x: num2,y: num1})
        //console.log(String(num2) , String(num1))
    }
}

document.addEventListener('keydown', function(event) {
    if (event.key == "w" || event.key == "ArrowUp"){
        move(0,-1);
    }
    else if (event.key == "s" || event.key == "ArrowDown"){
        move(0,1);
    }
    else if (event.key == "a" || event.key == "ArrowRight"){
        move(-1,0);
    }
    else if (event.key == "d" || event.key == "ArrowLeft"){
        move(1,0);
    }
});

var player = {
    position : {x : Math.floor(Math.random()*10), y : Math.floor(Math.random()*10), map : "map" + Math.floor(Math.random() * 9 + 1)},
    inventory : {leafes : 0, sticks : 0, stone : 0, pebble : 0, berries : 0, wheat : 0, bread : 0, watter : 0, fiber : 0},
    UI : {InvPage : 0, CraftPage : 0},
    move : {canMove : true, intervalID : "n"}
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
        // {world.time.hour , world.time.minute, world.time.day}
        // how long is built: //counter of time}}
    }
}

//console.log(player.position.map)

setInterval(everythingTime, 12500)
//setInterval(everythingTime, 300) //for testing purposes when you need fast time

startGame(world.maps[player.position.map].map);