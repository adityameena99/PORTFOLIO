function loco() {
    gsap.registerPlugin(ScrollTrigger);

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

const locoScroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy("#main", {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
});


// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();

}
loco();

const canvas = document.getElementById("interactiveCanvas");
const ctx = canvas.getContext("2d");

// Resize canvas to fit the window
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

resizeCanvas();
window.addEventListener("resize", resizeCanvas);

// Create a particle class for 3D behavior
class Particle {
  constructor(x, y, z, radius, velocity, color) {
    this.x = x;
    this.y = y;
    this.z = z; // Depth
    this.radius = radius;
    this.velocity = velocity;
    this.color = color;
  }

  draw() {
    const scale = 200 / (200 + this.z); // Perspective effect
    const x2D = this.x * scale + canvas.width / 2;
    const y2D = this.y * scale + canvas.height / 2;
    const size2D = this.radius * scale;

    ctx.beginPath();
    ctx.arc(x2D, y2D, size2D, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }

  update(mouse) {
    const distX = mouse.x - (this.x + canvas.width / 2);
    const distY = mouse.y - (this.y + canvas.height / 2);
    const dist = Math.sqrt(distX ** 2 + distY ** 2);

    // Interactive behavior
    if (dist < 150) {
      const angle = Math.atan2(distY, distX);
      this.x -= Math.cos(angle) * 5;
      this.y -= Math.sin(angle) * 5;
    }

    // Movement in 3D space
    this.z -= this.velocity.z;

    // Reset particle if it moves out of bounds
    if (this.z <= 0) {
      this.z = 200;
      this.x = Math.random() * canvas.width - canvas.width / 2;
      this.y = Math.random() * canvas.height - canvas.height / 2;
    }

    this.draw();
  }
}

// Initialize particles
const particles = [];
function initParticles() {
  particles.length = 0; // Clear existing particles
  const colors = ["#ff4d6d", "#5cdbff", "#ffe066", "#82e09b"];
  for (let i = 0; i < 200; i++) {
    const x = Math.random() * canvas.width - canvas.width / 2;
    const y = Math.random() * canvas.height - canvas.height / 2;
    const z = Math.random() * 200;
    const radius = Math.random() * 2 + 1;
    const velocity = { z: Math.random() * 2 + 0.1 };
    const color = colors[Math.floor(Math.random() * colors.length)];
    particles.push(new Particle(x, y, z, radius, velocity, color));
  }
}

// Mouse position tracking
const mouse = { x: canvas.width / 2, y: canvas.height / 2 };
canvas.addEventListener("mousemove", (e) => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

// Animation loop
function animateParticles() {
  ctx.fillStyle = "rgba(13, 17, 23, 0.9)"; // Semi-transparent background for trail effect
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  particles.forEach((particle) => particle.update(mouse));
  requestAnimationFrame(animateParticles);
}

// Initialize and animate
initParticles();
animateParticles();


const container = document.querySelector('#img');

    container.addEventListener('mouseenter', () => {
      container.addEventListener('mousemove', (e) => {
        const rect = container.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20;
        const y = ((e.clientY - rect.top) / rect.height - 0.5) * 20;

        container.style.transform = `rotateX(${-y}deg) rotateY(${x}deg)`;
      });
    });

    container.addEventListener('mouseleave', () => {
      container.style.transform = 'rotateX(0) rotateY(0)';
    });

    const customCursor = document.querySelector('#cursor');

    // Add a mousemove event listener
    document.addEventListener('mousemove', (e) => {
        // Update the position of the custom cursor
        cursor.style.left = `${e.clientX}px`;
        cursor.style.top = `${e.clientY}px`;
    });


    gsap.to('#ri', {
      x:-200, // Full rotation
      // repeat: -1,    // Infinite rotation
      duration: 2,   // Duration of one full rotation (5 seconds)
      delay:4,
      ease: "linear", // Smooth rotation without acceleration
    });

    
    gsap.to('#loader', {
      x:-2000, // Full rotation
      // repeat: -1,    // Infinite rotation
      duration: 2,   // Duration of one full rotation (5 seconds)
      delay:2,
      ease: "linear", // Smooth rotation without acceleration
    });

    