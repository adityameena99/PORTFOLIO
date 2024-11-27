
document.querySelectorAll(".neon-button").forEach((button) => {
	button.addEventListener("click", function (e) {
		const numDrops = 10;
		const rect = button.getBoundingClientRect();

		for (let i = 0; i < numDrops; i++) {
			const drop = document.createElement("span");
			drop.classList.add("drop");

			const x = rect.left + rect.width / 2 + (Math.random() - 0.5) * 60;
			const y = rect.top + rect.height / 2 + (Math.random() - 0.5) * 60;

			drop.style.left = `${x}px`;
			drop.style.top = `${y}px`;

			document.body.appendChild(drop);

			setTimeout(() => {
				drop.remove();
			}, 5000);
		}
	});
});
gsap.to('#loader', {
	x:-2000, 
	duration: 2,   
	delay:2,
	ease: "linear", 
  });
  const customCursor = document.querySelector('#cursor');
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = `${e.clientX}px`;
        cursor.style.top = `${e.clientY}px`;
    });
