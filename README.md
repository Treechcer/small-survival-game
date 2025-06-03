# Small Survival Game / Grid Survival Game (HTML + JS)

This game is small survival grid based game, that runs in browser that is made with purely CSS, HTML and JS. The player moves in grid based layout (11x11, with nine maps, you can go other maps by going to the red squares) where he can chop bushes, mine stone, farm cactuses, mine iron ore, build farms, explore the maps. There are three biomes, the first and "main" is `plains` biome, it has bushes, grass, water and stone. Second biome is `desert` biome where is sand, cactuses, small ammout of water and stone. Third home is `hills`, it has iron ore,b bushes, stone ground and plenty of stone to mine.

# Functions

- grid based movement, where player uses the "console" at the bottom or `w`, `a`, `s`, `d` (or arrow keys) - for now you can't mine and do other actions with keyboard 
- interaction with environment
  - chop bushes
  - mine stone, iron ore 
  - break cactuses
  - build farms to farm wheat, build furnaces to cook
- randomly generated world
  - 9 maps, in 3x3 where you can travel between them
  - all maps are randomly generated with random terrain and random biomes (there're always 3 biomes of each)
  - resources have chance to respawn on random map every 12.5s (1-5 resources)
- dynamic day / night cycle
  - background changes with time of the day
  - every 12.5 seconds is 30 minutes in-game (which makes the whole day last 10 minutes)
- dynamic weather system
  - every few hours there's chance to change the weather, you always start with `sunny` weather
  - there's also `rainy` weather, which makes farms grow faster
  - each weather lasts for random amount of time (6-42 in-game hours)

# Game World

- The whole map consists of 9 smaller maps connected with exits to the other maps
- player spawn on random tile in random map
- all maps have exits to other maps (dynamically generated so they have different amount of exits) - exit => red square 

# How to Play

You spawn in a random biome, in a random map on a random square.

Use the movement keys to explore (bottom middle square) or `w`,  `a`, `s`, `d` or arrow keys on your keyboard, as you move, you’ll notice emojis appearing in the console (console = bottom middle square with arrow keys etc.). These represent available actions for you now, they're based on which square you stand on and what it represents (and sometimes with items you have). Click them to interact with the world (the effect depends on the action).

Start by breaking some bushes (the darker green squares in the `plains` biome) and collecting stone (dark gray squares in most biomes). Once you collect enough materials, you can build a `farm`. Farms can be placed on grass or other default ground tiles. Right now, farms don’t do anything useful, because you can craft bread only (they isn't hunger for now).

For some special things you want to craft you need `furnace`, furnace can be place on any default tiles and you can use them if you stand on the square of the furnace (you `always need coal` to craft in them)

With enough materials, you can also craft tools in crafting UI (bottom left):
- **Fishing rod** : lets you fish in water squares.
- **Axe**: allows you to break cactuses in `desert` biome.
- **Pickaxe**: lets you mine iron ores in `hill` biome.

Other than that, there’s not much more, most likely everything you can do now.

# Future plans

- adding hunger / health
- ending to the game
- more tools
- ending, score or similar
- maybe make island bigger and have the it as real island, that the outer parts would be ocean and beach

# Running the game

Getting Started
To run the project locally:

1. Clone the repository

```bash
git clone https://github.com/Treechcer/small-survival-game
cd small-survival-game
```

2. Open the game
   You can open the index.html file directly in your browser:

```bash
start index.html     # On Windows
# or
open index.html      # On macOS
# or
xdg-open index.html  # On Linux
```

Or, you can use local server (tbh I have no idea how, you have to figure that out for yourself) - or use visual studio code extension for it, `live server`, `live preview` (could work) or `Preview on Web Server`

Last alternative, you can use [Github pages](https://treechcer.github.io/small-survival-game/)

🛠️ Requirements

- Modern browser (Chrome, Firefox, Edge, etc.)
- No external libraries required