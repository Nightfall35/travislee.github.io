// Declare correctKey at the top
const correctKey = "Bill"; // Set your specific key here

// Initialize Fabric.js Canvas
const canvas = new fabric.Canvas("drawingCanvas");
canvas.isDrawingMode = true; // Enable drawing mode
canvas.freeDrawingBrush.width = 5; // Set brush width
canvas.freeDrawingBrush.color = "green"; // Set brush color

// Function to clear the canvas
function clearCanvas() {
    canvas.clear(); // Clear all objects from the canvas
}

// Function to encrypt the message
function encryptMessage() {
    const input = document.getElementById("encryptInput").value;
    const encrypted = CryptoJS.AES.encrypt(input, "my-secret-key").toString();
    document.getElementById("encryptedOutput").textContent = "Encrypted: " + encrypted;
}

// Function to play music (if needed)
function playMusic() {
    const audioElement = document.getElementById('music');
    audioElement.play();
}

// Key input check
function checkKey() {
    const userInput = document.getElementById("keyInput").value;
    if (userInput === correctKey) {
        document.getElementById("overlay").style.display = "none";
        document.getElementById("bgOverlayVideo").style.display = "none"; // Hide overlay video
        document.getElementById("bgMainVideo").style.display = "block"; // Show main video
        document.getElementById("main-content").style.display = "block";
        autoplayMusic(); // Call function to autoplay music
    } else {
        alert("sorry love try again");
    }
}
// Autoplay music function
function autoplayMusic() {
    const audioPlayer = document.getElementById('music');
    audioPlayer.play().catch(error => {
        console.error("Autoplay failed:", error);
        // Handle any errors that occur during autoplay
    });
}
