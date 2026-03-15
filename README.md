# 🎮 Game Grid PoC  
A browser‑based proof‑of‑concept demonstrating grid‑based movement, DOM‑driven rendering, and simple game‑loop mechanics using **HTML, CSS, and vanilla JavaScript**. The game runs entirely in your browser — no backend, no build tools, no dependencies.

**See the README to PLAY THE GAME!!**

---

## 🌐 Overview

Game Grid PoC is a lightweight experiment in interactive grid logic. It renders a 2D grid in the browser and allows the player to move around using keyboard controls. The project explores:

- DOM‑based grid rendering  
- Player state management  
- Keyboard event handling  
- Real‑time visual updates  
- Clean separation of logic (HTML / CSS / JS)

This PoC is intentionally simple but structured so you can extend it into a full game engine.

---

## 📂 Project Structure

```
game_grid_PoC/
├── index.html        # Main game UI and grid container
├── script.js         # Game logic, movement, rendering
├── styles.css        # Grid styling and layout
├── favicon.ico
├── favicon-32x32.png
└── README.md
```

---

## ▶️ How to Play the Game

### **Option 1 — Just open it**
1. Clone the repo:
   ```bash
   git clone https://github.com/reginaldcobb/game_grid_PoC.git
   cd game_grid_PoC
   ```

2. Open `index.html` in your browser:
   - macOS:
     ```bash
     open index.html
     ```
   - Windows:
     ```bash
     start index.html
     ```
   - Or double‑click it in your file explorer.

You're in the game immediately.

---

### **Option 2 — Run with a local web server (recommended)**

Some browsers restrict JS when loading from `file://`.

#### Python 3:
```bash
python -m http.server 8000
```
Open:
```
http://localhost:8000
```

#### Node:
```bash
npx http-server .
```

---

## 🎮 Controls

```
W = Move Up
A = Move Left
S = Move Down
D = Move Right
```

The grid updates instantly as you move.

---

## 📐 Grid System Architecture

The grid is rendered using DOM elements (typically `<div>`s styled with CSS Grid).  
Each cell is represented visually and updated dynamically.

### **Grid Diagram**

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
- `.` → Empty tile  

### **Internal Representation (Conceptual)**

```javascript
const grid = [
  ["." , ".", ".", ".", "."],
  ["." , "P", ".", ".", "."],
  ["." , ".", ".", ".", "."],
  ["." , ".", ".", ".", "."],
  ["." , ".", ".", ".", "."],
];
```

### **Coordinate System**
- `(row, col)`
- `(0, 0)` is top‑left
- Movement updates the player’s coordinates, then re-renders the grid

---

## 🧠 Game Rules & Logic

### **Movement Rules**
- Player moves with WASD  
- Movement is blocked at grid edges  
- Only one player exists  
- Each move triggers a full or partial DOM update  

### **Rendering Rules**
- The grid is drawn using CSS Grid  
- The player tile is styled differently (e.g., `.player` class)  
- Movement updates the DOM by:
  - Removing the player class from the old tile  
  - Adding it to the new tile  

### **Event Handling**
Keyboard events are captured via:

```javascript
document.addEventListener("keydown", handleMove);
```

---

## 🧩 Technical Deep Dive

### **Grid Rendering**
The grid is created dynamically:

```javascript
function drawGrid() {
  gridElement.innerHTML = "";
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      if (r === playerRow && c === playerCol) {
        cell.classList.add("player");
      }
      gridElement.appendChild(cell);
    }
  }
}
```

### **Movement Engine**
```javascript
function movePlayer(dx, dy) {
  const newRow = playerRow + dy;
  const newCol = playerCol + dx;

  if (newRow >= 0 && newRow < rows && newCol >= 0 && newCol < cols) {
    playerRow = newRow;
    playerCol = newCol;
    drawGrid();
  }
}
```

### **Game Loop**
This PoC uses event‑driven updates rather than a timed loop.  
The grid updates only when the player moves.

---

## 🧭 Development Roadmap

### **Phase 1 — Core Engine (Complete)**
- Grid rendering  
- Player movement  
- Boundary checks  
- DOM updates  

### **Phase 2 — World Building**
- Add walls / obstacles  
- Add collectible items  
- Add goal tiles  
- Add level layouts from JSON  

### **Phase 3 — Game Mechanics**
- Score system  
- Timer or turn counter  
- Multiple levels  
- Reset / restart button  

### **Phase 4 — Visual Enhancements**
- Animations  
- Color themes  
- Mobile‑friendly controls  
- Sound effects  

### **Phase 5 — Advanced Features**
- Enemy AI  
- Pathfinding (A*)  
- Procedural map generation  
- Save/load state  

---

## 🤝 Contributing

1. Fork the repo  
2. Create a feature branch  
3. Make your changes  
4. Submit a pull request  

---

## 📄 License
MIT License — free to use, modify, and distribute.
