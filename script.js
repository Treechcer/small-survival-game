function startGame(map){
    const game = document.getElementById("game");

    for (let y = 0; y < 10; y++){
        var color;
        var line = '<div class="mainG">';
        for (let i = 0; i < 10; i++){
            if (player.position.x == y && player.position.x == i){
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
    <div id="top-mid" class="gameS" style="height:50px; width:50px; background-color:lightgray;"><p>↑</p></div> \
    <div id="top-right" class="gameS" style="height:50px; width:50px; background-color:gray;"><p> </p></div> \
</div>';
    game.innerHTML += '<div style="display:flex;"> \
    <div id="mid-left" class="gameS" style="height:50px; width:50px; background-color:lightgray;"><p>←</p></div> \
    <div id="mid-mid" class="gameS" style="height:50px; width:50px; background-color:gray;"><p>≡</p></div> \
    <div id="mid-right" class="gameS" style="height:50px; width:50px; background-color:lightgray;"><p>→</p></div> \
</div>';
    game.innerHTML += '<div style="display:flex;"> \
    <div id="bot-left"class="gameS" style="height:50px; width:50px; background-color:gray;"> <p> </p> </div> \
    <div id="bot-mid"class="gameS" style="height:50px; width:50px; background-color:lightgray;"><p>↓</></div> \
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

var player = {
    position : {x : 0, y : 0}
}

startGame(generateMap());