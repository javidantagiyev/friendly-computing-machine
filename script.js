const noBtn = document.getElementById('noBtn');
const yesBtn = document.getElementById('yesBtn');
const successMessage = document.getElementById('successMessage');

// Make the NO button run away from cursor
document.addEventListener('mousemove', (e) => {
    const noBtnRect = noBtn.getBoundingClientRect();
    const noBtnCenterX = noBtnRect.left + noBtnRect.width / 2;
    const noBtnCenterY = noBtnRect.top + noBtnRect.height / 2;
    
    const distanceX = e.clientX - noBtnCenterX;
    const distanceY = e.clientY - noBtnCenterY;
    const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
    
    // If cursor is within 150px of the button, make it run away
    if (distance < 150) {
        const angle = Math.atan2(distanceY, distanceX);
        const runDistance = 150;
        
        const newX = noBtnCenterX - Math.cos(angle) * runDistance;
        const newY = noBtnCenterY - Math.sin(angle) * runDistance;
        
        // Keep button within viewport
        const boundedX = Math.max(20, Math.min(window.innerWidth - noBtnRect.width - 20, newX - noBtnRect.width / 2));
        const boundedY = Math.max(20, Math.min(window.innerHeight - noBtnRect.height - 20, newY - noBtnRect.height / 2));
        
        noBtn.style.position = 'fixed';
        noBtn.style.left = boundedX + 'px';
        noBtn.style.top = boundedY + 'px';
    }
});

// YES button functionality
yesBtn.addEventListener('click', () => {
    successMessage.classList.add('show');
    noBtn.style.display = 'none';
    yesBtn.textContent = 'YES!!! 💕💕💕';
    yesBtn.style.pointerEvents = 'none';
    
    // Add some celebratory confetti effect with emojis
    createConfetti();
});

// Optional: Prevent NO button from being clicked (it will run away)
noBtn.addEventListener('click', (e) => {
    e.preventDefault();
});

// Create celebratory confetti
function createConfetti() {
    const emojis = ['💕', '✨', '🎉', '💖', '🌹', '💫', '🎊'];
    const container = document.querySelector('.container');
    
    for (let i = 0; i < 20; i++) {
        const confetti = document.createElement('div');
        confetti.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        confetti.style.position = 'fixed';
        confetti.style.left = Math.random() * window.innerWidth + 'px';
        confetti.style.top = '-30px';
        confetti.style.fontSize = (Math.random() * 20 + 20) + 'px';
        confetti.style.animation = `fall ${Math.random() * 2 + 2}s linear`;
        confetti.style.pointerEvents = 'none';
        confetti.style.zIndex = '1000';
        document.body.appendChild(confetti);
        
        setTimeout(() => confetti.remove(), 3000);
    }
}

// Add falling animation
const style = document.createElement('style');
style.textContent = `
    @keyframes fall {
        to {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
