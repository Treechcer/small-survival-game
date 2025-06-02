import { player } from "./player.js"
import { buttoTest } from "./UI.js";

export function makeInventory() {
    /*
    inspiration on how to make it, because I wrote similar code:

    <div id="top-left" class="gameS" style="height:50px; width:50px; background-color:gray;"> ${p0} </div> \
    <div id="top-mid" class="gameS button" style="height:50px; width:50px; background-color:lightgray;"><button onclick="move(0,-1,)">↑</button></div> \
    <div id="top-right" class="gameS" style="height:50px; width:50px; background-color:gray;">${p1}</div> \

    */
    var page = [];
    var on = { button1: { class: "", HTMLatribute: "", func: "changePage(false)" }, button2: { class: "", HTMLatribute: "", func: "changePage(true)" } }

    if (player.UI.InvPage == 0) {
        page[0] = `🪵 ${player.inventory.sticks}`
        page[1] = `🍃 ${player.inventory.leafes}`
        page[2] = `🪨 ${player.inventory.pebble}`
        page[3] = `💧 ${player.inventory.watter}`
        page[4] = `🧵 ${player.inventory.fiber}`
        page[5] = `⛰️ ${player.inventory.stone}`
        page[6] = `🫐 ${player.inventory.berries}`
        on.button1.HTMLatribute = "disabled";
        on.button1.class = "dis";

        on.button2.HTMLatribute = "";
        on.button2.class = "button";
    }
    else if (player.UI.InvPage == 1) {
        page[0] = `🍞 ${player.inventory.bread}`
        page[1] = `🌾 ${player.inventory.wheat}`
        page[2] = `🍤 ${player.inventory.smallFish}`
        page[3] = `🐟 ${player.inventory.bigFish}`
        page[4] = `⚫ ${player.inventory.coal}`
        page[5] = `🪣 ${player.inventory.bucket}`
        page[6] = `🧲 ${player.inventory.iron}`

        on.button1.HTMLatribute = "";
        on.button1.class = "button";

        on.button2.HTMLatribute = "";
        on.button2.class = "button";
    }
    else if (player.UI.InvPage == 2) {
        page[0] = `🎣 ${player.tools.fishingRod.uses}`
        page[1] = `🔩 ${player.inventory.ironBar}`
        page[2] = `⛏️ ${player.tools.pickaxe.uses}`
        page[3] = `🌵 ${player.inventory.cactus}`
        page[4] = ``
        page[5] = `🪓 ${player.tools.axe.uses}`
        page[6] = ``

        on.button2.HTMLatribute = "disabled";
        on.button2.class = "dis";

        on.button1.HTMLatribute = "";
        on.button1.class = "button";
    }


    var inv = {
        first: `<div style="display: flex; flex-direction: column;">
            <div class="inv" style="background-color:gray;"> <p> ${page[0]} </p> </div>
            <div class="inv ${on.button1.class}" style="background-color:gray;"> <button onclick="${on.button1.func}" class="${on.button1.class}" ${on.button1.HTMLatribute}> ← </button> </div>
            <div class="inv" style="background-color:gray;"> <p> ${page[1]} </p> </div>
    </div>`,
        second: `<div style="display: flex; flex-direction: column;">
            <div class="inv" style="background-color:gray;"> <p> ${page[2]} </p> </div>
            <div class="inv" style="background-color:gray;"> <p> ${page[3]} </p> </div>
            <div class="inv" style="background-color:gray;"> <p> ${page[4]} </p> </div>
    </div>`,
        third: `<div style="display: flex; flex-direction: column;">
            <div class="inv" style="background-color:gray; "> <p> ${page[5]} </p> </div>
            <div class="inv ${on.button2.class}" style="background-color:gray;"> <button onclick="${on.button2.func}" class="${on.button2.class}" ${on.button2.HTMLatribute}> → </button> </div>
            <div class="inv" style="background-color:gray;"> <p> ${page[6]} </p </div>
    </div>`
    };

    return inv;
}

export function changePage(isRight) {
    if (!isRight) {
        player.UI.InvPage--;
    }
    else if (isRight) {
        player.UI.InvPage++;
    }

    buttoTest();
}