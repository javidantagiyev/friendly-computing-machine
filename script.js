const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const successMessage = document.getElementById('successMessage');
const questionBox = document.querySelector('.question-box');

const ESCAPE_DISTANCE = 100; // Distance at which NO button runs away
const ESCAPE_SPEED = 15; // How far it moves

// YES button click handler
yesBtn.addEventListener('click', () => {
    questionBox.style.display = 'none';
    successMessage.style.display = 'block';
    createConfetti();
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
    
    // If cursor is too close, make button run away
    if (distance < ESCAPE_DISTANCE) {
        // Calculate escape direction (opposite of cursor)
        const angle = Math.atan2(distY, distX);
        const escapeX = btnCenterX - Math.cos(angle) * ESCAPE_SPEED;
        const escapeY = btnCenterY - Math.sin(angle) * ESCAPE_SPEED;
        
        // Keep button within viewport
        const maxX = window.innerWidth - noBtnRect.width;
        const maxY = window.innerHeight - noBtnRect.height;
        const constrainedX = Math.max(0, Math.min(escapeX - noBtnRect.width / 2, maxX));
        const constrainedY = Math.max(0, Math.min(escapeY - noBtnRect.height / 2, maxY));
        
        noBtn.style.position = 'fixed';
        noBtn.style.left = constrainedX + 'px';
        noBtn.style.top = constrainedY + 'px';
    }
});

// Create confetti effect
function createConfetti() {
    const emojis = ['💕', '✨', '🎉', '💖', '🌹', '💝', '🎊', '💑'];
    
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.classList.add('confetti');
        confetti.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        
        // Random starting position
        confetti.style.left = Math.random() * window.innerWidth + 'px';
        confetti.style.top = '-20px';
        
        // Random animation duration
        const duration = Math.random() * 2 + 2.5;
        confetti.style.animationDuration = duration + 's';
        
        // Random delay
        confetti.style.animationDelay = Math.random() * 0.3 + 's';
        
        document.body.appendChild(confetti);
        
        // Remove confetti after animation
        setTimeout(() => {
            confetti.remove();
        }, (duration + 0.5) * 1000);
    }
}
