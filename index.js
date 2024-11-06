document.getElementById('search-button').addEventListener('click', async function () {
    const examStatus = document.getElementById('examStatus').value;
    const outputDiv = document.getElementById('searchResults');
    const rank = document.getElementById('rank') ? document.getElementById('rank').value : null; // Only if rank input exists
    const collegeName = document.getElementById('collegeName') ? document.getElementById('collegeName').value : null; // Only if college input exists
    const branch = document.getElementById('branch') ? document.getElementById('branch').value : null; // Get selected branch
    const category = document.getElementById('category') ? document.getElementById('category').value : null; // Get selected category

    outputDiv.innerHTML = 'Loading...'; // Show loading message

    try {
        let response;
        if (examStatus === 'completed') {
            response = await fetch(`/colleges-by-rank?rank=${rank}&category=${category}`);
        } else {
            response = await fetch(`/colleges-by-branch?name=${collegeName}&branch=${branch}&category=${category}`);
        }

        if (!response.ok) throw new Error('Failed to fetch data');

        const data = await response.json();
        displayResults(data);
    } catch (error) {
        console.error('Error fetching data:', error);
        outputDiv.innerHTML = 'Error fetching data from the server.';
    }
});

function displayResults(data) {
    const outputDiv = document.getElementById('searchResults');
    outputDiv.innerHTML = ''; // Clear previous results

    if (data.length === 0) {
        outputDiv.innerHTML = 'No colleges found.';
    } else {
        data.forEach(college => {
            const collegeDiv = document.createElement('div');
            collegeDiv.innerHTML = `<h4>${college.name}</h4><p>Branch: ${college.branch || 'N/A'}</p>`;
            outputDiv.appendChild(collegeDiv);
        });
    }
}
app.get('/colleges-by-rank', async (req, res) => {
    const { rank, category } = req.query;

    try {
        const query = {};
        query[category] = { $lte: parseInt(rank) }; // Make sure the category is correctly used
        const colleges = await College.find(query).sort({ [category]: -1 }).limit(20);
        res.json(colleges);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});
app.get('/colleges-by-branch', async (req, res) => {
    const { name, branch, category } = req.query;

    try {
        const college = await College.findOne({ name, branch });

        if (college) {
            res.json({
                name: college.name,
                branch: college.branch,
                category: category,
                categoryValue: college[category]
            });
        } else {
            res.status(404).json({ message: 'College not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});