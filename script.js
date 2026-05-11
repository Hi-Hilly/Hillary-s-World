function openPopup(id) {
    const popup = document.getElementById(id);
    popup.style.display = 'flex';
    // prevent body scroll when popup open
    document.body.style.overflow = 'hidden';
}
 
function closePopup(id) {
    const popup = document.getElementById(id);
    popup.style.display = 'none';
    document.body.style.overflow = '';
}
 
// Close popup when clicking the dark overlay (outside the box)
document.querySelectorAll('.popup').forEach(popup => {
    popup.addEventListener('click', function(e) {
        if (e.target === this) {
            this.style.display = 'none';
            document.body.style.overflow = '';
        }
    });
});
 
// Close popup with Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        document.querySelectorAll('.popup').forEach(popup => {
            popup.style.display = 'none';
        });
        document.body.style.overflow = '';
    }
});