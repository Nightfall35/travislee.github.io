function uploadImage() {
    const fileInput = document.getElementById('fileInput');
    const galleryContainer = document.getElementById('galleryContainer');

    const file = fileInput.files[0];
    if (file) {
        const reader = new FileReader();
        
        reader.onload = function(event) {
            const img = document.createElement('img');
            img.src = event.target.result;
            img.alt = "User Artwork";
            img.classList.add('gallery-item');
            galleryContainer.appendChild(img);
        }

        reader.readAsDataURL(file);
        fileInput.value = ''; // Clear the file input
    } else {
        alert('Please select an image file to upload.');
    }
}
function uploadImage() {
    const fileInput = document.getElementById('fileInput');
    const galleryContainer = document.getElementById('galleryContainer');

    const file = fileInput.files[0];
    if (file) {
        const reader = new FileReader();
        
        reader.onload = function(event) {
            const img = document.createElement('img');
            img.src = event.target.result;
            img.alt = "User Artwork";
            img.classList.add('gallery-item');
            galleryContainer.appendChild(img);
        }

        reader.readAsDataURL(file);
        fileInput.value = ''; // Clear the file input
    } else {
        alert('Please select an image file to upload.');
    }
}
