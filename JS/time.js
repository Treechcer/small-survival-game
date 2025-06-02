import { player } from "./player.js"
import { world, mapBiomes, biomeCheck, changeBlock } from "./world.js"

export function everythingTime() {
    world.time.minute += 30;

    world.time.minute == 60 ? (world.time.hour++, world.time.minute = 0, world.weather.nextWeatherChanceTimeHours--, world.weather.currentWeatherTime++) : null;

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

    //console.log(world.weather.nextWeatherChanceTimeHours);

    if (world.weather.nextWeatherChanceTimeHours == 0 || world.currentWeatherTime >= 24) {
        //console.log("t");
        var nextWeather = Math.ceil(Math.random() * 100)
        if (nextWeather > 95) {
            world.weather.currentWeather = "rain";
            world.weather.emoji = "⛈️";
            world.currentWeatherTime = 0;
        }
        else {
            world.weather.currentWeather = "Sunny";
            world.weather.emoji = "☀️";
            world.currentWeatherTime = 0;
        }

        world.weather.nextWeatherChanceTimeHours = Math.ceil(Math.random() * 36) + 6;
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

    for (let i = 0; i < many; i++) {
        respawn();
    }

    //farm checking and stuff

    for (let farm in world.farms) {
        if (farm != "increasingNum") {
            if (world.farms[farm].time.timer >= 5 && world.farms[farm].phase < 5) {
                world.farms[farm].phase++;
                world.farms[farm].time.timer = 0;
            }

            if ((world.farms[farm].time.timer >= 5 && world.farms[farm].phase < 5) && world.weather.currentWeather == "rain") {
                var chanceToGrow = Math.ceil(Math.random() * 100)

                if (chanceToGrow >= 80) {
                    world.farms[farm].phase++;
                }
            }

            if (world.farms[farm].phase >= 5) {
                world.maps[world.farms[farm].pos.map].map[world.farms[farm].pos.posY][world.farms[farm].pos.posX] = "finishedFarm";
                changeBlock({ x: world.farms[farm].pos.posX, y: world.farms[farm].pos.posY })
            }

            world.farms[farm].time.timer++;
        }
    }
}

export function respawn() {
    var map = "map" + (Math.floor(Math.random() * 9) + 1);
    var bio = biomeCheck(mapBiomes[map])
    var respawnable = [];

    for (let i = 0; i < bio.length; i++) {
        if (bio[i].type != "water" && bio[i].type != "sand" && bio[i].type != "rockyBottom" && bio[i].type != "") {
            respawnable.push(bio[i].type)
        }
    }

    var element = Math.floor(Math.random() * respawnable.length);
    var mapPart = respawnable[element];

    //console.log(mapPart)

    var num1 = Math.floor(Math.random() * 11);
    var num2 = Math.floor(Math.random() * 11);

    if (world.maps[map].map[num1][num2] == "" || world.maps[map].map[num1][num2] == "sand" || world.maps[map].map[num1][num2] == "rockyBottom") {
        world.maps[map].map[num1][num2] = mapPart;
        if (map == player.position.map) {
            changeBlock({ x: num2, y: num1 })
        }
    }
}