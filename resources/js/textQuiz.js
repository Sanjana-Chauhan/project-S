
// Function to fetch quiz data from a JSON file
async function fetchData() {
    try {
        const response = await fetch('https://raw.githubusercontent.com/YashDuhan/Pro-PlanetQuizHelper/main/json/textQuiz.json');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error loading quiz data:', error);
    }
}

// Function to start the quiz
async function startQuiz() {
    const data = await fetchData(); // Fetch quiz data

    // Shuffle the questions array randomly
    data.sort(() => Math.random() - 0.5);

    let score = 0; // Initialize score
    let currentQuestionIndex = 0; // Initialize current question index

    // Function to load a question onto the page
    function loadQuestion() {
        // Check if reached the end of questions and reset to the beginning
        if (currentQuestionIndex >= data.length) {
            currentQuestionIndex = 0; // Reset the index
        }

        const question = data[currentQuestionIndex];

        // Display question number and title
        document.getElementById('question-number').textContent = question.questionNumber;
        document.getElementById('question-title').textContent = question.questionTitle;

        // Display options
        const optionEls = document.querySelectorAll('.option-btn');
        optionEls.forEach((optionEl, index) => {
            optionEl.textContent = question.options[Object.keys(question.options)[index]];
            optionEl.classList.remove('correct', 'wrong'); // Clear previous styles
            optionEl.onclick = () => checkAnswer(index, question.correctAnswer); // Update click handler
        });
    }

    // Function to check the selected answer
    function checkAnswer(selectedOptionIndex, correctAnswer) {
        const optionEls = document.querySelectorAll('.option-btn');
        const selectedOptionEl = optionEls[selectedOptionIndex];

        // Check if the selected answer is correct
        if (Object.keys(data[0].options)[selectedOptionIndex] === correctAnswer) {
            score += 10; // Increment score for correct answer
            document.getElementById('score').textContent = score; // Update displayed score
            selectedOptionEl.classList.add('correct'); // Apply correct answer style
        } else {
            selectedOptionEl.classList.add('wrong'); // Apply wrong answer style

            // Highlight the correct answer
            optionEls.forEach((optionEl, index) => {
                if (Object.keys(data[0].options)[index] === correctAnswer) {
                    optionEl.classList.add('correct');
                }
            });
        }

        // Move to the next question after a delay
        setTimeout(() => {
            optionEls.forEach(el => el.onclick = null); // Disable click handlers after delay
            currentQuestionIndex++; // Move to the next question
            loadQuestion(); // Load the next question
        }, 1000); // Adjust delay time if needed
    }

    loadQuestion(); // Load the first question
}

startQuiz(); // Call to start the quiz
