let currentIndex = 0;

const photoElement = document.querySelector('.main-photo');
const captionElement = document.querySelector('.photo-caption');
const prevButton = document.querySelector('.prev');
const nextButton = document.querySelector('.next');
const thumbnailWrapper = document.getElementById('thumbnailWrapper');

// Create thumbnails
function createThumbnails() {
    photos.forEach((photo, index) => {
        const img = document.createElement('img');
        img.src = photo.src;
        img.alt = `Thumbnail ${index + 1}`;
        img.classList.add('thumbnail');
        if (index === 0) img.classList.add('active');

        img.addEventListener('click', () => {
            currentIndex = index;
            updatePhoto(currentIndex);
        });

        thumbnailWrapper.appendChild(img);
    });
}

function updatePhoto(index) {
    photoElement.classList.remove('loaded');

    setTimeout(() => {
        photoElement.src = photos[index].src;
        captionElement.textContent = photos[index].caption;

        // Update active thumbnail
        document.querySelectorAll('.thumbnail').forEach((thumb, i) => {
            thumb.classList.toggle('active', i === index);
        });

        // Scroll thumbnail into view
        const activeThumbnail = document.querySelectorAll('.thumbnail')[index];
        if (activeThumbnail) {
            activeThumbnail.scrollIntoView({
                behavior: 'smooth',
                block: 'nearest',
                inline: 'center'
            });
        }

        photoElement.onload = () => {
            photoElement.classList.add('loaded');
        };
    }, 200);
}

function nextPhoto() {
    currentIndex = (currentIndex + 1) % photos.length;
    updatePhoto(currentIndex);
}

function prevPhoto() {
    currentIndex = (currentIndex - 1 + photos.length) % photos.length;
    updatePhoto(currentIndex);
}

prevButton.addEventListener('click', prevPhoto);
nextButton.addEventListener('click', nextPhoto);

// Keyboard controls
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
        prevPhoto();
    } else if (e.key === 'ArrowRight') {
        nextPhoto();
    }
});

// Touch swipe support
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
});

document.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    if (touchEndX < touchStartX - 50) {
        nextPhoto();
    }
    if (touchEndX > touchStartX + 50) {
        prevPhoto();
    }
}

// Initialize thumbnails and first photo
createThumbnails();
updatePhoto(currentIndex);
