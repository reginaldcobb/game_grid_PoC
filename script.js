document.getElementById('startGame').addEventListener('click', function() {
    const gridSize = parseInt(document.getElementById('gridSizeInput').value, 10);
    
    if (gridSize >= 5 && gridSize <= 10) {
        drawGrid(gridSize);
        hideControls();
        positionHamburgerMenu(); // Position the hamburger menu after starting the game
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
    document.getElementById("dropdown").classList.remove("show");
});

document.getElementById('hamburgerMenu').addEventListener('mouseleave', function() {
    // Set a timeout to allow user to move the mouse to the dropdown without it hiding immediately
    setTimeout(function() {
        const dropdown = document.getElementById("dropdown");
        const dropdownContainer = document.getElementById('dropdownContainer');
        if (!dropdownContainer.matches(':hover') && !document.getElementById('hamburgerMenu').matches(':hover')) {
            dropdown.classList.remove("show");
        }
    }, 300); // Adjust timeout as needed
});

function drawGrid(gridSize) {
    const gridContainer = document.getElementById('gridContainer');
    
    // Clear any existing grid
    gridContainer.innerHTML = '';

    // Set the grid template based on the size
    gridContainer.style.gridTemplateColumns = `repeat(${gridSize}, 30px)`; // Adjust size as needed
    gridContainer.style.gridTemplateRows = `repeat(${gridSize}, 30px)`;    // Adjust size as needed

    // Create cells for the grid
    for (let i = 0; i < gridSize * gridSize; i++) {
        const cell = document.createElement('div');
        cell.classList.add('grid-cell');
        cell.textContent = ''; // Optionally, you could add content here like numbers
        gridContainer.appendChild(cell);
    }
}

function hideControls() {
    // Hide the controls (header, input, buttons)
    document.getElementById('controls').style.display = 'none';
}

function showHamburgerMenu() {
    const dropdownContainer = document.getElementById('dropdownContainer');
    dropdownContainer.style.display = 'block'; // Show the hamburger menu
}

function hideHamburgerMenu() {
    const dropdownContainer = document.getElementById('dropdownContainer');
    dropdownContainer.style.display = 'none'; // Hide the hamburger menu
}

function positionHamburgerMenu() {
    const gridContainer = document.getElementById('gridContainer');
    const gridRect = gridContainer.getBoundingClientRect();
    const dropdownContainer = document.getElementById('dropdownContainer');
    
    // Position the hamburger menu above the top-left grid cell with adjusted space
    dropdownContainer.style.top = `${gridRect.top - 60}px`; // Adjust to move up
    dropdownContainer.style.left = `${gridRect.left - 10}px`; // Adjust to move left
    dropdownContainer.style.display = 'block'; // Make sure it's visible
}

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
