// Initialize AOS
document.addEventListener('DOMContentLoaded', () => {
    AOS.init({
        duration: 1000,
        easing: 'ease-in-out',
        once: false,
        mirror: false
    });

    // Initialize particles.js - dark theme configuration
    particlesJS('particles-js', {
        "particles": {
            "number": {
                "value": 80,
                "density": {
                    "enable": true,
                    "value_area": 800
                }
            },
            "color": {
                "value": "#6c63ff"
            },
            "shape": {
                "type": "circle",
                "stroke": {
                    "width": 0,
                    "color": "#000000"
                },
                "polygon": {
                    "nb_sides": 5
                }
            },
            "opacity": {
                "value": 0.4,
                "random": true,
                "anim": {
                    "enable": true,
                    "speed": 1,
                    "opacity_min": 0.1,
                    "sync": false
                }
            },
            "size": {
                "value": 3,
                "random": true,
                "anim": {
                    "enable": true,
                    "speed": 2,
                    "size_min": 0.1,
                    "sync": false
                }
            },
            "line_linked": {
                "enable": true,
                "distance": 150,
                "color": "#6c63ff",
                "opacity": 0.2,
                "width": 1
            },
            "move": {
                "enable": true,
                "speed": 1,
                "direction": "none",
                "random": true,
                "straight": false,
                "out_mode": "out",
                "bounce": false,
                "attract": {
                    "enable": true,
                    "rotateX": 600,
                    "rotateY": 1200
                }
            }
        },
        "interactivity": {
            "detect_on": "canvas",
            "events": {
                "onhover": {
                    "enable": true,
                    "mode": "grab"
                },
                "onclick": {
                    "enable": true,
                    "mode": "push"
                },
                "resize": true
            },
            "modes": {
                "grab": {
                    "distance": 140,
                    "line_linked": {
                        "opacity": 0.6
                    }
                },
                "bubble": {
                    "distance": 400,
                    "size": 40,
                    "duration": 2,
                    "opacity": 8,
                    "speed": 3
                },
                "repulse": {
                    "distance": 200,
                    "duration": 0.4
                },
                "push": {
                    "particles_nb": 4
                },
                "remove": {
                    "particles_nb": 2
                }
            }
        },
        "retina_detect": true
    });

    // Load messages from JSON
    loadMessages();
    
    // Initialize typewriter effect
    const typewriter = document.querySelector('.typewrite');
    if (typewriter) {
        const textList = JSON.parse(typewriter.getAttribute('data-type'));
        new Typewriter(typewriter, textList);
    }

    // Initialize scroll animation for message containers
    initMessageAnimations();
});

// Load messages from JSON file
async function loadMessages() {
    try {
        const response = await fetch('messages.json');
        const messages = await response.json();
        displayMessages(messages);
        
        // Initialize animations after messages are loaded
        setTimeout(() => {
            initMessageAnimations();
        }, 100);
    } catch (error) {
        console.error('Error loading messages:', error);
        document.getElementById('messages-container').innerHTML = '<p class="text-center">Error loading messages. Please try again later.</p>';
    }
}

// Display messages in timeline format
function displayMessages(messages) {
    const container = document.getElementById('messages-container');
    
    messages.forEach((message, index) => {
        const position = index % 2 === 0 ? 'left' : 'right';
        const delay = 100 * index;
        
        const messageElement = document.createElement('div');
        messageElement.className = `message-container ${position}`;
        messageElement.setAttribute('data-position', position);
        
        messageElement.innerHTML = `
            <div class="message-content">
                <h3>${message.name}</h3>
                <p>${message.message}</p>
            </div>
        `;
        
        container.appendChild(messageElement);
    });
}

// Initialize scroll-based animations for messages
function initMessageAnimations() {
    const messageContainers = document.querySelectorAll('.message-container');
    
    // Set up the intersection observer
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const position = element.getAttribute('data-position');
                
                // Add appropriate animation class based on position
                if (position === 'left') {
                    element.classList.add('fade-in-left');
                } else {
                    element.classList.add('fade-in-right');
                }
                
                element.classList.add('animated');
                
                // Stop observing this element
                observer.unobserve(element);
            }
        });
    }, {
        root: null,
        threshold: 0.2,
        rootMargin: '0px 0px -100px 0px'
    });
    
    // Start observing each message container
    messageContainers.forEach(container => {
        observer.observe(container);
    });
}

// Typewriter effect
class Typewriter {
    constructor(el, texts) {
        this.el = el;
        this.texts = texts;
        this.loopNum = 0;
        this.period = parseInt(el.getAttribute('data-period'), 10) || 2000;
        this.txt = '';
        this.isDeleting = false;
        this.tick();
    }
    
    tick() {
        const i = this.loopNum % this.texts.length;
        const fullTxt = this.texts[i];
        
        if (this.isDeleting) {
            this.txt = fullTxt.substring(0, this.txt.length - 1);
        } else {
            this.txt = fullTxt.substring(0, this.txt.length + 1);
        }
        
        this.el.textContent = this.txt;
        
        let delta = 200 - Math.random() * 100;
        
        if (this.isDeleting) { delta /= 2; }
        
        if (!this.isDeleting && this.txt === fullTxt) {
            delta = this.period;
            this.isDeleting = true;
        } else if (this.isDeleting && this.txt === '') {
            this.isDeleting = false;
            this.loopNum++;
            delta = 500;
        }
        
        setTimeout(() => this.tick(), delta);
    }
}

// Smooth scrolling for anchor links
document.querySelectorAll('a.scroll-btn').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        window.scrollTo({
            top: targetElement.offsetTop,
            behavior: 'smooth'
        });
    });
});