function startGame(map){
    const game = document.getElementById("game");
    game.innerHTML = "";

    for (let y = 0; y < 10; y++){
        var color;
        var line = '<div class="mainG">';
        for (let i = 0; i < 10; i++){
            if (player.position.y == y && player.position.x == i){
                color = "orange";
            }
            else if (map[y][i] == "bush"){
                color = "green";
            }
            else if(map[y][i] == "water"){
                color = "DeepSkyBlue";
            }
            else{
                color = "lightgreen";
            }
            line += `<div> <div class="gameS" style="background-color:${color}"> </div> </div>`;
        }
        line += "</div>";

        game.innerHTML += line;   
    }

    var bonusButtons = {mine: {}, build: {}};
    //console.log(player.position, map[player.position.y][player.position.x])
    var p0 = `<p> </p>`
    var p1 = `<p> </p>`
    if (map[player.position.y][player.position.x] == "bush"){
        bonusButtons.mine = {action: 'onclick="chop()"', buttonIcon : "🌲"}
        p0 = `<p ${bonusButtons.mine.action}> ${bonusButtons.mine.buttonIcon} </p>`
    }
    else if (map[player.position.y][player.position.x] == ""){
        bonusButtons.build = {action: 'onclick="build()"', buttonIcon : "🏠"}
        p1 = `<p ${bonusButtons.build.action}> ${bonusButtons.build.buttonIcon} </p>`
    }

    game.innerHTML += `<div style="display:flex;"> \
    <div id="top-left" class="gameS" style="height:50px; width:50px; background-color:gray;"> ${p0} </div> \
    <div id="top-mid" class="gameS" style="height:50px; width:50px; background-color:lightgray;"><p onclick="move(0,-1)">↑</p></div> \
    <div id="top-right" class="gameS" style="height:50px; width:50px; background-color:gray;">${p1}</div> \
</div>`;
    game.innerHTML += `<div style="display:flex;"> \
    <div id="mid-left" class="gameS" style="height:50px; width:50px; background-color:lightgray;"><p onclick="move(-1,0)">←</p></div> \
    <div id="mid-mid" class="gameS" style="height:50px; width:50px; background-color:gray;"><p>≡</p></div> \
    <div id="mid-right" class="gameS" style="height:50px; width:50px; background-color:lightgray;"><p onclick="move(1,0)">→</p></div> \
</div>`;
    game.innerHTML += `<div style="display:flex;"> \
    <div id="bot-left"class="gameS" style="height:50px; width:50px; background-color:gray;"> <p> </p> </div> \
    <div id="bot-mid"class="gameS" style="height:50px; width:50px; background-color:lightgray;"><p onclick="move(0,1)">↓</p></div> \
    <div id="bot-right"class="gameS" style="height:50px; width:50px; background-color:gray;"> <p> </p> </div> \
</div>`;
}

function generateMap(){
    var map = [];
    for (let i = 0; i < 10; i++){
        let row = [];
        for (let j = 0; j < 10; j++){
            var element = Math.random()*2.5;
            var mapPart;
            if (element > 1.7){
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

    return map;
}

function build(){
    // TODO: make the building work, hopefully add more things? maybe upgrades? maybe other things? farms? 
}

function chop(){
    console.log(player.inventory);

    if (world.map[player.position.y][player.position.x] == "bush"){
        world.map[player.position.y][player.position.x] = "";
        player.inventory.sticks += Math.floor(Math.random() * 2) + 1;
        player.inventory.leaves += Math.floor(Math.random() * 3) + 2;
        startGame(world.map);
    }
}

function move(x, y){
    if (!(player.position.x + x <= -1 || player.position.x + x >= 10) && !(player.position.y + y <= -1 || player.position.y + y >= 10)){
        player.position.x += x;
        player.position.y += y;
        startGame(world.map);
    }
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
}

var player = {
    position : {x : Math.floor(Math.random()*10), y : Math.floor(Math.random()*10)},
    inventory : {leaves : 0, sticks : 0}
}

var world = {
    map : generateMap(),
    time : {day : 0, hour : 12, minute : 0},
}

setInterval(everythingTime, 12500)

startGame(world.map);