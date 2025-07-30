const container = document.getElementById('container');
const newSketch = document.querySelector('.new');
const gridSize = document.getElementById('gridSizeInput');
const showGrid = document.querySelector('.toggle');
const eraser = document.querySelector('.eraser');
const randomColor = document.querySelector('.rainbow');
const changeGradient = document.querySelector('.gradient');
const squares = container.children;

let showBorders = false;
let currentMode = 'red';

function resetGrid() {
    container.innerHTML = ''
    createGrid();
};

function createGrid() {
    let size = parseInt(gridSize.value);

    if (size > 100) size = 100; // Max grid size = 100

    container.style.display = 'flex';
    container.style.flexWrap = 'wrap';
    container.style.maxWidth = '800px';
    container.style.margin = '0 auto';

    const maxWidth = 800;
    const squareSize = maxWidth / size;

    for (let i = 0; i < size * size; i++) {
        let newDiv = document.createElement('div');
        newDiv.style.width = (squareSize) + 'px';
        newDiv.style.height = (squareSize) + 'px';

        // Box coloring
        newDiv.addEventListener('mouseenter', () => {
            if (currentMode === 'red') {
                newDiv.style.backgroundColor = 'red';
            } else if (currentMode === 'erase') {
                newDiv.style.backgroundColor = 'white'
            } else if (currentMode === 'rainbow') {
                newDiv.style.backgroundColor = getRandomColor();
            } else if (currentMode === 'gradient') {
                const currentColor = window.getComputedStyle(newDiv).backgroundColor;
                newDiv.style.backgroundColor = getDarker(currentColor);
            };
        });
        
        // Keeps borders on through resets
        if (showBorders) {
            newDiv.style.border = '1px solid black';
            newDiv.style.boxSizing = 'border-box';
        }

        container.appendChild(newDiv);
    };
};

// Change grid size
gridSize.addEventListener('input', () => {
    currentMode = 'red';
    resetGrid();
});

// New sketch button
newSketch.addEventListener('click', () => {
    resetGrid();
});

// Toggle border lines
showGrid.addEventListener('click', () => {
    showBorders = !showBorders;
    for (let square of squares) {
        square.style.boxSizing = 'border-box';
        square.style.border = square.style.border ? '' : '1px solid black';
    };
});

// Toggle eraser
eraser.addEventListener('click', () => {
    currentMode = 'erase';
});

// Toggle rainbow
function getRandomColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
};

randomColor.addEventListener('click', () => {
    currentMode = 'rainbow';
});

// Toggle gradient
function getDarker(color) {
    let current = color.match(/\d+/g);
    if (!current) return 'rgb(230,230,230)';
    let [r, g, b] = current.map(Number);
    r = Math.max(r - 25, 0);
    g = Math.max(g - 25, 0);
    b = Math.max(b - 25, 0);
    return `rgb(${r}, ${g}, ${b})`;
};

changeGradient.addEventListener('click', () => {
    currentMode = 'gradient';
});