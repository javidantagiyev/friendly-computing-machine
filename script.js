const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const successMessage = document.getElementById('successMessage');
const questionBox = document.querySelector('.question-box');

const ESCAPE_DISTANCE = 120; // Distance at which NO button starts escaping
const ESCAPE_SPEED = 5; // Slow escape speed
let isEscaping = false;

// YES button click handler
yesBtn.addEventListener('click', () => {
    questionBox.style.display = 'none';
    successMessage.style.display = 'block';
});

// NO button escape logic
document.addEventListener('mousemove', (e) => {
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    
    const noBtnRect = noBtn.getBoundingClientRect();
    const btnCenterX = noBtnRect.left + noBtnRect.width / 2;
    const btnCenterY = noBtnRect.top + noBtnRect.height / 2;
    
    // Calculate distance between cursor and button center
    const distX = mouseX - btnCenterX;
    const distY = mouseY - btnCenterY;
    const distance = Math.sqrt(distX * distX + distY * distY);
    
    // If cursor is too close, make button run away slowly
    if (distance < ESCAPE_DISTANCE) {
        isEscaping = true;
        
        // Calculate escape direction (opposite of cursor)
        const angle = Math.atan2(distY, distX);
        const escapeX = btnCenterX - Math.cos(angle) * ESCAPE_SPEED;
        const escapeY = btnCenterY - Math.sin(angle) * ESCAPE_SPEED;
        
        // Keep button within viewport with padding
        const padding = 20;
        const maxX = window.innerWidth - noBtnRect.width - padding;
        const maxY = window.innerHeight - noBtnRect.height - padding;
        const constrainedX = Math.max(padding, Math.min(escapeX - noBtnRect.width / 2, maxX));
        const constrainedY = Math.max(padding, Math.min(escapeY - noBtnRect.height / 2, maxY));
        
        noBtn.style.position = 'fixed';
        noBtn.style.left = constrainedX + 'px';
        noBtn.style.top = constrainedY + 'px';
    } else {
        isEscaping = false;
    }
});

// Reset button position if mouse leaves the window
document.addEventListener('mouseleave', () => {
    isEscaping = false;
});
