import { player, move } from "./player.js"
import { world, test, redrawBoard } from "./world.js"
import { everythingTime } from "./time.js"
import { buttoTest } from "./UI.js";

function startGame(map) {
    const game = document.getElementById("game");
    game.innerHTML = "";
    var line = `<div id="gameWrap"> <p id="time"> day: ${world.time.day}, ${world.time.hour}:${world.time.minute}0, ${world.weather.emoji}</p> <div id="hud"><div id="hp"><div id="bg"></div></div></div>`;
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

//console.log(player.position.map)

setInterval(everythingTime, 12500)
//setInterval(everythingTime, 300) //for testing purposes when you need fast time

startGame(world.maps[player.position.map].map);

//console.log(mapBiomes)

//TODO: add that correct things respawn in correct biomes - Check, finished probably??? maybe working idk
//TODO: add destroying farms (for like 80% of what they cost or something like that) - Check, it should work
//TODO: add furnaces, cooking food - Check, working (most likely)
//TODO: add hunger and health to maintain and not die
//TODO: make iron and cactuses breakable
//TODO: make biomes spawn at least once - check (they all spawn 3 times)
//TODO: make the map 4x4 and add biome or something for like ocean to make it as island
//TODO: add more type of tools
//TODO: add score or ending, goal or something liek that
//TODO: make some comments in the code and make it readable

//all things I want to do, not in order... I'll add more and delete those I did


//TODO : Fix dying? Fix that you don't take hunger down the first hour or it doesn't change? idk just fix it and add death and game reset. Fix all and any bugs while on it