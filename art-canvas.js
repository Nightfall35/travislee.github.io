const canvas = document.getElementById("artCanvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight * 0.75;

let painting = false;
let brushColor = document.getElementById("colorPicker").value;
let brushSize = document.getElementById("brushSize").value;
let isEraser = false;
let shapesEnabled = false;
let currentShape = 'rectangle'; // Default shape
let folders = {};

// Start painting
canvas.addEventListener("mousedown", (e) => {
    painting = true;
    draw(e);
});

// Stop painting
canvas.addEventListener("mouseup", () => {
    painting = false;
    ctx.beginPath(); // Reset the path
});

// Draw on canvas
canvas.addEventListener("mousemove", (e) => {
    if (painting) {
        draw(e);
    }
});

// Set brush color and size from inputs
document.getElementById("colorPicker").addEventListener("input", (e) => {
    brushColor = e.target.value;
    isEraser = false; // Disable eraser
});

document.getElementById("brushSize").addEventListener("input", (e) => {
    brushSize = e.target.value;
});

// Draw function
function draw(e) {
    if (shapesEnabled) {
        drawShape(e);
    } else {
        ctx.lineWidth = brushSize;
        ctx.lineCap = "round";
        ctx.strokeStyle = isEraser ? "#1a1a1a" : brushColor;

        ctx.lineTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
    }
}

// Draw selected shape
function drawShape(e) {
    const x = e.clientX - canvas.offsetLeft;
    const y = e.clientY - canvas.offsetTop;

    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas for shape redraw
    ctx.beginPath();
    ctx.lineWidth = brushSize;
    ctx.strokeStyle = brushColor;

    switch (currentShape) {
        case 'rectangle':
            ctx.rect(x - brushSize / 2, y - brushSize / 2, brushSize, brushSize);
            break;
        case 'circle':
            ctx.arc(x, y, brushSize / 2, 0, Math.PI * 2);
            break;
        case 'line':
            ctx.moveTo(x, y);
            ctx.lineTo(x + brushSize, y + brushSize);
            break;
    }
    ctx.stroke();
}

// Clear canvas function
function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// Save canvas function
function saveCanvas() {
    const link = document.createElement('a');
    link.download = 'my-painting.png';
    link.href = canvas.toDataURL();
    link.click();
}

// Add artwork to gallery
function addArtwork(event) {
    const file = event.target.files[0];

    if (!file || !file.type.startsWith("image/")) {
        console.error("Selected file is not an image.");
        return;
    }

    const reader = new FileReader();
    
    reader.onload = function(e) {
        const imgSrc = e.target.result;
        const folder = document.getElementById("folderSelect").value;

        if (folder) {
            if (!folders[folder]) {
                folders[folder] = [];
            }
            folders[folder].push(imgSrc);
            updateGallery();
        } else {
            console.error("No folder selected.");
        }
    };

    reader.readAsDataURL(file);
}

// Create new gallery folder
function createFolder() {
    const folderName = prompt("Enter folder name:");
    if (folderName && !folders[folderName]) {
        folders[folderName] = [];
        updateFolderSelect(folderName);
    }
}

// Update folder selection
function updateFolderSelect(folderName) {
    const select = document.getElementById("folderSelect");
    const option = document.createElement("option");
    option.value = folderName;
    option.textContent = folderName;
    select.appendChild(option);
}

// Update gallery display
function updateGallery() {
    const galleryContainer = document.getElementById("galleryContainer");
    galleryContainer.innerHTML = ""; // Clear previous gallery items

    const selectedFolder = document.getElementById("folderSelect").value;
    if (selectedFolder && folders[selectedFolder]) {
        folders[selectedFolder].forEach(src => {
            const galleryItem = document.createElement("div");
            galleryItem.className = "gallery-item";

            const img = document.createElement("img");
            img.src = src;
            img.onclick = () => loadImageToCanvas(src);
            galleryItem.appendChild(img);

            const deleteButton = document.createElement("button");
            deleteButton.className = "delete-button";
            deleteButton.innerText = "Delete";
            deleteButton.onclick = () => {
                folders[selectedFolder] = folders[selectedFolder].filter(item => item !== src);
                updateGallery();
            };
            galleryItem.appendChild(deleteButton);

            galleryContainer.appendChild(galleryItem);
        });
    }
}

// Load image to canvas
function loadImageToCanvas(src) {
    const img = new Image();
    img.src = src;
    img.onload = () => {
        clearCanvas();
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    };
}

// Toggle gallery overlay
function toggleGalleryOverlay() {
    const overlay = document.getElementById("galleryOverlay");
    overlay.style.display = overlay.style.display === "none" || overlay.style.display === "" ? "block" : "none";
}

// Play music
function playMusic() {
    const audioPlayer = document.getElementById("music");
    audioPlayer.play().catch(error => {
        console.error("Error playing audio:", error);
    });
}

// Toggle shapes tools
function toggleShapeTools() {
    shapesEnabled = !shapesEnabled;
}

// Toggle eraser tool
function toggleEraser() {
    isEraser = !isEraser;
    brushColor = isEraser ? "#1a1a1a" : document.getElementById("colorPicker").value;
}
