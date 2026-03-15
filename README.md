# 🎮 Game Grid PoC  
A technical proof‑of‑concept exploring grid‑based movement, state management, and terminal‑rendered game loops in Python. This project demonstrates how to model a 2D world, update entities, and visualize changes frame‑by‑frame — forming the foundation for turn‑based or real‑time grid games.

---

## 📐 Grid System Architecture

The game world is represented as a **2D matrix**, implemented as a list of lists:

```
+---+---+---+---+---+
| . | . | . | . | . |
+---+---+---+---+---+
| . | P | . | . | . |
+---+---+---+---+---+
| . | . | . | . | . |
+---+---+---+---+---+
| . | . | . | . | . |
+---+---+---+---+---+
| . | . | . | . | . |
+---+---+---+---+---+
```

### **Legend**
- `P` → Player  
- `.` → Empty cell  
- Additional entities can be added (walls, enemies, items)

### **Internal Representation**
```python
grid = [
    [".", ".", ".", ".", "."],
    [".", "P", ".", ".", "."],
    [".", ".", ".", ".", "."],
    [".", ".", ".", ".", "."],
    [".", ".", ".", ".", "."],
]
```

### **Coordinate System**
- `(row, col)`  
- `(0, 0)` is top‑left  
- Movement updates coordinates and triggers a redraw

---

## 🧠 Game Rules & Logic

### **1. Movement Rules**
- Player can move: **up, down, left, right**
- Movement is blocked by grid boundaries
- Invalid moves do nothing (but still redraw)

### **2. Turn Loop**
Each turn:

1. Render grid  
2. Accept input  
3. Validate move  
4. Update player position  
5. Redraw grid  

### **3. Rendering Rules**
- Grid is cleared and redrawn every frame  
- Only one player exists  
- Player position is always unique and tracked in memory

### **4. Extensibility Rules**
The PoC is intentionally simple but structured to support:

- Obstacles  
- Enemies  
- Pathfinding  
- Fog‑of‑war  
- Multi‑entity updates  
- Real‑time tick loops  

---

## 🛠 Project Structure

```
game_grid_PoC/
├── main.py          # Entry point and game loop
├── grid.py          # Grid creation, rendering, and utilities
├── player.py        # Player state and movement logic
└── README.md        # Documentation
```

---

## ▶️ Running the Program

### **1. Clone the repository**
```bash
git clone https://github.com/reginaldcobb/game_grid_PoC.git
cd game_grid_PoC
```

### **2. Run the game**
```bash
python main.py
```

If your entry file is named differently (e.g., `game.py`), run:

```bash
python game.py
```

### **3. Controls**
Inside the game loop, you’ll be prompted for movement:

```
w = up
s = down
a = left
d = right
q = quit
```

---

## 🧩 Technical Deep Dive

### **Grid Rendering**
The grid is redrawn each frame using:

```python
for row in grid:
    print(" ".join(row))
```

### **Movement Engine**
Movement is handled by updating the player’s `(row, col)`:

```python
if direction == "up" and row > 0:
    row -= 1
```

### **State Reset**
Before placing the player, the grid is cleared:

```python
grid = [["." for _ in range(width)] for _ in range(height)]
grid[player_row][player_col] = "P"
```

### **Game Loop**
A simple blocking loop:

```python
while True:
    draw_grid()
    direction = input("Move: ")
    update_player(direction)
```

This can be upgraded to:

- non‑blocking input  
- timed ticks  
- event queues  
- multi‑entity updates  

---

## 🧭 Development Roadmap

### **Phase 1 — Core Engine (Complete)**
- Grid rendering  
- Player movement  
- Boundary checks  
- Turn loop  

### **Phase 2 — World Building**
- Add walls / obstacles  
- Add collectible items  
- Add enemies with simple AI  
- Add map loading from JSON  

### **Phase 3 — Game Mechanics**
- Health system  
- Inventory  
- Combat  
- Scoring  

### **Phase 4 — Visualization**
- Colorized terminal output  
- Sprite‑based rendering  
- Web‑based UI (React or Pygame alternative)  

### **Phase 5 — Advanced Systems**
- Pathfinding (A*)  
- Procedural map generation  
- Save/load system  
- Multi‑level dungeons  

---

## 🤝 Contributing

1. Fork the repo  
2. Create a feature branch  
3. Add tests where appropriate  
4. Submit a pull request  

---

## 📄 License
MIT License — free to use, modify, and distribute.
