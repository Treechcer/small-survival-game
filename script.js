function startGame(map){
    const game = document.getElementById("game");
    game.innerHTML = "";
    var line = `<div id="gameWrap"> <p id="time"> day: ${world.time.day}, ${world.time.hour}:${world.time.minute}0, ${world.weather.emoji}</p>`;

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
    var bonusButtons = {mine: {}, build: {}, tools: {}, items: {}};
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

    if (world.maps[player.position.map].map[player.position.y][player.position.x] == "water" && player.tools.fishingRod.uses > 0){
        bonusButtons.tools = {action: 'onclick="chop()"', buttonIcon : "🐟"}
        p2 = `<button ${bonusButtons.tools.action}> ${bonusButtons.tools.buttonIcon} </button>`
        truthTable[2] = true;
    }

    if (world.maps[player.position.map].map[player.position.y][player.position.x] == "water" && player.inventory.bucket >= 1){
        bonusButtons.items = {action: 'onclick="chop()"', buttonIcon : "🔵"}
        p3 = `<button ${bonusButtons.items.action}> ${bonusButtons.items.buttonIcon} </button>`
        truthTable[3] = true;
    }
    else if (world.maps[player.position.map].map[player.position.y][player.position.x] == "farm" && player.inventory.watter >= 1){
        bonusButtons.items = {action: 'onclick="chop()"', buttonIcon : "💧"}
        p3 = `<button ${bonusButtons.items.action}> ${bonusButtons.items.buttonIcon} </button>`
        truthTable[3] = true;
    }

    var inventory = makeInventory();
    var crafting = makeCraftring();

    var button = document.getElementById("butts");
    button.innerHTML = "";

    button.innerHTML = `
  <div style="display: flex; gap: 2vw; margin-top: 2vw">
    <div style=" border: 0.5vw solid black; border-radius: 10px; display:flex; padding:1vw; box-shadow: 2px 3px 5px black; background-color:#bfbfbf">
        ${crafting.first}
        ${crafting.second}
        ${crafting.third}
    </div>
    <div style="display: flex; flex-direction: column; border: 3px solid black; border-radius: 10px; padding:1vw; box-shadow: 2px 3px 5px black; background-color:#bfbfbf";>
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
        <div id="mid-mid" class="gameS inv" style="-color:gray;">
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

    <div style=" border: 3px solid black; border-radius: 10px; display:flex; padding:1vw; box-shadow: 2px 3px 5px black; background-color:#bfbfbf">
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
        player.UI.InvPage--;
    }
    else if (isRight){
        player.UI.InvPage++;
    }

    buttoTest();
}

function changePageCrafting(isRight){
    if (!isRight){
        player.UI.CraftPage = "page" + --player.UI.CraftPage[player.UI.CraftPage.length-1];
    }
    else if (isRight){
        player.UI.CraftPage = "page" + ++player.UI.CraftPage[player.UI.CraftPage.length-1];
    }

    buttoTest();
}

function craftControl(page){

    // TODO need to fix it maybe? Idk if it works correctly and I'm lazy and tired now so gn :3

    var craftableThings = [];

    for (let obj in page){
        var isCraftable = true;
        for (let material in page[obj]){
            if (material == "emoji" || material == "uses" || material == "type"){
                continue;
            }
            console.log(material);
            console.log(material, page[obj][material]);

            if (!(page[obj][material] <= player.inventory[material])){
                console.log(page[obj][material], player.inventory[material])
                isCraftable = false;
                break
            }

            //console.log(crafting[obj][material] <= player.inventory[material])
            console.log(page[obj][material], player.inventory[material])
        }
        
        craftableThings.push({[`${obj}`]: page[obj], emoji : crafting[player.UI.CraftPage][obj].emoji, isCraftable : isCraftable, name : obj});
    }

    console.log(craftableThings);

    return craftableThings;
}

function makeCraftring(){    
    //TODO: Make this actually work and not just inventroy 2 lmao

    /*
    PAGES IDEA

    page0 : pickaxe, axe, fishing rod ... - all upgradable 

    page1 : fiber - no idea how to craft it for now, bread - wheat + watter + ???, bucket - for watter gathering, ...

    page2 : coal or some kind of thing to burn in furnace to cook bread + fishes ...
    
    */

    //checking for valid crafting recipes

    var craftable = craftControl(crafting[player.UI.CraftPage]);

    //console.log(craftable);

    var page = [];
    var on = {button1: {class: "", HTMLatribute : "", func : "changePageCrafting(false)"}, button2 : {class: "", HTMLatribute : "", func : "changePageCrafting(true)"}}

    crafting.activeRecipes = craftable;

    if (player.UI.CraftPage == "page0"){
        /*
        console.log(craftable)
        console.log(craftable[0])
        console.log(craftable[0].fishingRod)
        */
        for (let i = 0; i < 3; i ++){
            craftable[i].isCraftable ? page[i] = `<button onclick="craftThing(crafting.activeRecipes[${i}])"> ${craftable[i].emoji} </button>` : page[i] = ``;
        }
        page[3] = ``
        page[4] = ``
        page[5] = ``
        page[6] = ``

        // This code acces objects from Array "craftable", because I've made from 0-6 
        //Fun fact: it's bad code and you NEED to make pages that exist, because if you don't make them at least equal "" it'll show undefined

        on.button1.HTMLatribute = "disabled";
        on.button1.class = "dis";

        on.button2.HTMLatribute = "";
        on.button2.class = "button";
    }
    else if (player.UI.CraftPage == "page1"){

        for (let i = 0; i < 3; i ++){
            craftable[i].isCraftable ? page[i] = `<button onclick="craftThing(crafting.activeRecipes[${i}])"> ${craftable[i].emoji} </button>` : page[i] = ``;
        }
        page[3] = ``
        page[4] = ``
        page[5] = ``
        page[6] = ``

        on.button2.HTMLatribute = "disabled";
        on.button2.class = "dis";

        on.button1.HTMLatribute = "";
        on.button1.class = "button";
    }

        var craft = {
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

    return craft;
}

function craftThing(thing){
    console.log(thing);
    //console.log(thing[thing.name])
    //console.log(player.inventory)

    for (key in thing[thing.name]){
        if (key == "emoji" || key == "name" || key == "type" || key == "uses"){
            continue
        }
        player.inventory[key] -= thing[thing.name][key];
        console.log(player.inventory[key], thing[thing.name][key], key, thing[thing.name])

    }

    if (thing[thing.name].type == "tool"){
        player.tools[thing.name].uses = thing[thing.name].uses
        //console.log("something")
    }
    else if (thing[thing.name].type == "inventory"){
        player.inventory[thing.name]++;
    }

    //console.log(player.inventory)

    buttoTest();
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
        page[2] = `🍤: ${player.inventory.smallFish}`
        page[3] = `🐟: ${player.inventory.bigFish}`
        page[4] = `⚫: ${player.inventory.coal}`
        page[5] = `🪣: ${player.inventory.bucket}`
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
        player.inventory.fiber += Math.floor(Math.random() * 2);
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
    else if (world.maps[player.position.map].map[player.position.y][player.position.x] == "water" && player.tools.fishingRod.uses > 0){
        player.tools.fishingRod.uses--;
        var rand = Math.random();
        if (rand > 0.8){
            player.inventory.bigFish++
        }
        else if(rand > 0.5){
            player.inventory.smallFish += Math.ceil(Math.random() * 4)
        }

        /*
        console.log("FISHING!!!!");
        console.log(player.inventory);
        */
    }
    else if (world.maps[player.position.map].map[player.position.y][player.position.x] == "water" && player.inventory.bucket >= 1){
        player.inventory.bucket--;
        player.inventory.watter++;
    }
    else if (world.maps[player.position.map].map[player.position.y][player.position.x] == "farm" && player.inventory.watter >= 1){
        player.inventory.watter--;
        for (farms in world.farms){
            if (farms == "increasingNum"){
                continue
            }
            //console.log(world.farms[farms].pos)

            //console.log(world.maps[world.farms[farms].pos.map].map[world.farms[farms].pos.posY][world.farms[farms].pos.posX])

            if ((world.farms[farms].pos.map == player.position.map) && (world.farms[farms].pos.posX == player.position.x) && world.farms[farms].pos.y == player.position.posY){
                world.farms[farms].phase++
                if (world.farms[farms].phase == 5){
                    //console.log("a")
                    //console.log(world.maps[world.farms[farms].pos.map].map[world.farms[farms].pos.posY][world.farms[farms].pos.posX])
                    
                    world.maps[world.farms[farms].pos.map].map[world.farms[farms].pos.posY][world.farms[farms].pos.posX] = "finishedFarm"
                    
                    //console.log(world.maps[world.farms[farms].pos.map].map[world.farms[farms].pos.posY][world.farms[farms].pos.posX])

                    changeBlock({x: world.farms[farms].pos.posX, y : world.farms[farms].pos.posY})
                }
            }
        }
    }

    //console.log(player.inventory);

    buttoTest()
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

    var b = "";

    world.time.minute == 0 ? b = "0" : b = ""; 

    document.getElementById("time").textContent = "day: " + world.time.day + ", " + world.time.hour + ":" + world.time.minute + b + ", " + world.weather.emoji;

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

    var map = "map" + (Math.floor(Math.random() * 9) + 1);

    console.log(map)

    if (world.maps[map].map[num1][num2] == ""){
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
    else if (event.key == "a" || event.key == "ArrowLeft"){
        move(-1,0);
    }
    else if (event.key == "d" || event.key == "ArrowRight"){
        move(1,0);
    }
});

var crafting = {
    page0 : { //not yet upgradable... Will see how I'll make it upgradable tho I have no idea how.. Maybe updating the object
              //like "crafting.page0.axe.sticks += 10" or something? But how will I add more materials??? Maybe I'll need to start
              //with "ghost" materials - starting at 0? || maybe updateing the whole object? That would be kinda brute force, woulnd't it?
              //like "crafting.page0.axe = {sticks : 25, ironBar : 25, fiber : 10}" or something, but that seems like harder way? idk we'll see
              
              //this crazy ramble is like 80% of all comments xD kinda sad ngl

        fishingRod : {emoji : "🎣", sticks : 20, fiber : 15, uses : 5, type : "tool"}, //test crafting recipe
        pickaxe : {emoji : "⛏️", sticks : 25, stone : 15, pebble : 25, uses : 5, type : "tool"},
        axe : {emoji : "🪓", sticks : 20, stone : 10, pebble : 25, leafes : 10, uses : 5, type : "tool"}
    },

    page1 : {
        bread : {emoji : "🍞", wheat : 10, watter : 10, type : "inventory"},
        bucket : {emoji : "🪣", sticks : 20, type : "inventory"},
        coal : {emoji : "⚫", sticks : 10, type : "inventory"}
    },

    page2 : { //unfinished
        
    },
    
    activeRecipes : []
}

var player = {
    position : {x : Math.floor(Math.random()*10), y : Math.floor(Math.random()*10), map : "map" + Math.floor(Math.random() * 9 + 1)},
    inventory : {leafes : 10, sticks : 10, stone : 10, pebble : 10, berries : 0, wheat : 0, bread : 0, watter : 10, fiber : 0, 
        smallFish : 0, bigFish : 0, coal : 0, bucket : 0,},
    
    // FISHes are not yet added into inventory

    UI : {InvPage : 0, CraftPage : "page0"},
    move : {canMove : true, intervalID : "n"},
    tools : {fishingRod : {uses : 0}, pickaxe : {uses : 0}, axe : {uses : 0}} //here are added tools as "inventory" and their usage and other metadata needed
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
    },
    weather : {
        currentWeather : "Sunny",
        emoji : "☀️",
        nextWeatherChanceTimeHours : 6
    }
}

//console.log(player.position.map)

setInterval(everythingTime, 12500)
//setInterval(everythingTime, 300) //for testing purposes when you need fast time

startGame(world.maps[player.position.map].map);