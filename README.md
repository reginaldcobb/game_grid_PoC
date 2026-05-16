# Grid Game — Browser-Based Strategy Puzzle

> A fast, addictive grid-based strategy game where every move counts.

## Overview

This project presents a proof-of-concept for a browser-based strategy puzzle game. The core idea revolves around navigating a grid filled with various elements like numbers, obstacles, and power-ups. Players start at a random cell and aim to collect as many points as possible before their movement counters are depleted. The game is designed to be lightweight and accessible, running entirely within a web browser without the need for any backend infrastructure, complex build tools, or external dependencies. It offers a straightforward yet engaging experience focused on strategic movement and resource management within a dynamic grid environment.

## Features

| Feature | Description |
|---|---|
| Grid-Based Gameplay | Engage in strategic movement across a dynamic grid filled with interactive elements. |
| Dynamic Grid Generation | Each game features a randomly generated grid with numbers, obstacles, and power-ups for varied gameplay. |
| Point Collection System | Accumulate points by moving onto cells, with scores increasing based on the numeric value of each visited tile. |
| Movement Counter | Manage limited movement counters, adding a strategic layer to decision-making. |
| Browser-Based | Play directly in any modern web browser; no installation or external dependencies required. |

## Tech Stack

| Category | Technologies |
|---|---|
| Language | JavaScript |
| Frontend | HTML, CSS |

## Setup & Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/reginaldcobb/game_grid_PoC.git
   cd game_grid_PoC
   ```
2. Open `index.html` in your preferred modern web browser.

## Usage

To play the game:
1. Open `index.html` in your browser.
2. Choose a grid size between 5 and 10 when prompted.
3. Click **Start Game**.

A grid will appear with various elements, including positive and negative numbers, obstacles (`X`), power-ups, and a randomly chosen starting cell highlighted in green.

Move from cell to cell using your mouse. Your score will increase by the numeric value of the cell you land on. The game concludes when all movement counters reach zero, no valid moves remain, or you manually click **End Game**.

---

*Built by [Reginald Cobb](https://github.com/reginaldcobb)*
