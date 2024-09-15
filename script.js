// Initial values for game constants
const INITIAL_GRID_SIZE_MIN = 5;
const INITIAL_GRID_SIZE_MAX = 10;
const INITIAL_CELL_MIN = -5;
const INITIAL_CELL_MAX = 11;
const INITIAL_HORIZONTAL_MOVES = 10;
const INITIAL_VERTICAL_MOVES = 10;
const MIN_DIAGIONAL_MOVES = 2;
// const INITIAL_HORIZONTAL_MOVES = 1;
// const INITIAL_VERTICAL_MOVES = 1;
// const MIN_DIAGIONAL_MOVES = 1;
const DIAGIONAL_MOVES_FACTOR = 2;
const OBSTACLE_COUNT_FACTOR = 0.1; // Proportional factor for obstacles (10% of grid cells)
const POWER_UP_COUNT_FACTOR = 0.05; // Proportional factor for power-ups (5% of grid cells)

const REMOVE_OBSTACLE_POWER_UP = "↓R";
const DIAGONAL_POWER_UP = "D";
const POWER_UPS = [
  "+5H",
  "+5V",
  "+2H",
  "+2V",
  "x2",
  "R",
  REMOVE_OBSTACLE_POWER_UP,
  DIAGONAL_POWER_UP,
];

const POWERUP_MOVE_FLASH_COUNT = 6;

let score = 0;
let clickRow, clickCol; // Variables to store the current position of the player
let prevRow, prevCol; // Variables to store the current position of the player
let previousCell = null; // Store the previous active cell

// Initialize moves left
let horzMovesLeft = INITIAL_HORIZONTAL_MOVES;
let vertMovesLeft = INITIAL_VERTICAL_MOVES;
let diagMovesLeft = MIN_DIAGIONAL_MOVES;

// increment moves flag
let incrementMoves = true;
// Declare grid as a global variable
// let grid = [];

document.getElementById("startGame").addEventListener("click", function () {
  const gridSize = parseInt(document.getElementById("gridSizeInput").value, 10);

  if (gridSize >= 5 && gridSize <= 10) {
    drawGrid(gridSize);
    hideControls();
    showScore(); // Show the score when the game starts
    updateMovesLeft();
    showMoves(); // Show moves container when the game starts
    positionHamburgerMenu(); // Position the hamburger menu after starting the game
    resetScore(); // Reset the score when starting a new game
  } else {
    alert("Please select a grid size between 5 and 10.");
  }
});

document.getElementById("hamburgerMenu").addEventListener("click", function () {
  document.getElementById("dropdown").classList.toggle("show");
});

// Close the dropdown when clicking outside of it
document.addEventListener("click", function (event) {
  const dropdown = document.getElementById("dropdown");
  const dropdownContainer = document.getElementById("dropdownContainer");
  if (
    !dropdownContainer.contains(event.target) &&
    !document.getElementById("hamburgerMenu").contains(event.target)
  ) {
    dropdown.classList.remove("show");
  }
});

document
  .getElementById("dropdownContainer")
  .addEventListener("mouseleave", function () {
    setTimeout(function () {
      const dropdown = document.getElementById("dropdown");
      if (
        !dropdownContainer.matches(":hover") &&
        !document.getElementById("hamburgerMenu").matches(":hover")
      ) {
        dropdown.classList.remove("show");
      }
    }, 300);
  });

document
  .getElementById("hamburgerMenu")
  .addEventListener("mouseleave", function () {
    setTimeout(function () {
      const dropdown = document.getElementById("dropdown");
      if (
        !document.getElementById("dropdownContainer").matches(":hover") &&
        !document.getElementById("hamburgerMenu").matches(":hover")
      ) {
        dropdown.classList.remove("show");
      }
    }, 300);
  });

//
//////////////////////////////////////////////////////////////////////
//

function drawGrid(gridSize) {
  const gridContainer = document.getElementById("gridContainer");

  // Clear any existing grid
  gridContainer.innerHTML = "";

  // Set the grid template based on the size
  gridContainer.style.gridTemplateColumns = `repeat(${gridSize}, 30px)`; // Adjust size as needed
  gridContainer.style.gridTemplateRows = `repeat(${gridSize}, 30px)`; // Adjust size as needed

  // Initialize grid cells with random values
  const grid = [];
  for (let i = 0; i < gridSize; i++) {
    grid[i] = [];
    for (let j = 0; j < gridSize; j++) {
      let randomValue;
      do {
        randomValue =
          Math.floor(Math.random() * (INITIAL_CELL_MAX - INITIAL_CELL_MIN)) +
          INITIAL_CELL_MIN;
      } while (randomValue === -1 || randomValue === 0);
      grid[i][j] = randomValue;
    }
  }
  place_obstacles(gridSize, grid);
  placePowerUps(gridSize, grid);

  // Select a random starting cell
  clickRow = Math.floor(Math.random() * gridSize);
  clickCol = Math.floor(Math.random() * gridSize);
  grid[clickRow][clickCol] = 0; // Set starting cell value to 0

  // Create cells for the grid
  for (let i = 0; i < gridSize * gridSize; i++) {
    const cell = document.createElement("div");
    cell.classList.add("grid-cell");
    const row = Math.floor(i / gridSize);
    const col = i % gridSize;
    if (grid[row][col] === -1) {
      cell.textContent = "X"; // Display obstacles as 'X'
      cell.style.backgroundColor = "red"; // Highlight starting or current point
    } else {
      cell.textContent = grid[row][col];
      cell.style.backgroundColor = "white"; // Highlight starting or current point
    }
    // If the cell is the starting point, highlight it
    if (row === clickRow && col === clickCol) {
      highlightCell(cell); // Call function to highlight the starting cell
    }

    //
    ////////////////////////////////////////////////////////////////////////////////////
    // if user clicks on a cell, check if it is a valid move
    //  
    cell.addEventListener("click", function () {
      const direction = getMoveDirection(row, col); // Determine the move direction
      // console.log("reduceMoveCount --> cell.textContent=", cell.textContent, (cell.textContent !== 0), "isAdjacent=", isAdjacent(row, col) );
      // reduceMoveCount(direction); // Reduce the respective move count
      // reduceMoveCount(direction); // Reduce the respective move count
      // updateMovesLeft(); // Update moves display

      // Check if no moves are left
      if (noMovesLeft()) {
        console.log("Game Over! No moves left. direction=", direction, "noMovesLeft: ", noMovesLeft(), "horzMovesLeft: ", horzMovesLeft, "vertMovesLeft: ", vertMovesLeft, "diagMovesLeft: ", diagMovesLeft);
        updateScore(parseInt(cell.textContent)); // Increase score by contents of the cell
        endGame();
      } else if ((cell.textContent === "X")  && isAdjacent(row, col)) {
        flashCell(cell, "pink", 3, 200); // Flash color if invalid click
      } else if ((isPowerUp(cell)) && (isAdjacent(row, col))) {
        const direction = getMoveDirection(row, col); // Determine the move direction
        console.log(`${cell.textContent} is an adjacent power-up! at (${row}, ${col}) in direction ${direction}`);
        if (canMoveInDirection(direction)) {
          // Check if the player has moves left in that direction
          handlePowerUp(grid, cell, row, col);
          cell.style.backgroundColor = "green"; // Change color of clicked cell
          cell.textContent = ""; // Clear the cell value
          movePlayer(row, col, cell); // Update player position
          reduceMoveCount(direction); // Reduce the respective move count
          updateMovesLeft(); // Update moves display
        } else {
          flashCell(cell, "purple", 4, 200); // Flash color if no moves left
        }
      } else if ((isAdjacent(row, col)) && (cell.style.backgroundColor !== "grey") ){
        // const direction = getMoveDirection(row, col); // Determine the move direction
        // console.log("previousrow=", prevRow,"previouscol=", prevCol, "row=", row, "col=", col, "clickRow=", clickRow, "clickCol=", clickCol);
        if (canMoveInDirection(direction)) {
          // Check if the player has moves left in that direction
          if (cell.textContent !== "") {
            updateScore(parseInt(cell.textContent)); // Increase score by contents of the cell
            // cell.style.backgroundColor = "white"; // Change color of clicked cell
            cell.textContent = ""; // Clear the cell value
            movePlayer(row, col, cell); // Update player position
            reduceMoveCount(direction); // Reduce the respective move count
            updateMovesLeft(); // Update moves display
          }
        } else {
          flashCell(cell, "red", 5, 200); // Flash color if no moves left
          console.log("Game Over! No moves left. direction=", direction, "noMovesLeft: ", noMovesLeft(), "horzMovesLeft: ", horzMovesLeft, "vertMovesLeft: ", vertMovesLeft, "diagMovesLeft: ", diagMovesLeft);
          endGame();
        }
      } else {
        if ((cell.style.backgroundColor !=="grey")) {
          // console.log("cell.textContent=", cell.textContent, (cell.textContent !== 0), "isAdjacent=", isAdjacent(row, col) );
            flashCell(cell, "yellow", 5, 200); // Flash color if invalid click
        }
      }
    });

    gridContainer.appendChild(cell);
  }
  // console.log(grid);

  // place_obstacles(gridSize, grid);
}

// Function to handle the power-up effect
function handlePowerUp(grid, cell, row, col) {
  switch (cell.textContent) {
    case "+5H":
      horzMovesLeft += 5;
      break;
    case "+5V":
      vertMovesLeft += 5;
      break;
    case "+2H":
      horzMovesLeft += 2;
      break;
    case "+2V":
      vertMovesLeft += 2;
      break;
    case "x2":
      horzMovesLeft *= 2;
      vertMovesLeft *= 2;
      diagMovesLeft *= 2;
      break;
    case "R":
    //   horzMovesLeft = 0;
    //   vertMovesLeft = 0;
    //   diagMovesLeft = 0;
    console.log('R Power-Up clicked!');
      break;
    case REMOVE_OBSTACLE_POWER_UP:
      grid[row][col] = 0; // Remove the obstacle
      break;
    case DIAGONAL_POWER_UP:
      diagMovesLeft *= DIAGIONAL_MOVES_FACTOR;
      break;
  }
  updateMovesLeft(); // Call the update function whenever movesLeft variables change

  return grid;
}

// Function to check if a cell's textContent is a power-up
function isPowerUp(cell) {
  return POWER_UPS.includes(cell.textContent);
}

// Check if a clicked cell is adjacent to the current position
function isAdjacent(row, col) {
  const rowDiff = Math.abs(clickRow - row);
  const colDiff = Math.abs(clickCol - col);
  return rowDiff <= 1 && colDiff <= 1; // Check adjacency (includes diagonal)
}

function place_obstacles(gridSize, grid) {
  let obstacle_count = Math.floor(gridSize * gridSize * OBSTACLE_COUNT_FACTOR);
  // console.log(obstacle_count)

  for (let i = 0; i < obstacle_count; i++) {
    let row = Math.floor(Math.random() * gridSize);
    let col = Math.floor(Math.random() * gridSize);

    grid[row][col] = -1;
    // console.log('Obstacle:', i, 'Position:', row, col, 'Value:', grid[row][col]);
    // }
  }

  // Print the final grid with obstacles
  // console.log('Final Grid:', grid);

  // Return the modified grid
  return grid;
}

function placePowerUps(gridSize, grid) {
  powerUpCount = Math.floor(gridSize * gridSize * POWER_UP_COUNT_FACTOR);
  // Place at least one of each power-up
  POWER_UPS.forEach((powerUp) => {
    let placed = false;
    while (!placed) {
      const i = Math.floor(Math.random() * gridSize);
      const j = Math.floor(Math.random() * gridSize);
      // if (![-1, "+5H", "+5V", "+2H", "+2V", "x2", "R", DIAGONAL_POWER_UP].includes(grid[i][j])) {
      if (!POWER_UPS.includes(grid[i][j]) && grid[i][j] !== -1) {
        grid[i][j] = powerUp;
        placed = true;
      }
    }
  });

  // Place remaining power-ups randomly
  let remainingPowerUps = POWER_UPS.flatMap((pu) =>
    Array(Math.floor(powerUpCount / POWER_UPS.length)).fill(pu)
  );
  remainingPowerUps = remainingPowerUps.slice(
    0,
    powerUpCount - POWER_UPS.length
  );

  remainingPowerUps.forEach(() => {
    let placed = false;
    while (!placed) {
      const i = Math.floor(Math.random() * gridSize);
      const j = Math.floor(Math.random() * gridSize);
      if (
        ![
          -1,
          "+5H",
          "+5V",
          "+2H",
          "+2V",
          "x2",
          "R",
          DIAGONAL_POWER_UP,
        ].includes(grid[i][j])
      ) {
        const powerUp =
          remainingPowerUps[
            Math.floor(Math.random() * remainingPowerUps.length)
          ];
        grid[i][j] = powerUp;
        remainingPowerUps = remainingPowerUps.filter((pu) => pu !== powerUp);
        placed = true;
      }
    }
  });

  // Calculate the remaining number of power-ups to place
  const remainingPowerUpsCount = powerUpCount - POWER_UPS.length;

  for (let k = 0; k < remainingPowerUpsCount; k++) {
    while (true) {
      const i = Math.floor(Math.random() * gridSize);
      const j = Math.floor(Math.random() * gridSize);
      if (grid[i][j] === 0 && !allPowerUpPositions.has(`${i},${j}`)) {
        grid[i][j] = POWER_UPS[Math.floor(Math.random() * POWER_UPS.length)];
        allPowerUpPositions.add(`${i},${j}`);
        break;
      }
    }
  }
  return grid; // Return the modified grid
}

// Check if a clicked cell is adjacent to the current position
function isAdjacent(row, col) {
  const rowDiff = Math.abs(clickRow - row);
  const colDiff = Math.abs(clickCol - col);
  return rowDiff <= 1 && colDiff <= 1; // Check adjacency (includes diagonal)
}

// Determine the move direction: 'horizontal', 'vertical', or 'diagonal'
function getMoveDirection(newRow, newCol) {
  const rowDiff = Math.abs(clickRow - newRow);
  const colDiff = Math.abs(clickCol - newCol);
  if (rowDiff === 1 && colDiff === 0) {
    return "vertical"; // Moved vertically
  } else if (rowDiff === 0 && colDiff === 1) {
    return "horizontal"; // Moved horizontally
  } else if (rowDiff === 1 && colDiff === 1) {
    return "diagonal"; // Moved diagonally
  }
  return null;
}

// Check if the player can move in the specified direction
function canMoveInDirection(direction) {
  if (direction === "horizontal") {
    return horzMovesLeft > 0;
  } else if (direction === "vertical") {
    return vertMovesLeft > 0;
  } else if (direction === "diagonal") {
    return diagMovesLeft > 0;
  }
  return false;
}

// Reduce the remaining moves based on the direction
function reduceMoveCount(direction) {
  if ((direction === "horizontal") && (horzMovesLeft > 0)) {
    horzMovesLeft--;
  } else if ((direction === "vertical") && (vertMovesLeft > 0)) {
    vertMovesLeft--;
  } else if ((direction === "diagonal") && (diagMovesLeft > 0)) {
    diagMovesLeft--;
  }
  updateMovesLeft(); // Call the update function whenever movesLeft variables change
}

// Move the player to the new position and highlight the current cell
function movePlayer(newRow, newCol, newCell) {
  if (previousCell) {
    previousCell.style.border = "1px solid #ccc"; // Reset previous cell's border
    // previousCell.style.border = "1px solid red"; // Reset previous cell's border
    // previousCell.style.backgroundColor = 'lightgray'; // Highlight starting or current point
    previousCell.style.backgroundColor = "grey"; // Highlight starting or current point
    previousCell.textContent = 0; // Clear the cell value
    // set opacity to 0
    // previousCell.style.visibility = "hidden";
  }

  // Update player position
  prevRow = clickRow;
  prevCol = clickCol;

  clickRow = newRow;
  clickCol = newCol;

  // Highlight the new cell with a border
  highlightCell(newCell);

  // Check for valid moves after each move
}

// Highlight a cell by adding a border
function highlightCell(cell) {
  cell.style.backgroundColor = "green"; // Highlight starting or current point
  cell.style.color = "green"; // Set text color to contrast
  previousCell = cell; // Store the current cell as the previous one for the next move
}

// Update moves left display
function updateMovesLeft() {
  document.getElementById("horzMovesLeft").textContent = horzMovesLeft;
  document.getElementById("vertMovesLeft").textContent = vertMovesLeft;
  document.getElementById("diagMovesLeft").textContent = diagMovesLeft;
}

function noMovesLeft() {
  return horzMovesLeft <= 0 && vertMovesLeft <= 0 && diagMovesLeft <= 0;
}

function hasValidMoves(grid, clickRow, clickCol, previousCell) {
  const directions = [
    { row: -1, col: 0 }, // Up
    { row: 1, col: 0 }, // Down
    { row: 0, col: -1 }, // Left
    { row: 0, col: 1 }, // Right
    { row: -1, col: -1 }, // Diagonal Up-Left
    { row: -1, col: 1 }, // Diagonal Up-Right
    { row: 1, col: -1 }, // Diagonal Down-Left
    { row: 1, col: 1 }, // Diagonal Down-Right
  ];

  console.log(
    `Checking valid moves for (${clickRow}, ${clickCol}, ${grid[clickRow][clickCol]})`
  );

  for (const direction of directions) {
    const newRow = clickRow + direction.row;
    const newCol = clickCol + direction.col;

    // Check if the new position is within bounds
    if (
      newRow >= 0 &&
      newRow < grid.length &&
      newCol >= 0 &&
      newCol < grid[0].length
    ) {
      // Check if the cell is not an obstacle and not visited/greyed out
      // if (grid[newRow][newCol] !== -1 && grid[newRow][newCol] !== "grey") {
      if (grid[newRow][newCol] !== -1 && grid[newRow][newCol] !== "") {
        console.log(
          `Valid move found at (${newRow}, ${newCol}, ${grid[newRow][newCol]})`
        );
        return true; // Valid move found
      }
    }
  }

  return false; // No valid moves
}

// Show moves left container
function showMoves() {
  document.getElementById("movesContainer").style.display = "block";
}

function endGame() {
  // alert('Game Over! No moves left.');
  // Additional logic to end the game
  // For example, hide the grid, show a restart button, etc.
  document.getElementById("gridContainer").innerHTML = ""; // Clear the grid
  hideControls(); // Optionally hide controls
  showScore(); // Show final score or other information
}

// Hide moves left container
function hideMoves() {
  document.getElementById("movesContainer").style.display = "none";
}

function flashCell(cell, color, count, delay) {
  const originalColor = cell.style.backgroundColor;
  const originaltext = cell.textContent;

  for (let i = 0; i < count; i++) {
    cell.style.textContent = ''; // clear cell
    cell.style.backgroundColor = color; // Flash color
    setTimeout(function () {
      cell.style.textContent = ''; // Revert to original text color
      cell.style.backgroundColor = originalColor; // Revert to original background color
      // cell.style.backgroundColor = "grey"; // Revert to original color
    }, delay * (i + 1)); // Flash duration in milliseconds
    if (i < count - 1) {
      setTimeout(function () {
        cell.style.textContent = ''; // clear cell
        cell.style.backgroundColor = color; // Flash color again
      }, delay * (i + 1) + delay / 2); // Flash duration in milliseconds
    }
  }
  cell.style.textContent = originaltext; // Revert to original text color
}

function hideControls() {
  // Hide the controls (header, input, buttons)
  document.getElementById("controls").style.display = "none";
  hideScore(); // Hide the score when selecting grid size
  hideMoves(); // Hide moves container when selecting grid size
}

function showScore() {
  document.getElementById("scoreContainer").style.display = "block";
}

function hideScore() {
  document.getElementById("scoreContainer").style.display = "none";
}

function updateScore(points) {
  score += points;
  document.getElementById("score").textContent = score;
}

function resetScore() {
  score = 0;
  document.getElementById("score").textContent = score;
}

function positionHamburgerMenu() {
  const gridContainer = document.getElementById("gridContainer");
  const gridRect = gridContainer.getBoundingClientRect();
  const dropdownContainer = document.getElementById("dropdownContainer");

  // Position the hamburger menu above the top-left grid cell with adjusted space
  dropdownContainer.style.position = "absolute"; // Ensure absolute positioning
  dropdownContainer.style.top = `${gridRect.top - 50}px`; // Adjust to move up
  dropdownContainer.style.left = `${gridRect.left}px`; // Adjust as needed
  dropdownContainer.style.display = "block"; // Ensure visibility
}

document.getElementById("endGame").addEventListener("click", function () {
  endGame(); // Call the endGame function when "End Game" is clicked
});

document.getElementById("saveGame").addEventListener("click", function () {
  alert("Game Saved!");
});

document
  .getElementById("loadGameDropdown")
  .addEventListener("click", function () {
    alert("Game Loaded!");
  });

document.getElementById("restartGame").addEventListener("click", function () {
  window.location.reload(); // Reloads the page to restart
});
