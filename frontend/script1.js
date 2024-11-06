document.addEventListener('DOMContentLoaded', function() {
    // Image Slider Functionality
    let currentSlide = 0;
    const slides = document.querySelectorAll('.slide');
    const totalSlides = slides.length;

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.style.display = (i === index) ? 'block' : 'none';
        });
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % totalSlides;
        showSlide(currentSlide);
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        showSlide(currentSlide);
    }

    // Show the first slide initially
    showSlide(currentSlide);

    // Event listeners for slide buttons
    document.querySelector('.next-slide').addEventListener('click', nextSlide);
    document.querySelector('.prev-slide').addEventListener('click', prevSlide);

    // Show Course Selection after the slider
    function showCourseSelection() {
        document.getElementById('courseSelection').style.display = 'block';
    }

    // Show Exam Selection after selecting a course
    window.showExamSelection = function() {
        document.getElementById('courseSelection').style.display = 'none';
        document.getElementById('examSelection').style.display = 'block';
    }

    // Show College Predictor after selecting an exam
    window.showCollegePredictor = function() {
        document.getElementById('examSelection').style.display = 'none';
        document.getElementById('collegePredictor').style.display = 'block';
    }

    // College Predictor Functionality
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

        // Get form values
        const examStatus = document.getElementById('examStatus').value;
        const rankInput = document.getElementById('rankInput').value;
        const category = document.getElementById('category').value;

        // Check if the exam is completed
        if (examStatus === 'completed') {
            // Fetch colleges based on rank and category
            fetchCollegesByRank(rankInput, category);
        } else {
            // Handle the case where the exam is not completed
            searchResults.innerHTML = `<p>Please complete the exam to get college predictions.</p>`;
        }
    });

    async function fetchCollegesByRank(rank, category) {
        try {
            const response = await fetch(`/colleges-by-rank?rank=${rank}&category=${category}`);
            const data = await response.json();

            if (response.ok) {
                updateUIWithCollegeData(data);
            } else {
                searchResults.innerHTML = `<p>No colleges found for the given rank and category.</p>`;
            }
        } catch (error) {
            console.error('Error fetching colleges by rank:', error);
            searchResults.innerHTML = '<p>Error fetching data. Please try again later.</p>';
        }
    }

    function updateUIWithCollegeData(colleges) {
        searchResults.innerHTML = '';

        if (colleges.length > 0) {
            const resultsTable = `
                <table>
                    <thead>
                        <tr>
                            <th>College Name</th>
                            <th>Branch</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${colleges.map(college => `
                            <tr>
                                <td>${college.name}</td>
                                <td>${college.branch || 'N/A'}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            `;
            searchResults.innerHTML = resultsTable; // Use innerHTML to insert the table
        } else {
            searchResults.innerHTML = '<p>No colleges found matching your criteria.</p>';
        }
    }

    // Start the flow by showing the course selection after the slider
    showCourseSelection();
});