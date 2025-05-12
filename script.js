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
    game.innerHTML += '<div style="display:flex;"> \
    <div id="top-left" class="gameS" style="height:50px; width:50px; background-color:gray;"><p> </p></div> \
    <div id="top-mid" class="gameS" style="height:50px; width:50px; background-color:lightgray;"><p onclick="move(0,-1)">↑</p></div> \
    <div id="top-right" class="gameS" style="height:50px; width:50px; background-color:gray;"><p> </p></div> \
</div>';
    game.innerHTML += '<div style="display:flex;"> \
    <div id="mid-left" class="gameS" style="height:50px; width:50px; background-color:lightgray;"><p onclick="move(-1,0)">←</p></div> \
    <div id="mid-mid" class="gameS" style="height:50px; width:50px; background-color:gray;"><p>≡</p></div> \
    <div id="mid-right" class="gameS" style="height:50px; width:50px; background-color:lightgray;"><p onclick="move(1,0)">→</p></div> \
</div>';
    game.innerHTML += '<div style="display:flex;"> \
    <div id="bot-left"class="gameS" style="height:50px; width:50px; background-color:gray;"> <p> </p> </div> \
    <div id="bot-mid"class="gameS" style="height:50px; width:50px; background-color:lightgray;"><p onclick="move(0,1)">↓</p></div> \
    <div id="bot-right"class="gameS" style="height:50px; width:50px; background-color:gray;"> <p> </p> </div> \
</div>';
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

function move(x, y){
    player.position.x += x;
    player.position.y += y;
    startGame(world.map);
}

function everythingTime(){
    world.time.minute += 30;
    
    world.time.minute == 60 ? (()=>{world.time.hour++;
    world.time.minute = 0})() : null;
    
    world.time.hour == 24 ? (world.time.hour = 0, world.time.day++) : null;
    
    document.getElementById("time").innerHTML = `${world.time.hour} : ${world.time.minute}`
}

var player = {
    position : {x : 0, y : 2}
}

var world = {
    map : generateMap(),
    time : {day : 0, hour : 12, minute : 0}
}

setInterval(everythingTime, 1000)

startGame(world.map);