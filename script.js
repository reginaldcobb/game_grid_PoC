// Initial values for game constants
const INITIAL_GRID_SIZE_MIN = 5;
const INITIAL_GRID_SIZE_MAX = 10;
const INITIAL_CELL_MIN = -5;
const INITIAL_CELL_MAX = 11;
const INITIAL_HORIZONTAL_MOVES = 10;
const INITIAL_VERTICAL_MOVES = 10;
const MIN_DIAGIONAL_MOVES = 2;
const DIAGIONAL_MOVES_FACTOR = 2;
const OBSTACLE_COUNT_FACTOR = 0.1; // Proportional factor for obstacles (10% of grid cells)
const POWER_UP_COUNT_FACTOR = 0.05; // Proportional factor for power-ups (5% of grid cells)

const REMOVE_OBSTACLE_POWER_UP = "↓R";
const DIAGONAL_POWER_UP = "D";
const POWER_UPS = ["+5H", "+5V", "+2H", "+2V", "x2", "R", REMOVE_OBSTACLE_POWER_UP, DIAGONAL_POWER_UP];

const POWERUP_MOVE_FLASH_COUNT = 6;

let score = 0;
let currentRow, currentCol; // Variables to store the current position of the player

// Initialize moves left
let horzMovesLeft = INITIAL_HORIZONTAL_MOVES;
let vertMovesLeft = INITIAL_VERTICAL_MOVES;
let diagMovesLeft = MIN_DIAGIONAL_MOVES;


document.getElementById('startGame').addEventListener('click', function() {
    const gridSize = parseInt(document.getElementById('gridSizeInput').value, 10);
    
    if (gridSize >= 5 && gridSize <= 10) {
        drawGrid(gridSize);
        hideControls();
        showScore(); // Show the score when the game starts
        updateMovesLeft();
        positionHamburgerMenu(); // Position the hamburger menu after starting the game
        resetScore(); // Reset the score when starting a new game
    } else {
        alert('Please select a grid size between 5 and 10.');
    }
});

document.getElementById('hamburgerMenu').addEventListener('click', function() {
    document.getElementById("dropdown").classList.toggle("show");
});

// Close the dropdown when clicking outside of it
document.addEventListener('click', function(event) {
    const dropdown = document.getElementById("dropdown");
    const dropdownContainer = document.getElementById('dropdownContainer');
    if (!dropdownContainer.contains(event.target) && !document.getElementById('hamburgerMenu').contains(event.target)) {
        dropdown.classList.remove("show");
    }
});

document.getElementById('dropdownContainer').addEventListener('mouseleave', function() {
    setTimeout(function() {
        const dropdown = document.getElementById("dropdown");
        if (!dropdownContainer.matches(':hover') && !document.getElementById('hamburgerMenu').matches(':hover')) {
            dropdown.classList.remove("show");
        }
    }, 300);
});

document.getElementById('hamburgerMenu').addEventListener('mouseleave', function() {
    setTimeout(function() {
        const dropdown = document.getElementById("dropdown");
        if (!document.getElementById('dropdownContainer').matches(':hover') && !document.getElementById('hamburgerMenu').matches(':hover')) {
            dropdown.classList.remove("show");
        }
    }, 300);
});


function drawGrid(gridSize) {
    const gridContainer = document.getElementById('gridContainer');
    
    // Clear any existing grid
    gridContainer.innerHTML = '';
    
    // Set the grid template based on the size
    gridContainer.style.gridTemplateColumns = `repeat(${gridSize}, 30px)`; // Adjust size as needed
    gridContainer.style.gridTemplateRows = `repeat(${gridSize}, 30px)`;    // Adjust size as needed

    // Initialize grid cells with random values
    const grid = [];
    for (let i = 0; i < gridSize; i++) {
        grid[i] = [];
        for (let j = 0; j < gridSize; j++) {
            let randomValue;
            do {
                randomValue = Math.floor(Math.random() * (INITIAL_CELL_MAX - INITIAL_CELL_MIN)) + INITIAL_CELL_MIN;
            } while (randomValue === -1 || randomValue === 0);
            grid[i][j] = randomValue;
        }
    }

    // Select a random starting cell
    currentRow = Math.floor(Math.random() * gridSize);
    currentCol = Math.floor(Math.random() * gridSize);
    grid[currentRow][currentCol] = 0; // Set starting cell value to 0

    // Create cells for the grid
    for (let i = 0; i < gridSize * gridSize; i++) {
        const cell = document.createElement('div');
        cell.classList.add('grid-cell');
        const row = Math.floor(i / gridSize);
        const col = i % gridSize;
        cell.textContent = grid[row][col];

        // If the cell is the starting point, highlight it in blue
        if (row === currentRow && col === currentCol) {
            cell.style.backgroundColor = 'blue'; // Highlight starting point
            cell.style.color = 'white'; // Set text color to contrast
        }

        // Add event listener for click interaction
        cell.addEventListener('click', function() {
            if (isAdjacent(row, col)) {
                if (cell.textContent !== '') {
                    updateScore(parseInt(cell.textContent)); // Increase score by contents of the cell
                    cell.style.backgroundColor = 'lightgray'; // Change color of clicked cell
                    cell.textContent = ''; // Clear the cell value
                    movePlayer(row, col); // Update player position
                }
            } else {
                flashCell(cell, 'yellow', 5, 200); // Flash color if invalid click
            }
        });

        gridContainer.appendChild(cell);
    }

    highlightValidMoves(gridSize); // Highlight valid moves around the starting cell
}

// Check if a clicked cell is adjacent to the current position
function isAdjacent(row, col) {
    const rowDiff = Math.abs(currentRow - row);
    const colDiff = Math.abs(currentCol - col);
    return (rowDiff === 1 && colDiff === 0) || // Vertical
           (rowDiff === 0 && colDiff === 1) || // Horizontal
           (rowDiff === 1 && colDiff === 1);   // Diagonal
}

// Move the player to the new position and update valid moves
function movePlayer(newRow, newCol) {
    currentRow = newRow;
    currentCol = newCol;
    highlightValidMoves(document.getElementById('gridSizeInput').value); // Update valid move highlights
}

// Highlight the valid adjacent cells
function highlightValidMoves(gridSize) {
    const gridContainer = document.getElementById('gridContainer');
    const cells = gridContainer.querySelectorAll('.grid-cell');
    cells.forEach((cell, index) => {
        const row = Math.floor(index / gridSize);
        const col = index % gridSize;
        
        // if (isAdjacent(row, col) && cell.textContent !== '') {
        //     cell.style.border = '2px solid green'; // Highlight valid cells
        // } else {
        //     cell.style.border = '1px solid #ccc'; // Reset border for non-adjacent cells
        // }
    });
}


// Update moves left display
function updateMovesLeft() {
    document.getElementById('horzMovesLeft').textContent = horzMovesLeft;
    document.getElementById('vertMovesLeft').textContent = vertMovesLeft;
    document.getElementById('diagMovesLeft').textContent = diagMovesLeft;
}

function flashCell(cell, color, count, delay) {
    const originalColor = cell.style.backgroundColor;
    for (let i = 0; i < count; i++) {
        cell.style.backgroundColor = color; // Flash color
        setTimeout(function() {
            cell.style.backgroundColor = originalColor; // Revert to original color
        }, delay * (i + 1)); // Flash duration in milliseconds
        if (i < count - 1) {
            setTimeout(function() {
                cell.style.backgroundColor = color; // Flash color again
            }, delay * (i + 1) + (delay/2)); // Flash duration in milliseconds
        }
    }
}


function hideControls() {
    // Hide the controls (header, input, buttons)
    document.getElementById('controls').style.display = 'none';
    hideScore(); // Hide the score when selecting grid size
}

function showScore() {
    document.getElementById('scoreContainer').style.display = 'block';
}

function hideScore() {
    document.getElementById('scoreContainer').style.display = 'none';
}

function updateScore(points) {
    score += points;
    document.getElementById('score').textContent = score;
}

function resetScore() {
    score = 0;
    document.getElementById('score').textContent = score;
}

function positionHamburgerMenu() {
    const gridContainer = document.getElementById('gridContainer');
    const gridRect = gridContainer.getBoundingClientRect();
    const dropdownContainer = document.getElementById('dropdownContainer');
    
    // Position the hamburger menu above the top-left grid cell with adjusted space
    dropdownContainer.style.position = 'absolute'; // Ensure absolute positioning
    dropdownContainer.style.top = `${gridRect.top - 50}px`; // Adjust to move up
    dropdownContainer.style.left = `${gridRect.left}px`; // Adjust as needed
    dropdownContainer.style.display = 'block'; // Ensure visibility
}

// Event listeners for dropdown menu options
document.getElementById('endGame').addEventListener('click', function() {
    alert('Game Ended!');
});

document.getElementById('saveGame').addEventListener('click', function() {
    alert('Game Saved!');
});

document.getElementById('loadGameDropdown').addEventListener('click', function() {
    alert('Game Loaded!');
});

document.getElementById('restartGame').addEventListener('click', function() {
    window.location.reload(); // Reloads the page to restart
});
