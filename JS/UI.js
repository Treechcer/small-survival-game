import { player, build, chop, move } from "./player.js"
import { world } from "./world.js"
import { changePageCrafting, makeCraftring, craftThing } from "./crafting.js";
import { makeInventory, changePage } from "./inventory.js";

window.chop = chop;
window.move = move;
window.build = build;
window.craftThing = craftThing;
window.changePage = changePage;
window.changePageCrafting = changePageCrafting

export function buttoTest(){
    var bonusButtons = {mine: {}, build: {}, tools: {}, items: {}};
    //console.log(player.position, map[player.position.y][player.position.x])
    var p0 = `<button style="cursor:default"> </button>`;
    var p1 = p0;
    var p2 = p0;
    var p3 = p0;

    var truthTable = [false, false, false, false]

    if (world.maps[player.position.map].map[player.position.y][player.position.x] == "bush"){
        bonusButtons.mine = {action: 'onclick="chop(`bush`)"', buttonIcon : "🌲"}
        p0 = `<button ${bonusButtons.mine.action}> ${bonusButtons.mine.buttonIcon} </button>`
        truthTable[0] = true;
    }
    else if (world.maps[player.position.map].map[player.position.y][player.position.x] == "stone"){
        bonusButtons.mine = {action: 'onclick="chop(`stone`)"', buttonIcon : "🪨"}
        p0 = `<button ${bonusButtons.mine.action}> ${bonusButtons.mine.buttonIcon} </button>`
        truthTable[0] = true;
    }
    else if (world.maps[player.position.map].map[player.position.y][player.position.x] == "finishedFarm"){
        bonusButtons.mine = {action: 'onclick="chop(`finishedFarm`)"', buttonIcon : "🌾"}
        p0 = `<button ${bonusButtons.mine.action}> ${bonusButtons.mine.buttonIcon} </button>`
        truthTable[0] = true;
    }
    
    if ((world.maps[player.position.map].map[player.position.y][player.position.x] == "") && (player.inventory.sticks >= 3 && player.inventory.leafes >= 5)){
        bonusButtons.build = {action: `onclick="build('farm')"`, buttonIcon : "🏠"}
        p1 = `<button ${bonusButtons.build.action}> ${bonusButtons.build.buttonIcon} </button>`
        truthTable[1] = true;
    }
    else if (world.maps[player.position.map].map[player.position.y][player.position.x] == "farm"){
        bonusButtons.build = {action: `onclick="build('delFarm')"`, buttonIcon : "❌"}
        p1 = `<button ${bonusButtons.build.action}> ${bonusButtons.build.buttonIcon} </button>`
        truthTable[1] = true;
    }

    if (world.maps[player.position.map].map[player.position.y][player.position.x] == "water" && player.tools.fishingRod.uses > 0){
        bonusButtons.tools = {action: 'onclick="chop(`fishing`)"', buttonIcon : "🐟"}
        p2 = `<button ${bonusButtons.tools.action}> ${bonusButtons.tools.buttonIcon} </button>`
        truthTable[2] = true;
    }
    if ((world.maps[player.position.map].map[player.position.y][player.position.x] == "") && (player.inventory.stone >= 5 && player.inventory.leafes >= 5 && player.inventory.sticks >= 6)){
        bonusButtons.build = {action: `onclick="build('furnace')"`, buttonIcon : "🔥"}
        p2 = `<button ${bonusButtons.build.action}> ${bonusButtons.build.buttonIcon} </button>`
        truthTable[2] = true;
    }
    else if (world.maps[player.position.map].map[player.position.y][player.position.x] == "furnace"){
        bonusButtons.build = {action: `onclick="build('delFurnace')"`, buttonIcon : "❌"}
        p2 = `<button ${bonusButtons.build.action}> ${bonusButtons.build.buttonIcon} </button>`
        truthTable[1] = true;
    }

    if (world.maps[player.position.map].map[player.position.y][player.position.x] == "water" && player.inventory.bucket >= 1){
        bonusButtons.items = {action: 'onclick="chop(`waterGather`)"', buttonIcon : "🔵"}
        p3 = `<button ${bonusButtons.items.action}> ${bonusButtons.items.buttonIcon} </button>`
        truthTable[3] = true;
    }
    else if (world.maps[player.position.map].map[player.position.y][player.position.x] == "farm" && player.inventory.watter >= 1){
        bonusButtons.items = {action: 'onclick="chop(`watering`)"', buttonIcon : "💧"}
        p3 = `<button ${bonusButtons.items.action}> ${bonusButtons.items.buttonIcon} </button>`
        truthTable[3] = true;
    }
    else if (world.maps[player.position.map].map[player.position.y][player.position.x] == "ironOre" && player.tools.pickaxe.uses > 0){
        bonusButtons.tools = {action: 'onclick="chop(`iron`)"', buttonIcon : "⛏️"}
        p2 = `<button ${bonusButtons.tools.action}> ${bonusButtons.tools.buttonIcon} </button>`
        truthTable[3] = true;
    }
    else if (world.maps[player.position.map].map[player.position.y][player.position.x] == "cactus" && player.tools.axe.uses > 0){
        bonusButtons.tools = {action: 'onclick="chop(`cactus`)"', buttonIcon : "🪓"}
        p2 = `<button ${bonusButtons.tools.action}> ${bonusButtons.tools.buttonIcon} </button>`
        truthTable[3] = true;
    }

    var inventory = makeInventory();
    var crafting = makeCraftring();

    var button = document.getElementById("butts");
    button.innerHTML = "";

    button.innerHTML = `
  <div style="display: flex; gap: 1vw; margin-top: 1vw">
    <div style=" border: clamp(3px, 0.4vw, 5px) solid black; border-radius: 10px; display:flex; padding:1vw; box-shadow: 2px 3px 5px black; background-color:#bfbfbf">
        ${crafting.first}
        ${crafting.second}
        ${crafting.third}
    </div>
    <div style="display: flex; flex-direction: column; border: clamp(3px, 0.4vw, 5px) solid black; border-radius: 10px; padding:1vw; box-shadow: 2px 3px 5px black; background-color:#bfbfbf">
      <div style="display: flex;">
        <div id="top-left" class="gameS inv" style="background-color:gray;">${p0}</div>
        <div id="top-mid" class="gameS inv" style="background-color:lightgray;">
            <button onclick="move(0,-1)">↑</button>
        </div>
        <div id="top-right" class="gameS inv" style="background-color:gray;">${p1}</div>
      </div>
      <div style="display: flex;">
        <div id="mid-left" class="gameS inv" style="background-color:lightgray;">
          <button onclick="move(-1,0)">←</button>
        </div>
        <div id="mid-mid" class="gameS inv" style="background-color:gray;">
          <button onclick="openMenu()">≡</button>
        </div>
        <div id="mid-right" class="gameS inv" style="background-color:lightgray;">
          <button onclick="move(1,0)">→</button>
        </div>
      </div>
      <div style="display: flex;">
        <div id="bot-left" class="gameS inv" style="background-color:gray;">${p2}</div>
        <div id="bot-mid" class="gameS inv" style="background-color:lightgray;">
          <button onclick="move(0,1)">↓</button>
        </div>
        <div id="bot-right" class="gameS inv" style="background-color:gray;">${p3}</div>
      </div>
    </div>

    <div style=" border: clamp(3px, 0.4vw, 5px) solid black; border-radius: 10px; display:flex; padding:1vw; box-shadow: 2px 3px 5px black; background-color:#bfbfbf">
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