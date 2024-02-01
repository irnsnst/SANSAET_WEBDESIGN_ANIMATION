// Get the canvas element from the DOM
const canvas = document.querySelector('canvas');
// Get the 2D rendering context from the canvas
const ctx = canvas.getContext('2d');

// Function to initialize the canvas
function initializeCanvas() {
    // Set the canvas width and height to match the window's inner width and height
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Set initial fill to black
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Set the line join, line cap, and line width for the drawing context
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
    ctx.lineWidth = 150;

    // Set the global composite operation to 'destination-out'
    ctx.globalCompositeOperation = 'destination-out';
}

// Call the initializeCanvas function to set up the canvas
initializeCanvas();

// Variables to keep track of the drawing state and the last known coordinates
let isDrawing = false;
let lastX = 0;
let lastY = 0;

// Function to draw on the canvas
function draw(e) {
    // If not currently drawing, return immediately
    if (!isDrawing) return;

    // Variables to hold the current coordinates
    let x, y;
    if (e.touches && e.touches.length > 0) {
        // If it's a touch event, get the coordinates from the touch point
        x = e.touches[0].clientX;
        y = e.touches[0].clientY;
    } else {
        // If it's a mouse event, get the coordinates from the mouse position
        x = e.clientX;
        y = e.clientY;
    }

    // Start a new path, move to the last known coordinates, draw a line to the current coordinates, and stroke the path
    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(x, y);
    ctx.stroke();
    // Update the last known coordinates
    [lastX, lastY] = [x, y];
}

// Add event listeners for mousedown and touchstart events to start drawing and set the initial coordinates
canvas.addEventListener('mousedown', (e) => {
    isDrawing = true;
    [lastX, lastY] = [e.clientX, e.clientY];
});

canvas.addEventListener('touchstart', (e) => {
    isDrawing = true;
    [lastX, lastY] = [e.touches[0].clientX, e.touches[0].clientY];
});

// Add event listeners for mousemove and touchmove events to draw when the mouse or a touch point moves
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('touchmove', draw);

// Function to end drawing
function endDrawing() {
    isDrawing = false;
}

// Add event listeners for mouseup, touchend, and mouseout events to end drawing
canvas.addEventListener('mouseup', endDrawing);
canvas.addEventListener('touchend', endDrawing);
canvas.addEventListener('mouseout', endDrawing);

// Add a resize event listener on the window to re-initialize the canvas and redraw the content when the window size changes
window.addEventListener('resize', () => {
    initializeCanvas();
    redrawContent();
});

// Function to play a video
function playVideo(videoSource) {
    // Log the video source
    console.log(`Playing video: ${videoSource}`);
    // Get the video element from the DOM, set its source, load the video, and start playing it
    const video = document.getElementById('myVideo');
    video.src = `video/${videoSource}`;
    video.load();
    video.play();
}