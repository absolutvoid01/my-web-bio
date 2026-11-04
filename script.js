const pageTransitionDuration = 400;

const showPage = () => {
	document.body.classList.add('fade-in');
};

document.addEventListener('DOMContentLoaded', showPage);
window.addEventListener('pageshow', showPage);

document.addEventListener('click', (event) => {
	const link = event.target.closest('a[href]');
	if (
		event.defaultPrevented ||
		!link ||
		event.button !== 0 ||
		event.metaKey ||
		event.ctrlKey ||
		event.shiftKey ||
		event.altKey ||
		link.target === '_blank' ||
		link.hasAttribute('download')
	) {
		return;
	}

	const destination = new URL(link.href, window.location.href);
	if (destination.origin !== window.location.origin || destination.pathname === window.location.pathname) {
		return;
	}

	event.preventDefault();
	document.body.classList.remove('fade-in');

	const delay = window.matchMedia('(prefers-reduced-motion: reduce)').matches
		? 0
		: pageTransitionDuration;
	window.setTimeout(() => window.location.assign(destination.href), delay);
});

const menuToggle = document.querySelector('.menu-toggle');
const menuLinks = document.querySelector('.menu-links');
const contactLink = document.querySelector('.menu-contact');
const skillsLink = document.querySelector('.menu-links a[href="#skills-overview"]');

if (menuToggle && menuLinks) {
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
}

if (contactLink) {
	contactLink.addEventListener('click', (event) => {
		event.preventDefault();
		document.getElementById('contact').scrollIntoView({
			behavior: 'smooth',
			block: 'center'
		});
	});
}

if (skillsLink) {
	skillsLink.addEventListener('click', (event) => {
		event.preventDefault();
		document.getElementById('skills-overview').scrollIntoView({
			behavior: 'smooth',
			block: 'center'
		});
	});
}

const projectCarousel = document.querySelector('.project-carousel');
const previousProject = document.querySelector('.project-arrow-prev');
const nextProject = document.querySelector('.project-arrow-next');

if (projectCarousel && previousProject && nextProject) {
	const projectCards = [...projectCarousel.querySelectorAll('.project-card')];
	let currentProjectIndex = 0;

	const updateProjectArrows = () => {
		previousProject.disabled = currentProjectIndex === 0;
		nextProject.disabled = currentProjectIndex === projectCards.length - 1;
	};

	const scrollProjects = (direction) => {
		currentProjectIndex = Math.max(0, Math.min(currentProjectIndex + direction, projectCards.length - 1));
		const projectCard = projectCards[currentProjectIndex];
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
}

document.addEventListener('DOMContentLoaded', () => {
    // 1. Fade in the page on load
    document.body.classList.add('fade-in');

    // 2. Intercept internal links for a smooth fade-out
    const links = document.querySelectorAll('a[href]');

    links.forEach(link => {
        link.addEventListener('click', (e) => {
            const targetUrl = link.getAttribute('href');

            // Only apply transition to internal HTML pages (not external sites or # anchors)
            if (targetUrl && !targetUrl.startsWith('#') && !targetUrl.startsWith('http')) {
                e.preventDefault(); // Stop instant navigation

                // Trigger fade-out
                document.body.classList.remove('fade-in');

                // Navigate after the fade effect finishes (400ms matches the CSS transition time)
                setTimeout(() => {
                    window.location.href = targetUrl;
                }, 400);
            }
        });
    });
});
