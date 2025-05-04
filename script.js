// script.js – Implemented custom interactivity for Personal Web Portfolio

// Smooth scroll to top
function toTop() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

// Header color shift on scroll
function scrolling() {
  const headerName = document.getElementById("headerName");
  if (document.body.scrollTop > 90 || document.documentElement.scrollTop > 90) {
    headerName.classList.add("scrolling");
  } else {
    headerName.classList.remove("scrolling");
  }
}

// Load animation for cards
document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".card");
  cards.forEach((card, index) => {
    card.style.opacity = 0;
    setTimeout(() => {
      card.style.transition = "opacity 0.6s ease-in";
      card.style.opacity = 1;
    }, index * 200);
  });

  // Smooth scroll for nav links
  const navLinks = document.querySelectorAll("nav a");
  navLinks.forEach(link => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href").substring(1);
      const targetSection = document.getElementById(targetId);
      if (targetSection) {
        targetSection.scrollIntoView({ behavior: "smooth" });
      }
    });
  });

  // Theme toggle functionality
  document.getElementById("themeToggle").addEventListener("click", () => {
    document.body.classList.toggle("dark-theme");
  });

  // Quiz game functionality
  document.getElementById("quizGameBtn").addEventListener("click", () => {
    startQuizGame();
  });

  // Catch the Word game functionality
  document.getElementById("catchWordGameBtn").addEventListener("click", () => {
    startCatchWordGame();
  });

  // Crossword Puzzle game functionality
  document.getElementById("crosswordGameBtn").addEventListener("click", () => {
    startCrosswordGame();
  });

  // Add a glowing effect to the game container on load
  const gameContainer = document.getElementById("gameContainer");
  gameContainer.style.animation = "glowEffect 2s infinite alternate";

  const style = document.createElement("style");
  style.innerHTML = `
    @keyframes glowEffect {
      0% { box-shadow: 0 0 10px rgba(108, 99, 255, 0.5); }
      100% { box-shadow: 0 0 20px rgba(108, 99, 255, 0.8); }
    }
  `;
  document.head.appendChild(style);
});

// Add hover effects and animations to game buttons
document.querySelectorAll("#gameContainer button").forEach((button) => {
  button.addEventListener("mouseover", () => {
    button.style.transform = "scale(1.1)";
    button.style.boxShadow = "0 10px 20px rgba(0, 0, 0, 0.3)";
  });

  button.addEventListener("mouseout", () => {
    button.style.transform = "scale(1)";
    button.style.boxShadow = "none";
  });
});

function checkAnswer(button, correctAnswer) {
  const result = document.getElementById("quizResult");
  if (button.textContent.trim() === correctAnswer) {
    result.textContent = "Correct!";
    result.style.color = "green";
  } else {
    result.textContent = "Wrong! Try again.";
    result.style.color = "red";
  }
}

function showMainMenu() {
  const gameContainer = document.getElementById("gameContainer");
  gameContainer.innerHTML = `
    <button id="quizGameBtn">Play Quiz</button>
    <button id="catchWordGameBtn">Catch the Word</button>
    <button id="crosswordGameBtn">Crossword Puzzle</button>
  `;

  // Reattaches event listeners for the main menu buttons
  document.getElementById("quizGameBtn").addEventListener("click", startQuizGame);
  document.getElementById("catchWordGameBtn").addEventListener("click", startCatchWordGame);
  document.getElementById("crosswordGameBtn").addEventListener("click", startCrosswordGame);
}

function resetGame() {
  showMainMenu();
}

function startQuizGame() {
  const questions = [
    {
      question: "What year will I graduate?",
      options: ["2025", "2024", "2026"],
      correctAnswer: "2025",
    },
    {
      question: "What is my primary programming language?",
      options: ["Python", "JavaScript", "C++"],
      correctAnswer: "JavaScript",
    },
    {
      question: "Which cloud platform do I use?",
      options: ["AWS", "Azure", "GCP"],
      correctAnswer: "AWS",
    },
  ];

  // Randomize the question
  const randomQuestion = questions[Math.floor(Math.random() * questions.length)];

  const gameContainer = document.getElementById("gameContainer");
  gameContainer.innerHTML = `
    <h4>Quiz Game</h4>
    <p>${randomQuestion.question}</p>
    <div id="quiz">
      ${randomQuestion.options
        .map(
          (option) =>
            `<button onclick="checkAnswer(this, '${randomQuestion.correctAnswer}')">${option}</button>`
        )
        .join("")}
    </div>
    <div id="quizResult"></div>
    <button id="returnToMenuBtn">Return to Main Menu</button>
    <button id="resetGameBtn">Reset Game</button>
  `;

  document.getElementById("returnToMenuBtn").addEventListener("click", showMainMenu);
  document.getElementById("resetGameBtn").addEventListener("click", startQuizGame);
}

function startCatchWordGame() {
  const gameContainer = document.getElementById("gameContainer");
  gameContainer.innerHTML = `
    <h4>Catch the Word</h4>
    <p>Click on the words as they appear!</p>
    <div id="wordContainer"></div>
    <p>Score: <span id="score">0</span></p>
    <button id="returnToMenuBtn">Return to Main Menu</button>
    <button id="resetGameBtn">Reset Game</button>
  `;

  let score = 0;
  const words = ["JavaScript", "AWS", "Python", "React", "SQL"];
  const wordContainer = document.getElementById("wordContainer");

  function spawnWord() {
    const word = document.createElement("span");
    word.textContent = words[Math.floor(Math.random() * words.length)];
    word.style.position = "absolute";
    word.style.left = Math.random() * 80 + "%";
    word.style.top = Math.random() * 80 + "%";
    word.style.cursor = "pointer";
    word.addEventListener("click", () => {
      score++;
      document.getElementById("score").textContent = score;
      word.remove();
    });
    wordContainer.appendChild(word);
    setTimeout(() => word.remove(), 3000);
  }

  const intervalId = setInterval(spawnWord, 1000);

  document.getElementById("returnToMenuBtn").addEventListener("click", () => {
    clearInterval(intervalId);
    showMainMenu();
  });

  document.getElementById("resetGameBtn").addEventListener("click", () => {
    clearInterval(intervalId);
    startCatchWordGame();
  });
}

const crosswordData = {
  puzzle1: {
    grid: Array(10).fill(Array(10).fill("")),
    hints: {
      across: ["1. A programming language I know (10 letters)"],
      down: ["2. My graduation year (4 digits)"],
    },
    answers: {
      across: ["JAVASCRIPT"],
      down: ["2025"],
    },
  },
  puzzle2: {
    grid: Array(10).fill(Array(10).fill("")),
    hints: {
      across: ["1. A popular programming language (6 letters)"],
      down: ["2. My favorite cloud platform (3 letters)"],
    },
    answers: {
      across: ["PYTHON"],
      down: ["AWS"],
    },
  },
  puzzle3: {
    grid: Array(10).fill(Array(10).fill("")),
    hints: {
      across: ["1. A database query language (4 letters)"],
      down: ["2. A cloud platform I use (3 letters)"],
    },
    answers: {
      across: ["SQL"],
      down: ["AWS"],
    },
  },
  puzzle4: {
    grid: Array(10).fill(Array(10).fill("")),
    hints: {
      across: ["1. A version control system (3 letters)"],
      down: ["2. A popular front-end framework (5 letters)"],
    },
    answers: {
      across: ["GIT"],
      down: ["REACT"],
    },
  },
  // Reminder to add more puzzles if I want to...
};

let currentPuzzleIndex = 0;

/**
 * Renders the crossword puzzle on the page.
 * Dynamically generates the grid and attaches event listeners for buttons.
 */
function renderPuzzle() {
  const gameContainer = document.getElementById("gameContainer");
  const currentPuzzle = Object.values(crosswordData)[currentPuzzleIndex];

  gameContainer.innerHTML = `
    <h4>Crossword Puzzle</h4>
    <p>Fill in the blanks:</p>
    <div id="crosswordGrid" style="display: grid; grid-template-columns: repeat(10, 60px); gap: 5px;">
      ${currentPuzzle.grid
        .map((row, rowIndex) =>
          row
            .map(
              (cell, colIndex) =>
                `<input type="text" maxlength="1" value="" data-row="${rowIndex}" data-col="${colIndex}" />`
            )
            .join("")
        )
        .join("")}
    </div>
    <div>
      <h5>Hints:</h5>
      <p><strong>Across:</strong> ${currentPuzzle.hints.across.join(", ")}</p>
      <p><strong>Down:</strong> ${currentPuzzle.hints.down.join(", ")}</p>
    </div>
    <button id="submitCrossword">Submit</button>
    <button id="showAnswerKey">Show Answer Key</button>
    <div id="crosswordResult"></div>
    <button id="returnToMenuBtn">Return to Main Menu</button>
    <button id="resetGameBtn">Reset Game</button>
    <button id="changePuzzleBtn">Change Puzzle</button>
  `;

  // Attaching event listeners for buttons
  document.getElementById("submitCrossword").addEventListener("click", () => {
    checkCrossword(currentPuzzle.answers);
  });
  document.getElementById("showAnswerKey").addEventListener("click", () => {
    showAnswerKey(currentPuzzle.answers);
  });
  document.getElementById("returnToMenuBtn").addEventListener("click", showMainMenu);
  document.getElementById("resetGameBtn").addEventListener("click", renderPuzzle);
  document.getElementById("changePuzzleBtn").addEventListener("click", () => {
    currentPuzzleIndex = (currentPuzzleIndex + 1) % Object.keys(crosswordData).length;
    renderPuzzle();
  });
}

function startCrosswordGame() {
  renderPuzzle();
}

/**
 * Validates the crossword puzzle answers and provides feedback.
 * @param {Object} answers - The correct answers for the current puzzle.
 */
function checkCrossword(answers) {
  const inputs = document.querySelectorAll("#crosswordGrid input");
  const result = document.getElementById("crosswordResult");
  let isCorrect = true;

  // Validate across answers
  const acrossAnswer = Array.from(inputs)
    .filter((input) => parseInt(input.dataset.row) === 0)
    .map((input) => input.value.toUpperCase())
    .join("");
  if (acrossAnswer !== answers.across[0]) {
    isCorrect = false;
  }

  // Validate down answers
  const downAnswer = Array.from(inputs)
    .filter((input) => parseInt(input.dataset.col) === 0)
    .map((input) => input.value.toUpperCase())
    .join("");
  if (downAnswer !== answers.down[0]) {
    isCorrect = false;
  }

  // Displays feedback
  if (isCorrect) {
    result.textContent = "Correct! You solved the crossword!";
    result.style.color = "green";
  } else {
    result.textContent = "Some answers are incorrect. Try again.";
    result.style.color = "red";
  }
}

/**
 * Displays the answer key for the crossword puzzle.
 * @param {Object} answers - The correct answers for the current puzzle.
 */
function showAnswerKey(answers) {
  const result = document.getElementById("crosswordResult");
  result.innerHTML = `
    <strong>Answer Key:</strong><br>
    <strong>Across:</strong> ${answers.across[0]}<br>
    <strong>Down:</strong> ${answers.down[0]}
  `;
  result.style.color = "blue";

  // Fill the grid with the correct answers
  const inputs = document.querySelectorAll("#crosswordGrid input");
  inputs.forEach((input) => {
    const row = parseInt(input.dataset.row);
    const col = parseInt(input.dataset.col);

    // Fill across answers
    if (row === 0 && col < answers.across[0].length) {
      input.value = answers.across[0][col];
    }

    // Fill down answers
    if (col === 0 && row < answers.down[0].length) {
      if (!input.value) {
        input.value = answers.down[0][row];
      }
    }
  });
}

// Attach event listeners for the main menu buttons
document.getElementById("quizGameBtn").addEventListener("click", startQuizGame);
document.getElementById("catchWordGameBtn").addEventListener("click", startCatchWordGame);
document.getElementById("crosswordGameBtn").addEventListener("click", startCrosswordGame);
