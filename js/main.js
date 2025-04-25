// Load components
document.addEventListener('DOMContentLoaded', function() {
    // Load header
    fetch('components/header.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('header-container').innerHTML = data;
            initializeHeader();
        });

    // Load category bar
    fetch('components/category-bar.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('category-bar-container').innerHTML = data;
            initializeCategoryBar();
        });

    // Load footer
    fetch('components/footer.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('footer-container').innerHTML = data;
        });

    // Initialize search functionality
    initializeSearch();
    initializeToolCategorySelect();
});

// Initialize header functionality
function initializeHeader() {
    // Add active class to current page
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPath) {
            link.classList.add('active');
        }
    });

    // Handle dropdown menu
    const dropdownToggle = document.querySelector('.dropdown-toggle');
    if (dropdownToggle) {
        dropdownToggle.addEventListener('click', function(e) {
            e.preventDefault();
            const dropdownMenu = this.nextElementSibling;
            dropdownMenu.classList.toggle('show');
        });
    }

    // Close dropdown when clicking outside
    document.addEventListener('click', function(e) {
        const dropdowns = document.querySelectorAll('.dropdown-menu');
        dropdowns.forEach(dropdown => {
            if (!dropdown.contains(e.target) && !e.target.matches('.dropdown-toggle')) {
                dropdown.classList.remove('show');
            }
        });
    });
}

// Initialize category bar
function initializeCategoryBar() {
    const categoryCards = document.querySelectorAll('.category-card');
    const sections = document.querySelectorAll('section[id]');
    
    // Handle category card clicks
    categoryCards.forEach(card => {
        card.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            
            // Remove active class from all cards
            categoryCards.forEach(c => c.classList.remove('active'));
            
            // Add active class to clicked card
            this.classList.add('active');
            
            // Scroll to section
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Highlight section
                targetSection.classList.add('highlight-section');
                setTimeout(() => {
                    targetSection.classList.remove('highlight-section');
                }, 2000);
            }
        });
    });
    
    // Update active card based on scroll position
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                categoryCards.forEach(card => {
                    card.classList.remove('active');
                    if (card.getAttribute('href') === `#${sectionId}`) {
                        card.classList.add('active');
                    }
                });
            }
        });
    });
}

// Initialize tool category select
function initializeToolCategorySelect() {
    const categorySelect = document.getElementById('toolCategorySelect');
    if (categorySelect) {
        categorySelect.addEventListener('change', function() {
            const selectedValue = this.value;
            if (selectedValue) {
                const targetSection = document.getElementById(selectedValue);
                if (targetSection) {
                    // Remove highlight from all sections
                    document.querySelectorAll('.highlight-section').forEach(section => {
                        section.classList.remove('highlight-section');
                    });

                    // Smooth scroll to the selected section
                    targetSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                    
                    // Highlight the section
                    targetSection.classList.add('highlight-section');
                    
                    // Reset the select after a delay
                    setTimeout(() => {
                        this.value = '';
                        targetSection.classList.remove('highlight-section');
                    }, 2000);
                }
            }
        });
    }
}

// Initialize search functionality
function initializeSearch() {
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');
    const toolCards = document.querySelectorAll('.card');
    const aboutSection = document.querySelector('.about-section');

    function performSearch() {
        const searchTerm = searchInput.value.toLowerCase().trim();
        let hasResults = false;

        // First, hide all cards except the about section
        toolCards.forEach(card => {
            if (!card.closest('.about-section')) {
                card.style.display = 'none';
            }
        });

        if (searchTerm === '') {
            // If search is empty, show all cards
            toolCards.forEach(card => {
                card.style.display = 'block';
            });
            return;
        }

        // Show matching cards
        toolCards.forEach(card => {
            if (!card.closest('.about-section')) {
                const title = card.querySelector('.card-title').textContent.toLowerCase();
                const description = card.querySelector('.card-text').textContent.toLowerCase();
                
                if (title.includes(searchTerm) || description.includes(searchTerm)) {
                    card.style.display = 'block';
                    hasResults = true;
                }
            }
        });

        // Scroll to the first matching result
        if (hasResults) {
            const firstMatch = document.querySelector('.card[style="display: block;"]');
            if (firstMatch) {
                firstMatch.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }
    }

    searchInput.addEventListener('input', performSearch);
    searchButton.addEventListener('click', performSearch);
} 