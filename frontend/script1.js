document.addEventListener('DOMContentLoaded', function() {
    const searchForm = document.querySelector('.search-form');
    const searchResults = document.getElementById('searchResults');

    searchForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Show loading state
        searchResults.innerHTML = `
            <div class="loading">
                <div class="spinner"></div>
                <p>Searching for colleges...</p>
            </div>
        `;

        // Simulate API call
        setTimeout(() => {
            const results = `
                <div class="college-card">
                    <div class="college-logo">
                        <img src="https://example.com/college1-logo.jpg" alt="College 1">
                    </div>
                    <div class="college-details">
                        <h3 class="college-name">JNTUH College of Engineering</h3>
                        <div class="college-info">
                            <div><i class="fas fa-map-marker-alt"></i> Hyderabad</div>
                            <div><i class="fas fa-graduation-cap"></i> AICTE Approved</div>
                            <div><i class="fas fa-star"></i> NAAC A++</div>
                            <div><i class="fas fa-users"></i> 100% Placement</div>
                        </div>
                    </div>
                </div>

                <div class="college-card">
                    <div class="college-logo">
                        <img src="https://example.com/college2-logo.jpg" alt="College 2">
                    </div>
                    <div class="college-details">
                        <h3 class="college-name">VNR Vignana Jyothi</h3>
                        <div class="college-info">
                            <div><i class="fas fa-map-marker-alt"></i> Hyderabad</div>
                            <div><i class="fas fa-graduation-cap"></i> Autonomous</div>
                            <div><i class="fas fa-star"></i> NAAC A+</div>
                            <div><i class="fas fa-users"></i> 95% Placement</div>
                        </div>
                    </div>
                </div>
            `;
            
            searchResults.innerHTML = results;

            // Add hover effects to new college cards
            addHoverEffects();
        }, 1500);
    });

    function addHoverEffects() {
        document.querySelectorAll('.college-card').forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateX(10px)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateX(0)';
            });
        });
    }

    // Function to handle form input changes
    function handleFormChanges() {
        const examStatus = document.getElementById('examStatus');
        const rankInput = document.querySelector('input[type="number"]');
        const category = document.getElementById('category');
        const branch = document.getElementById('branch');

        examStatus.addEventListener('change', function() {
            if (this.value === 'completed') {
                rankInput.disabled = false;
            } else {
                rankInput.disabled = true;
                rankInput.value = '';
            }
        });

        [category, branch].forEach(select => {
            select.addEventListener('change', function() {
                if (examStatus.value === 'completed' && rankInput.value) {
                    // You can add logic here to dynamically update results based on selection
                    console.log('Updating results for:', {
                        examStatus: examStatus.value,
                        rank: rankInput.value,
                        category: category.value,
                        branch: branch.value
                    });
                }
            });
        });
    }

    // Function to initialize tooltips
    function initTooltips() {
        const tooltips = document.querySelectorAll('[data-tooltip]');
        tooltips.forEach(tooltip => {
            tooltip.addEventListener('mouseover', function() {
                const tooltipText = this.getAttribute('data-tooltip');
                const tooltipElement = document.createElement('div');
                tooltipElement.className = 'tooltip';
                tooltipElement.textContent = tooltipText;
                document.body.appendChild(tooltipElement);

                const rect = this.getBoundingClientRect();
                tooltipElement.style.top = `${rect.bottom + 5}px`;
                tooltipElement.style.left = `${rect.left}px`;
            });

            tooltip.addEventListener('mouseout', function() {
                const tooltipElement = document.querySelector('.tooltip');
                if (tooltipElement) {
                    tooltipElement.remove();
                }
            });
        });
    }

    // Function to handle college card clicks
    function handleCollegeCardClicks() {
        document.addEventListener('click', function(e) {
            if (e.target.closest('.college-card')) {
                const collegeName = e.target.closest('.college-card').querySelector('.college-name').textContent;
                console.log(`Clicked on ${collegeName}. You can add more details or navigation here.`);
                // You can add logic here to show more details or navigate to a college-specific page
            }
        });
    }

    // Function to initialize the page
    function init() {
        handleFormChanges();
        initTooltips();
        handleCollegeCardClicks();

        // Add any other initialization logic here
        console.log('Page initialized');
    }

    // Call the init function when the DOM is fully loaded
    init();
});

// You can add more functions or features below as needed

// Example: Function to fetch real data from an API
async function fetchCollegeData(params) {
    try {
        const response = await fetch('/api/colleges', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(params),
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching college data:', error);
        return null;
    }
}

// Example: Function to update the UI with real data
function updateUIWithCollegeData(colleges) {
    const searchResults = document.getElementById('searchResults');
    searchResults.innerHTML = '';

    if (colleges && colleges.length > 0) {
        colleges.forEach(college => {
            const collegeCard = document.createElement('div');
            collegeCard.className = 'college-card';
            collegeCard.innerHTML = `
                <div class="college-logo">
                    <img src="${college.logoUrl}" alt="${college.name}">
                </div>
                <div class="college-details">
                    <h3 class="college-name">${college.name}</h3>
                    <div class="college-info">
                        <div><i class="fas fa-map-marker-alt"></i> ${college.location}</div>
                        <div><i class="fas fa-graduation-cap"></i> ${college.accreditation}</div>
                        <div><i class="fas fa-star"></i> ${college.rating}</div>
                        <div><i class="fas fa-users"></i> ${college.placementRate}% Placement</div>
                    </div>
                </div>
            `;
            searchResults.appendChild(collegeCard);
        });
    } else {
        searchResults.innerHTML = '<p>No colleges found matching your criteria.</p>';
    }

    addHoverEffects();
}

// You can continue to add more functions or features as needed for your college predictor website