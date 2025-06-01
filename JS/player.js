import { world, mapBiomes, biomeCheck, redrawBoard, changeBlock, test } from "./world.js"
import { buttoTest } from "./UI.js";

export var player = {
    position : {x : Math.floor(Math.random()*10), y : Math.floor(Math.random()*10), map : "map" + Math.floor(Math.random() * 9 + 1)},
    inventory : {leafes : 0, sticks : 0, stone : 0, pebble : 0, berries : 0, wheat : 0, bread : 0, watter : 0, fiber : 0, 
        smallFish : 0, bigFish : 0, coal : 0, bucket : 0, cookedFish : 0, cookedBigFish : 0, iron : 0, ironBar : 0,
        cactus : 0,
    },
    
    // FISHes are not yet added into inventory

    UI : {InvPage : 0, CraftPage : "page0"},
    move : {canMove : true, intervalID : "n"},
    tools : {fishingRod : {uses : 0}, pickaxe : {uses : 0}, axe : {uses : 0}} //here are added tools as "inventory" and their usage and other metadata needed
}

export function build(building){
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
    else if (building == "delFarm"){
        var biomeNow = biomeCheck(mapBiomes[player.position.map])

        world.maps[player.position.map].map[player.position.y][player.position.x] = biomeNow[3].type;
        player.inventory.sticks += 2;
        player.inventory.leafes += 3;
    }
    else if (building == "delFurnace"){
        var biomeNow = biomeCheck(mapBiomes[player.position.map])

        world.maps[player.position.map].map[player.position.y][player.position.x] = biomeNow[3].type;
            player.inventory.stone += 3;
        player.inventory.leafes += 2;
        player.inventory.sticks += 3;
    }
    else if (building == "furnace" && (player.inventory.stone >= 5 && player.inventory.leafes >= 5 && player.inventory.sticks >= 6)){
        world.maps[player.position.map].map[player.position.y][player.position.x] = "furnace";
        world.furnaces["furnace" + world.furnaces.increasingNum] = {
            position : {
                x : player.position.x, 
                y : player.position.y, 
                map : player.position.map
            }
        }
        
        world.furnaces.increasingNum++;
        player.inventory.stone -= 5;
        player.inventory.leafes -= 5;
        player.inventory.sticks -= 6;
    }

    buttoTest();
}

export function move(x, y){

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

export function chop(action){
    if (world.maps[player.position.map].map[player.position.y][player.position.x] == "bush" && action == "bush"){
        var biomeNow = biomeCheck(mapBiomes[player.position.map])
        world.maps[player.position.map].map[player.position.y][player.position.x] = biomeNow[3].type;
        player.inventory.sticks += Math.floor(Math.random() * 2) + 2;
        player.inventory.leafes += Math.floor(Math.random() * 3) + 4;
        player.inventory.fiber += Math.floor(Math.random() * 2) + 1;
        //startGame(world.maps[player.position.map].map);
        changeBlock({x : player.position.x, y : player.position.y});
        buttoTest();
    }
    else if (world.maps[player.position.map].map[player.position.y][player.position.x] == "stone" && action == "stone"){
        var biomeNow = biomeCheck(mapBiomes[player.position.map])
        world.maps[player.position.map].map[player.position.y][player.position.x] = biomeNow[3].type;
        player.inventory.stone += Math.floor(Math.random() * 2) + 1;
        player.inventory.pebble += Math.floor(Math.random() * 2) + 3;
        //startGame(world.maps[player.position.map].map);
        changeBlock({x : player.position.x, y : player.position.y});
        buttoTest();
    }
    else if (world.maps[player.position.map].map[player.position.y][player.position.x] == "finishedFarm" && action == "finishedFarm"){
        world.maps[player.position.map].map[player.position.y][player.position.x] = "farm";
        player.inventory.wheat += Math.ceil(Math.random() * 5) + 2;
        //startGame(world.maps[player.position.map].map);

        for (let farm in world.farms){
            if (farm == "increasingNum"){
                continue;
            }

            if ((world.farms[farm].pos.posX == player.position.x) && (world.farms[farm].pos.posY == player.position.y) && (world.farms[farm].pos.map == player.position.map)){
                world.farms[farm].phase = 2;
            }

            //console.log(world.farms[farm])
        }

        changeBlock({x : player.position.x, y : player.position.y});
        buttoTest();
    }
    else if (world.maps[player.position.map].map[player.position.y][player.position.x] == "water" && player.tools.fishingRod.uses > 0 && action == "fishing"){
        player.tools.fishingRod.uses--;
        var rand = Math.random();
        if (rand > 0.8){
            player.inventory.bigFish++
        }
        else if(rand > 0.3){
            player.inventory.smallFish += Math.ceil(Math.random() * 4)
        }

        /*
        console.log("FISHING!!!!");
        console.log(player.inventory);
        */
    }
    else if (world.maps[player.position.map].map[player.position.y][player.position.x] == "water" && player.inventory.bucket >= 1 && action == "waterGather"){
        player.inventory.bucket--;
        player.inventory.watter++;
    }
    else if (world.maps[player.position.map].map[player.position.y][player.position.x] == "farm" && player.inventory.watter >= 1 && action == "watering"){
        player.inventory.watter--;
        for (let farms in world.farms){
            if (farms == "increasingNum"){
                continue
            }
            //console.log(world.farms[farms].pos)

            //console.log(world.maps[world.farms[farms].pos.map].map[world.farms[farms].pos.posY][world.farms[farms].pos.posX])

            if ((world.farms[farms].pos.map == player.position.map) && (world.farms[farms].pos.posX == player.position.x) && world.farms[farms].pos.y == player.position.y){
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
    else if (world.maps[player.position.map].map[player.position.y][player.position.x] == "ironOre" && player.tools.pickaxe.uses > 0 && action == "iron"){
        player.tools.pickaxe.uses--;
        player.inventory.iron += Math.ceil(Math.random() * 3) + 1;
        var biomeNow = biomeCheck(mapBiomes[player.position.map])
        world.maps[player.position.map].map[player.position.y][player.position.x] = biomeNow[3].type;
    }
    else if (world.maps[player.position.map].map[player.position.y][player.position.x] == "cactus" && player.tools.axe.uses > 0 && action == "cactus"){
        player.tools.axe.uses--;
        player.inventory.watter += Math.ceil(Math.random() * 2) - 1;
        player.inventory.cactus += Math.ceil(Math.random() * 3) + 1;
        var biomeNow = biomeCheck(mapBiomes[player.position.map])
        world.maps[player.position.map].map[player.position.y][player.position.x] = biomeNow[3].type;
    }

    //console.log(player.inventory);

    buttoTest()
}