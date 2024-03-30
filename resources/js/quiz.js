// Initialize score globally
let score = 0;

// Function to fetch quiz data from a JSON file
async function fetchData(url) {
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error loading quiz data:', error);
    }
}

async function startQuiz() {
    const data = await fetchData('https://raw.githubusercontent.com/YashDuhan/Pro-PlanetQuizHelper/main/json/quiz.json');
    // Shuffle the questions array randomly
    data.sort(() => Math.random() - 0.5);
    // Start the quiz
    runQuiz(data);
}

function runQuiz(data) {
    if (data.length === 0) {
        // Quiz completed, stop execution
        return;
    }

    const currentQuestion = data.shift(); // Get the current question and remove it from the array

    if (currentQuestion.type === 'text') {
        textBasedQuiz(currentQuestion, data);
    } else if (currentQuestion.type === 'img') {
        imageBasedQuiz(currentQuestion, data);
    }
}

function textBasedQuiz(question, remainingQuestions) {
    console.log("Text Based");
    //Remove the existing option-container-img
    const optionContainers = document.getElementsByClassName('option-container');
    for (let i = 0; i < optionContainers.length; i++) {
        if (optionContainers[i].classList.contains('option-container-img')) {
            optionContainers[i].classList.remove('option-container-img');
        }
    }
    
    // Initialize current question index, not needed in this case as we pass the current question directly

    // Function to load a question onto the page
    function loadQuestion() {
        const questionNumberEl = document.getElementById('question-number');
        const questionTitleEl = document.getElementById('question-title');
        const scoreEl = document.getElementById('score');
        const optionEls = document.querySelectorAll('.option-btn');

        // Display question number and title
        questionNumberEl.textContent = question.questionNumber;
        questionTitleEl.textContent = question.questionTitle;
        scoreEl.textContent = score; // Update displayed score

        // Display options
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
        if (Object.keys(question.options)[selectedOptionIndex] === correctAnswer) {
            score += 10; // Increment score for correct answer
            selectedOptionEl.classList.add('correct'); // Apply correct answer style
        } else {
            selectedOptionEl.classList.add('wrong'); // Apply wrong answer style

            // Highlight the correct answer
            optionEls.forEach((optionEl, index) => {
                if (Object.keys(question.options)[index] === correctAnswer) {
                    optionEl.classList.add('correct');
                }
            });
        }

        // Move to the next question after a delay
        setTimeout(() => {
            loadNextQuestion();
        }, 1000); // Adjust delay time if needed
    }

    // Function to load the next question or rerun the quiz if no questions left
    function loadNextQuestion() {
        if (remainingQuestions.length === 0) {
            // No more questions, rerun the quiz
            startQuiz();
        } else {
            // Load the next question
            runQuiz(remainingQuestions);
        }
    }

    loadQuestion(); // Load the first question
}

function imageBasedQuiz(question, remainingQuestions) {
    console.log("Image Based")
    // Add the option-container-img class
    const optionContainers = document.getElementsByClassName('option-container');
    for (let i = 0; i < optionContainers.length; i++) {
        optionContainers[i].classList.add('option-container-img');
    }
    
    // Initialize current question index, not needed in this case as we pass the current question directly

    // Function to load a question onto the page
    function loadQuestion() {
        const questionNumberEl = document.getElementById('question-number');
        const questionTitleEl = document.getElementById('question-title');
        const scoreEl = document.getElementById('score');
        const optionEls = document.querySelectorAll('.option-btn');

        // Display question number and title
        questionNumberEl.textContent = question.questionNumber;
        questionTitleEl.textContent = question.questionTitle;
        scoreEl.textContent = score; // Update displayed score

        // Display options with images
        optionEls.forEach((optionEl, index) => {
            const optionSpan = document.createElement('span'); // Create span element
            const optionImg = document.createElement('img'); // Create img element
            optionImg.src = `https://github.com/YashDuhan/Pro-PlanetQuizHelper/blob/main/imgQuiz/img/${question.options[Object.keys(question.options)[index]]}.jpg?raw=true`; // Set image source
            optionImg.alt = `Option ${Object.keys(question.options)[index]}`; // Set alt attribute for accessibility
            optionImg.width = 100; // Set width of the image (adjust as needed)
            optionImg.height = 100; // Set height of the image (adjust as needed)
            optionSpan.appendChild(optionImg); // Append img element to span
            optionEl.innerHTML = ''; // Clear previous content
            optionEl.appendChild(optionSpan); // Append span to button
            optionEl.classList.remove('correct', 'wrong'); // Clear previous styles
            optionEl.onclick = () => checkAnswer(index, question.correctAnswer); // Update click handler
        });
    }

    // Function to check the selected answer
    function checkAnswer(selectedOptionIndex, correctAnswer) {
        const optionEls = document.querySelectorAll('.option-btn');
        const selectedOptionEl = optionEls[selectedOptionIndex];

        // Check if the selected answer is correct
        if (Object.keys(question.options)[selectedOptionIndex] === correctAnswer) {
            score += 10; // Increment score for correct answer
            selectedOptionEl.classList.add('correct'); // Apply correct answer style
        } else {
            selectedOptionEl.classList.add('wrong'); // Apply wrong answer style

            // Highlight the correct answer
            optionEls.forEach((optionEl, index) => {
                if (Object.keys(question.options)[index] === correctAnswer) {
                    optionEl.classList.add('correct');
                }
            });
        }

        // Move to the next question after a delay
        setTimeout(() => {
            loadNextQuestion();
        }, 1000); // Adjust delay time if needed
    }

    // Function to load the next question or rerun the quiz if no questions left
    function loadNextQuestion() {
        if (remainingQuestions.length === 0) {
            // No more questions, rerun the quiz
            startQuiz();
        } else {
            // Load the next question
            runQuiz(remainingQuestions);
        }
    }

    loadQuestion(); // Load the first question
}

startQuiz(); // Start the quiz
