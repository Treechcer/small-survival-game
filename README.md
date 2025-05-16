# Small Survival Game / Grid Survival Game (HTML + JS)

This game is small survival grid based game, that runs in browser that is made with purely CSS, HTML and JS. The player moves in grid based layout (11x11, with nine maps) where he can chop bushes, build farms (they don't work for now), explore the maps.

# Functions

- grid based movement, where player uses the "console" at the bottom
- interaction with environment
  - chop bushes
  - build farms
- randomly generated world
  - 9 maps, in 3x3
  - all maps are randomly generated with random terrain (water, bushes and grass for now)
- dynamic day / night cycle
  - background changes with time of the day
  - every 12.5 seconds is 30 minutes in-game (which makes the whole day last 10 minutes)

# Game World

- The whole map consists of 9 smaller maps connected with exits to the other maps
- player spawn on random tile in map5 (maybe thing to change later?)
- all maps have exits to other maps (dynamically generated so they have different amount of exits)

# Future plans

- Crafting
- farming system (making the farms grow for real) and adding hunger / thirst
- inventory (UI) and crafting
- more type of blocks and actions

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

Or, you can use local server (tbh I have no idea how, you have to figure that out for yourself)

Last alternative, you can use [Github pages](https://treechcer.github.io/small-survival-game/)

🛠️ Requirements
- Modern browser (Chrome, Firefox, Edge, etc.)
- No external libraries required
