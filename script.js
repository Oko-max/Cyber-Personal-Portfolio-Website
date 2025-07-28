document.addEventListener('DOMContentLoaded', function() {
    const cube = document.querySelector('.cube');
    const cubeContainer = document.querySelector('.cube-container');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const dots = document.querySelectorAll('.dot');
    const faces = document.querySelectorAll('.face');
    const sideNavLinks = document.querySelectorAll('.side-nav .nav-link');
    
    let currentFace = 0;
    const totalFaces = faces.length; // Dynamically get total faces
    let isMobile = window.innerWidth <= 768; // Initial mobile check
    
    // Rotation values for desktop (corresponds to each face index)
    // IMPORTANT: Ensure th is order matches the logical order of faces in HTML
    // Face 0: Front (Home)
    // Face 1: Right (Skills)
    // Face 2: Back (Education & Experience)
    // Face 3: Left (Projects)
    // Face 4: Top (About Me)
    // Face 5: Bottom (Contact Me)
    const rotationValues = [
        'rotateX(-10deg) rotateY(0deg)',     // 0: Front (Home)
        'rotateX(-10deg) rotateY(-90deg)',   // 1: Right (Skills)
        'rotateX(-10deg) rotateY(-180deg)',  // 2: Back (Education & Experience)
        'rotateX(-10deg) rotateY(90deg)',    // 3: Left (Projects)
        'rotateX(-100deg) rotateY(0deg)',    // 4: Top (About Me)
        'rotateX(80deg) rotateY(0deg)'       // 5: Bottom (Contact Me)
    ];
    
    function updateCube() {
        if (isMobile) {
            // Mobile: Show/hide faces by toggling 'active' class
            faces.forEach((face, index) => {
                face.classList.remove('active');
                if (index === currentFace) {
                    face.classList.add('active');
                }
            });
        } else {
            // Desktop: Rotate the entire cube
            cube.style.transform = rotationValues[currentFace];
        }
        
        // Update dots to reflect current face
        dots.forEach((dot, index) => {
            dot.classList.remove('active');
            if (index === currentFace) {
                dot.classList.add('active');
            }
        });
    }
    
    function nextFace() {
        currentFace = (currentFace + 1) % totalFaces;
        updateCube();
    }
    
    function prevFace() {
        currentFace = (currentFace - 1 + totalFaces) % totalFaces; // Ensures positive index
        updateCube();
    }
    
    // Button event listeners (Prev/Next)
    nextBtn.addEventListener('click', nextFace);
    prevBtn.addEventListener('click', prevFace);
    
    // Dot navigation event listeners
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentFace = index;
            updateCube();
        });
    });

    // Side navigation link event listeners
    sideNavLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault(); // Prevent default link behavior
            const targetFaceIndex = parseInt(this.dataset.targetFace);
            if (!isNaN(targetFaceIndex) && targetFaceIndex >= 0 && targetFaceIndex < totalFaces) {
                currentFace = targetFaceIndex;
                updateCube();
            }
        });
    });
    
    // Keyboard navigation (Arrow Left/Right)
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') {
            nextFace();
        } else if (e.key === 'ArrowLeft') {
            prevFace();
        }
    });
    
    // Handle window resize to switch between mobile/desktop modes
    function handleResize() {
        const newIsMobile = window.innerWidth <= 768;
        if (newIsMobile !== isMobile) {
            isMobile = newIsMobile;
            updateCube(); // Re-render cube based on new mode
        }
    }
    
    // Generate and animate binary background
    function generateBinary() {
        const binaryChars = '01';
        const binaryElement = document.querySelector('.binary-background');
        let binaryText = '';
        // Calculate columns and rows based on current window size and desired character size
        // These values are approximate and might need fine-tuning based on font rendering
        const charWidth = 14; 
        const charHeight = 16; 
        const columns = Math.floor(window.innerWidth / charWidth);
        const rows = Math.floor(window.innerHeight / charHeight);
        
        for (let i = 0; i < rows; i++) {
            let row = '';
            for (let j = 0; j < columns; j++) {
                row += binaryChars.charAt(Math.floor(Math.random() * binaryChars.length));
            }
            binaryText += row + '\n';
        }
        binaryElement.textContent = binaryText;
    }

    // Animate binary background by regenerating it periodically
    let binaryInterval;
    function startBinaryAnimation() {
        clearInterval(binaryInterval); // Clear any existing interval
        generateBinary(); // Initial generation
        // Slower rainfall speed: regenerate every 500ms instead of 200ms
        binaryInterval = setInterval(generateBinary, 500); 
    }
    
    // Add glitch effect randomly
    setInterval(() => {
        if (Math.random() > 0.7) { // 30% chance for a glitch
            document.body.classList.add('glitch');
            setTimeout(() => {
                document.body.classList.remove('glitch');
            }, 200); // Glitch duration
        }
    }, 5000); // Check for glitch every 5 seconds
    
    // Initialize functions on page load
    window.addEventListener('resize', handleResize);
    window.addEventListener('resize', startBinaryAnimation); // Re-generate binary on resize
    handleResize(); // Initial check for mobile/desktop
    startBinaryAnimation(); // Start binary animation
    updateCube(); // Initial cube display
});
