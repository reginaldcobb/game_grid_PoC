# 🎮 Grid Game — Browser‑Based Strategy Puzzle

A fast, addictive grid‑based strategy game where every move counts.  
You start on a random cell inside a grid filled with numbers, obstacles, and power‑ups.  
Your goal: **collect as many points as possible before your movement counters run out.**

The game runs entirely in your browser — no backend, no build tools, no dependencies.

---

## 🚀 How to Play

### 1. Start the Game
1. Open `index.html` in any modern browser  
2. Choose a grid size between **5 and 10**  
3. Click **Start Game**

A grid appears containing:
- Random positive and negative numbers  
- Obstacles (`X`)  
- Power‑ups  
- A randomly chosen **starting cell**, highlighted in green  

---

## 🎯 Objective

Move from cell to cell with your mouse, collecting points from each visited tile.  
Your score increases by the **numeric value** of the cell you step on.

The game ends when:
- All movement counters reach zero  
- OR no valid moves remain  
- OR you click **End Game**  

---

## 🎮 Movement Rules

You can move to **any adjacent cell**, including diagonals:

```
[↖] [↑] [↗]
[←] [P] [→]
[↙] [↓] [↘]
```

Movement types:

| Move Type | Description | Counter |
|----------|-------------|---------|
| **Horizontal** | Left or Right | `horzMovesLeft` |
| **Vertical** | Up or Down | `vertMovesLeft` |
| **Diagonal** | Any diagonal direction | `diagMovesLeft` |

You must have moves left in that direction to move.

Invalid moves:
- Clicking a non‑adjacent cell  
- Clicking an obstacle (`X`)  
- Clicking a valid cell but having **0 moves** in that direction  

---

## 🧮 Scoring System

When you move onto a cell:

- The **number** in the cell is added to your score  
- The cell becomes **visited** (grey background, value becomes `0`)  
- The score display updates immediately  

Examples:
- Step on `7` → score +7  
- Step on `-3` → score −3  

---

## ⚡ Power‑Ups

Power‑ups appear randomly and give special abilities.

| Power‑Up | Effect |
|----------|--------|
| `+5H` | +5 horizontal moves |
| `+5V` | +5 vertical moves |
| `+2H` | +2 horizontal moves |
| `+2V` | +2 vertical moves |
| `x2` | Doubles **all** move counters |
| `R` | Reserved for future random‑warp behavior |
| `W` | Warp to a clicked cell (future feature) |
| `↓X` | Remove an obstacle (turns `X` into `0`) |
| `D` | Multiply diagonal moves by a factor |

Rules:
- Power‑ups must be **adjacent** to activate  
- Clicking one applies its effect, clears the cell, and moves you into it  

---

## 🧱 Obstacles

Obstacles are represented as:

```
X
```

Rules:
- You **cannot** move onto an obstacle  
- Unless you have the **Remove Obstacle** power‑up (`↓X`)  
- Obstacles are placed randomly based on grid size  

---

## 🧩 Grid Generation

When the game starts:

1. A grid of size **5–10** is created  
2. Each cell is assigned a random number between **-5 and 10**, excluding `-1` and `0`  
3. Obstacles are placed using:  
   ```
   OBSTACLE_COUNT_FACTOR = 0.1  // 10% of grid cells
   ```
4. Power‑ups are placed using:  
   ```
   POWER_UP_COUNT_FACTOR = 0.05 // 5% of grid cells
   ```
5. A random starting cell is chosen and set to `0`  
6. The starting cell is highlighted in green  

---

## 🧠 Game End Conditions

The game ends when:

- All movement counters reach zero  
- OR no adjacent valid moves exist  
- OR the player clicks **End Game**  
- OR the grid is fully exhausted  

When the game ends:
- The grid disappears  
- “Game Over” is displayed  
- The final score remains visible  

---

## 🧭 Technical Breakdown

### Movement Detection
```javascript
getMoveDirection(newRow, newCol)
```
Returns:
- `"horizontal"`
- `"vertical"`
- `"diagonal"`
- `null` (invalid)

### Move Counter Enforcement
```javascript
canMoveInDirection(direction)
```

### Score Updates
```javascript
updateScore(points)
```

### Valid Move Checking
```javascript
hasValidMoves(grid, clickRow, clickCol, cell)
```

If false → game ends.

---

## 📂 Project Structure

```
game_grid_PoC/
├── index.html        # Main UI and game container
├── script.js         # Game logic, movement, scoring, power-ups
├── styles.css        # Grid layout and visual styling
├── favicon.ico
├── favicon-32x32.png
└── README.md
```

---

## ▶️ How to Run

### Option 1 — Open directly
Just open:

```
index.html
```

### Option 2 — Run a local server (recommended)

**Python:**
```bash
python -m http.server 8000
```
Visit:
```
http://localhost:8000
```

**Node:**
```bash
npx http-server .
```

---

## 🧭 Development Roadmap

### Phase 1 — Core Mechanics (Complete)
- Grid generation  
- Movement logic  
- Scoring  
- Obstacles  
- Power‑ups  
- End‑game detection  

### Phase 2 — Enhancements
- Timer (UI placeholder exists)  
- Warp power‑up full implementation  
- Save/load game state  
- Animations for movement  
- Sound effects  

### Phase 3 — Advanced Features
- Multiple levels  
- Difficulty modes  
- High‑score tracking  
- Mobile‑friendly controls  
- Visual themes  

---

## 🤝 Contributing

1. Fork the repo  
2. Create a feature branch  
3. Make your changes  
4. Submit a pull request  

---

## 📄 License
MIT License — free to use, modify, and distribute.
