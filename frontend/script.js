document.addEventListener('DOMContentLoaded', function() {
    const pageSelectCourse = document.getElementById('page-select-course');
    const pageSelectExam = document.getElementById('page-select-exam');
    const pageEnterScore = document.getElementById('page-enter-score');

    const step1 = document.querySelectorAll('.step')[0];
    const step2 = document.querySelectorAll('.step')[1];
    const step3 = document.querySelectorAll('.step')[2];

    // Start on the first page
    pageSelectCourse.classList.add('active');

    // Event listener for B.Tech card
    document.getElementById('btech-card').addEventListener('click', function() {
        // Move to the next page (Select Exam)
        pageSelectCourse.classList.remove('active');
        pageSelectExam.classList.add('active');

        // Update step indicators
        step1.classList.add('completed');
        step2.classList.add('active');
    });

    // Event listener for "Next" button in Select Exam page
    document.getElementById('next-to-score').addEventListener('click', function() {
        // Move to the next page (Enter Score)
        pageSelectExam.classList.remove('active');
        pageEnterScore.classList.add('active');

        // Update step indicators
        step2.classList.remove('active');
        step2.classList.add('completed');
        step3.classList.add('active');
    });
});
// Script.js

function goToExamPage() {
    document.getElementById("page-select-course").classList.remove("active");
    document.getElementById("page-select-exam").classList.add("active");

    // Mark step 1 as completed
    document.getElementById("step1").classList.add("completed");
}

function goToScorePage() {
    document.getElementById("page-select-exam").classList.remove("active");
    document.getElementById("page-enter-score").classList.add("active");

    // Mark step 2 as completed
    document.getElementById("step2").classList.add("completed");
}




let currentPage = 1;

async function fetchColleges(page = 1) {
    const rank = document.getElementById("rank").value;
    const category = document.getElementById("category").value;

    try {
        const response = await fetch(`/colleges-by-rank?rank=${rank}&category=${category}&page=${page}&limit=20`);
        const data = await response.json();

        if (response.ok) {
            populateTable(data.colleges);
            updatePagination(data.currentPage, data.totalPages);
        } else {
            console.error(data.message);
        }
    } catch (error) {
        console.error("Error fetching colleges:", error);
    }
}

function populateTable(colleges) {
    const tableBody = document.getElementById("table-body");
    tableBody.innerHTML = "";

    colleges.forEach((college, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${(currentPage - 1) * 20 + index + 1}</td>
            <td>${college.name}</td>
            <td>${college.branch}</td>
        `;
        tableBody.appendChild(row);
    });
}

function updatePagination(current, total) {
    document.getElementById("page-info").textContent = `Page ${current} of ${total}`;
    document.getElementById("prev-page").disabled = current === 1;
    document.getElementById("next-page").disabled = current === total;
}

document.getElementById("fetch-colleges-btn").addEventListener("click", function() {
    currentPage = 1;
    fetchColleges(currentPage);
});

document.getElementById("prev-page").addEventListener("click", () => {
    if (currentPage > 1) {
        currentPage--;
        fetchColleges(currentPage);
    }
});

document.getElementById("next-page").addEventListener("click", () => {
    currentPage++;
    fetchColleges(currentPage);
});
