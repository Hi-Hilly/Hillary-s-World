// ===========================
// PIXEL ART AVATAR
// ===========================
function pixelateImage(imgEl, canvasEl) {
    // How many pixel blocks across/tall (lower = chunkier)
    const BLOCKS = 16; // 24x24 grid of big squares = very chunky pixel art

    // Internal canvas resolution = blocks * blockSize
    // We'll draw at 480x480 internally then CSS scales it to 150px
    const BLOCK_PX = 20; // each block is 20x20 internal pixels
    const canvasSize = BLOCKS * BLOCK_PX;

    canvasEl.width = canvasSize;
    canvasEl.height = canvasSize;

    const ctx = canvasEl.getContext('2d');
    ctx.imageSmoothingEnabled = false;

    // Step 1: draw image into tiny BLOCKS x BLOCKS offscreen canvas
    const off = document.createElement('canvas');
    off.width = BLOCKS;
    off.height = BLOCKS;
    const offCtx = off.getContext('2d');
    offCtx.imageSmoothingEnabled = false;
    offCtx.drawImage(imgEl, 0, 0, BLOCKS, BLOCKS);

    // Step 2: read each tiny pixel, paint a big filled square
    const data = offCtx.getImageData(0, 0, BLOCKS, BLOCKS).data;

    for (let y = 0; y < BLOCKS; y++) {
        for (let x = 0; x < BLOCKS; x++) {
            const idx = (y * BLOCKS + x) * 4;
            const r = data[idx];
            const g = data[idx + 1];
            const b = data[idx + 2];
            const a = data[idx + 3] / 255;

            // Fill the big block
            ctx.fillStyle = `rgba(${r},${g},${b},${a})`;
            ctx.fillRect(x * BLOCK_PX, y * BLOCK_PX, BLOCK_PX, BLOCK_PX);

            // Draw 1px dark grid line between blocks for pixel art look
            ctx.strokeStyle = 'rgba(0,0,0,0.15)';
            ctx.lineWidth = 1;
            ctx.strokeRect(x * BLOCK_PX, y * BLOCK_PX, BLOCK_PX, BLOCK_PX);
        }
    }
}

function initAvatar() {
    const img = document.getElementById('avatarSrc');
    const canvas = document.getElementById('avatarCanvas');
    if (!img || !canvas) return;

    if (img.complete && img.naturalWidth > 0) {
        pixelateImage(img, canvas);
    } else {
        img.addEventListener('load', () => pixelateImage(img, canvas));
        img.addEventListener('error', () => {
            canvas.style.display = 'none';
            img.style.display = 'block';
            img.className = 'pixel-avatar';
        });
    }
}

document.addEventListener('DOMContentLoaded', initAvatar);

// ===========================
// POPUP
// ===========================
function openPopup(id) {
    const popup = document.getElementById(id);
    popup.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function closePopup(id) {
    const popup = document.getElementById(id);
    popup.style.display = 'none';
    document.body.style.overflow = '';
}

// Close popup when clicking the dark overlay (outside the box)
document.querySelectorAll('.popup').forEach(popup => {
    popup.addEventListener('click', function (e) {
        if (e.target === this) {
            this.style.display = 'none';
            document.body.style.overflow = '';
        }
    });
});

// Close popup with Escape key
document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
        document.querySelectorAll('.popup').forEach(popup => {
            popup.style.display = 'none';
        });
        document.body.style.overflow = '';
    }
});
