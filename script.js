const menuToggle = document.querySelector('.menu-toggle');
const menuLinks = document.querySelector('.menu-links');
const contactLink = document.querySelector('.menu-contact');
const skillsLink = document.querySelector('.skill-button');

menuToggle.addEventListener('click', () => {
	const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
	menuToggle.setAttribute('aria-expanded', String(!isOpen));
	menuToggle.setAttribute('aria-label', isOpen ? 'Open menu' : 'Close menu');
	menuLinks.classList.toggle('is-open', !isOpen);
});

menuLinks.querySelectorAll('a').forEach((link) => {
	link.addEventListener('click', () => {
		menuToggle.setAttribute('aria-expanded', 'false');
		menuToggle.setAttribute('aria-label', 'Open menu');
		menuLinks.classList.remove('is-open');
	});
});

contactLink.addEventListener('click', (event) => {
	event.preventDefault();
	document.getElementById('contact').scrollIntoView({
		behavior: 'smooth',
		block: 'center'
	});
});

skillsLink.addEventListener('click', (event) => {
	event.preventDefault();
	document.getElementById('skills-overview').scrollIntoView({
		behavior: 'smooth',
		block: 'center'
	});
});

