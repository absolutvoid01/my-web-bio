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

const projectCarousel = document.querySelector('.project-carousel');
const previousProject = document.querySelector('.project-arrow-prev');
const nextProject = document.querySelector('.project-arrow-next');
const projectCards = [...projectCarousel.querySelectorAll('.project-card')];
let currentProjectIndex = 0;

const updateProjectArrows = () => {
	previousProject.disabled = currentProjectIndex === 0;
	nextProject.disabled = currentProjectIndex === projectCards.length - 1;
};

const scrollProjects = (direction) => {
	currentProjectIndex = Math.max(0, Math.min(currentProjectIndex + direction, projectCards.length - 1));
	const projectCard = projectCards[currentProjectIndex];
	const projectTrack = document.querySelector('.project-track');
	const gap = parseFloat(getComputedStyle(projectTrack).gap) || 0;
	const centeredOffset = (projectCarousel.clientWidth - projectCard.getBoundingClientRect().width) / 2;
	const maximumScroll = projectCarousel.scrollWidth - projectCarousel.clientWidth;
	const targetScroll = Math.max(0, Math.min(projectCard.offsetLeft - centeredOffset, maximumScroll));

	projectCarousel.scrollTo({
		left: targetScroll,
		behavior: 'smooth',
	});
	updateProjectArrows();
};

previousProject.addEventListener('click', () => scrollProjects(-1));
nextProject.addEventListener('click', () => scrollProjects(1));
window.addEventListener('resize', updateProjectArrows);
updateProjectArrows();

