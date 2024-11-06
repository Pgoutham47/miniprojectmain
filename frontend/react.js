const fetchCollegesByRank = (rank, category) => {
    fetch(`http://localhost:5001/colleges-by-rank?rank=${rank}&category=${category}`)
        .then(response => response.json())
        .then(data => {
            // Display the colleges to the user
            console.log(data);
        })
        .catch(error => console.error('Error fetching colleges:', error));
};

const fetchCollegesByBranch = (branch,category) => {
    fetch(`http://localhost:5001/colleges-by-branch?branch=${branch}&category=${category}`)
        .then(response => response.json())
        .then(data => {
            // Display the ranks required for the user’s branch selection
            console.log(data);
        })
        .catch(error => console.error('Error fetching colleges:', error));
};

const [Level, setLevel] = useState('');
const [Stream, setStream] = useState('');
const [examStatus, setexamStatus] = useState('');
const [rank, setrank] = useState('');
const [branch, setbranch] = useState('');
const [category, setcategory] = useState('');

// When the user submits their form
const handleSubmit = () => {
  if (examStatus === 'yes') {
    fetchCollegesByRank(rank,category);
  } else {
    fetchCollegesByBranch(branch,category);
  }
};