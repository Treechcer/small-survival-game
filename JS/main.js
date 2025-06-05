import { player, move, makePlayer } from "./player.js"
import { world, test, makeWorld, redrawBoard} from "./world.js"
import { everythingTime } from "./time.js"
import { buttoTest } from "./UI.js";

function startGame(map) {
    const game = document.getElementById("game");
    game.innerHTML = "";
    var line = `<div id="gameWrap"> <p id="time"> day: ${world.time.day}, ${world.time.hour}:${world.time.minute}0, score: ${player.score}, ${world.weather.emoji}</p> <div id="hud"><div id="hp"><div id="bg"></div></div></div>`;
    for (let y = 0; y < map.length; y++) {
        line += `<div class="mainG">`;
        for (let i = 0; i < map[y].length; i++) {
            var color = test(i, y);
            line += `<div> <div class="gameS" style="background-color:${color}" id="${i}${y}"> </div> </div>`;
        }
        line += "</div>";
    }

    line += `<div id="hud2"><div id="hunger"><div id="hungerFill"></div></div></div>`;
    line += '</div>';

    game.innerHTML = line;
    game.innerHTML += '<div id="butts"> </div>';

    buttoTest();
}

document.addEventListener('keydown', function (event) {
    if (event.key == "w" || event.key == "ArrowUp") {
        move(0, -1);
    }
    else if (event.key == "s" || event.key == "ArrowDown") {
        move(0, 1);
    }
    else if (event.key == "a" || event.key == "ArrowLeft") {
        move(-1, 0);
    }
    else if (event.key == "d" || event.key == "ArrowRight") {
        move(1, 0);
    }
});

export function gameReset(){
    makePlayer();
    makeWorld();
    document.getElementById("bg").style.height = (player.health * 20) + "%";
    redrawBoard();
}

//console.log(player.position.map)

setInterval(everythingTime, 12500)
//setInterval(everythingTime, 300) //for testing purposes when you need fast time

startGame(world.maps[player.position.map].map);

//console.log(mapBiomes)