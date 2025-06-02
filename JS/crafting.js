import { player } from "./player.js"
import { world } from "./world.js"
import { buttoTest } from "./UI.js";

export function changePageCrafting(isRight) {
    if (!isRight) {
        player.UI.CraftPage = "page" + parseInt(player.UI.CraftPage[4] - 1);
    }
    else if (isRight) {
        player.UI.CraftPage = "page" + parseInt(player.UI.CraftPage[4] + 1);
    }

    buttoTest();
}

export function craftControl(page) {
    var craftableThings = [];

    for (let obj in page) {
        var isCraftable = true;
        for (let material in page[obj]) {

            if (material == "event") {
                if (world.maps[player.position.map].map[player.position.y][player.position.x] != "furnace" && page[material] == "furnace") {
                    isCraftable = false;
                    break
                }
                else {
                    continue
                }
            }

            if (material == "emoji" || material == "uses" || material == "type") {
                continue;
            }

            if (!(page[obj][material] <= player.inventory[material])) {
                //console.log(page[obj][material], player.inventory[material])
                isCraftable = false;
                break
            }

            //console.log(crafting[obj][material] <= player.inventory[material])
            //console.log(page[obj][material], player.inventory[material])
        }

        craftableThings.push({ [`${obj}`]: page[obj], emoji: crafting[player.UI.CraftPage][obj].emoji, isCraftable: isCraftable, name: obj });
    }

    //console.log(craftableThings);

    return craftableThings;
}

export function makeCraftring() {
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
    var on = { button1: { class: "", HTMLatribute: "", func: "changePageCrafting(false)" }, button2: { class: "", HTMLatribute: "", func: "changePageCrafting(true)" } }

    crafting.activeRecipes = craftable;

    if (player.UI.CraftPage == "page0") {
        /*
        console.log(craftable)
        console.log(craftable[0])
        console.log(craftable[0].fishingRod)
        */
        for (let i = 0; i < 3; i++) {
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
        window.crafting = crafting;
    }
    else if (player.UI.CraftPage == "page1") {

        for (let i = 0; i < 3; i++) {
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

export function craftThing(thing) {
    //console.log(thing);
    //console.log(thing[thing.name])
    //console.log(player.inventory)

    for (let key in thing[thing.name]) {
        if (key == "emoji" || key == "name" || key == "type" || key == "uses" || key == "event") {
            continue
        }
        player.inventory[key] -= thing[thing.name][key];
        //console.log(player.inventory[key], thing[thing.name][key], key, thing[thing.name])

    }

    if (thing[thing.name].type == "tool") {
        player.tools[thing.name].uses = thing[thing.name].uses
        //console.log("something")
    }
    else if (thing[thing.name].type == "inventory") {
        player.inventory[thing.name]++;
    }

    //console.log(player.inventory)

    buttoTest();
}

export var crafting = {
    page0: { //not yet upgradable... Will see how I'll make it upgradable tho I have no idea how.. Maybe updating the object
        //like "crafting.page0.axe.sticks += 10" or something? But how will I add more materials??? Maybe I'll need to start
        //with "ghost" materials - starting at 0? || maybe updateing the whole object? That would be kinda brute force, woulnd't it?
        //like "crafting.page0.axe = {sticks : 25, ironBar : 25, fiber : 10}" or something, but that seems like harder way? idk we'll see

        //this crazy ramble is like 80% of all comments xD kinda sad ngl

        fishingRod: { emoji: "🎣", sticks: 10, fiber: 6, uses: 10, type: "tool", event: "none" },
        pickaxe: { emoji: "⛏️", sticks: 10, stone: 8, pebble: 10, uses: 10, type: "tool", event: "none" },
        axe: { emoji: "🪓", sticks: 8, stone: 6, pebble: 10, leafes: 4, uses: 10, type: "tool", event: "none" }
    },

    page1: {
        bread: { emoji: "🍞", wheat: 3, watter: 2, type: "inventory", event: "furnace" },
        bucket: { emoji: "🪣", sticks: 8, pebble: 5, type: "inventory", event: "none" },
        coal: { emoji: "⚫", sticks: 5, type: "inventory", event: "furnace" },
        cookedFish: { emoji: "🍢", smallFish: 1, coal: 2, type: "inventory", event: "furnace" },
        cookedBigFish: { emoji: "🍲", bigFish: 2, coal: 3, type: "inventory", event: "furnace" },
        ironBar: { emoji: "🔩", coal: 3, iron: 3, type: "furnace" }
    },

    page2: { //unfinished

    },

    activeRecipes: []
}