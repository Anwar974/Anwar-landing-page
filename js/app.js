/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Comments should be present at the beginning of each procedure and class.
 * Great to have comments before crucial code sections within the procedure.
*/

/**
 * Define Global Variables
 * 
 * sections: NodeList of all section elements in the document.
 * navList: The <ul> element in the navigation bar where menu items will be appended.
 * navbar: The navigation bar element.
 * scrollToTopBtn: The scroll to top button element.
*/

const sections = document.querySelectorAll('section');
const navList = document.querySelector('#navbar__list');
const navbar = document.querySelector('.page__header');
let scrollToTopBtn; // Declare scrollToTopBtn globally

/**
 * End Global Variables
 * Start Helper Functions
 * 
*/

/**
 * Function to toggle the visibility of a section's content
 * @param {string} sectionId - The ID of the section to toggle
 */
function toggleSection(sectionId) {
    const section = document.getElementById(sectionId);
    const content = section.querySelector('.section-content');
    const icon = section.querySelector('i');

    // Toggle collapsed class on content to show/hide
    content.classList.toggle('collapsed');

    // Toggle the icon classes to change the chevron direction
    icon.classList.toggle('fa-chevron-down');
    icon.classList.toggle('fa-chevron-up');

    // Dynamically change the height of the section
    if (content.classList.contains('collapsed')) {
        section.style.minHeight = 'auto';
        section.style.height = 'auto';
    } else {
        section.style.minHeight = '80vh';
        section.style.height = 'auto';
    }
}

/**
 * @description Create scroll to top button and append it to the body
 */
function createScrollToTopButton() {
    scrollToTopBtn = document.createElement('button'); // Create scroll to top button
    scrollToTopBtn.classList.add('scroll-to-top-btn'); // Add class for styling

      // Create icon element for Font Awesome
      const icon = document.createElement('i');
      icon.classList.add('fas', 'fa-arrow-up'); // Font Awesome solid arrow-up icon classes
      scrollToTopBtn.appendChild(icon); // Append icon to button


    document.body.appendChild(scrollToTopBtn); // Append button to the body

    // Scroll to top on button click
    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

/**
 * @description Build the navigation menu dynamically
 */
function buildNavMenu() {
    sections.forEach(section => {
        const navItem = document.createElement('li'); // Create a list item for each section
        const navLink = document.createElement('a'); // Create a link for each section
        navLink.textContent = section.getAttribute('data-nav'); // Set link text from section data attribute
        navLink.setAttribute('href', `#${section.id}`); // Set link href to section id
        navLink.classList.add('menu__link'); // Add class to link for styling
        navItem.appendChild(navLink); // Append link to list item
        navList.appendChild(navItem); // Append list item to navigation list

        // Smooth scrolling on click of each navigation link
        navLink.addEventListener('click', function(event) {
            event.preventDefault(); // Prevent default link behavior
            const targetId = navLink.getAttribute('href').slice(1); // Get target section id
            const targetSection = document.getElementById(targetId); // Get target section element
            targetSection.scrollIntoView({ behavior: 'smooth' }); // Scroll to target section smoothly
        });
    });
}

/**
 * @description Add active state to section and corresponding navigation item when near top of viewport
 */
function setActiveSection() {
    sections.forEach(section => {
        const rect = section.getBoundingClientRect(); // Get section's position relative to viewport
        if (rect.top >= 0 && rect.bottom <= window.innerHeight) { // Check if section is in viewport
            section.classList.add('your-active-class'); // Add active class to section
            const navLinks = navList.querySelectorAll('.menu__link'); // Select all navigation links
            navLinks.forEach(link => {
                if (link.getAttribute('href').slice(1) === section.id) {
                    link.classList.add('active'); // Add active class to corresponding nav link
                } else {
                    link.classList.remove('active'); // Remove active class from other nav links
                }
            });
        } else {
            section.classList.remove('your-active-class'); // Remove active class if section is not in viewport
        }
    });

    // Toggle scroll to top button visibility based on scroll position
    if (window.scrollY > window.innerHeight / 2) {
        scrollToTopBtn.style.display = 'block';
    } else {
        scrollToTopBtn.style.display = 'none';
    }
}

/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu 
document.addEventListener('DOMContentLoaded', function() {
    buildNavMenu(); // Build the navigation menu when the page is loaded
    createScrollToTopButton(); // Create scroll to top button when the page is loaded
});

// Scroll to section on link click
// Set sections as active
window.addEventListener('scroll', function() {
    setActiveSection(); // Update active section and navigation state on scroll
});

// Hide fixed navigation bar while not scrolling
let scrollTimeout;

window.addEventListener('scroll', function() {
    navbar.style.display = 'block'; // Always show navbar initially

    clearTimeout(scrollTimeout); // Clear timeout to prevent navbar hiding

    // Set timeout to hide navbar after 5 seconds of inactivity
    scrollTimeout = setTimeout(function() {
        navbar.style.display = 'none';
    }, 5000);
});

