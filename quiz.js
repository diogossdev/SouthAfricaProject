// ══════════════════════════════════════════
// QUIZ — South Africa Knowledge Challenge
// ══════════════════════════════════════════

const quizData = [
  {
    question: "How many official languages does South Africa have?",
    options: ["9 official languages", "11 official languages"],
    correct: 1,
    explanation: "South Africa has 11 official languages — the highest number of any country in the world. These include Zulu, Xhosa, Afrikaans, English, Northern Sotho, Tswana, Sotho, Tsonga, Swati, Venda, and Ndebele. This remarkable diversity is a direct result of its complex colonial history and the Ubuntu spirit of inclusion in the 1994 constitution."
  },
  {
    question: "Which European nation established the first permanent settlement at the Cape of Good Hope in 1652?",
    options: ["The British", "The Dutch (VOC)"],
    correct: 1,
    explanation: "The Dutch East India Company (VOC) founded a supply station at the Cape in 1652, led by Jan van Riebeeck. This settlement grew into the Cape Colony. The Dutch presence is why Afrikaans — a language derived from Dutch and mixed with many others — became one of South Africa's major languages."
  },
  {
    question: "What does the word 'Apartheid' literally mean in Afrikaans?",
    options: ["'Separateness' / 'Apart-hood'", "'Darkness' / 'Control'"],
    correct: 0,
    explanation: "Apartheid literally means 'separateness' or 'apart-hood' in Afrikaans. It described the system of racial segregation enforced from 1948 to 1994 by the National Party government. The word says it all — the entire legal system was designed to keep races apart, with catastrophic human consequences."
  },
  {
    question: "How many years did Nelson Mandela spend in prison?",
    options: ["27 years", "18 years"],
    correct: 0,
    explanation: "Nelson Mandela was imprisoned from 1964 to 1990 — a total of 27 years. He spent 18 of those years in the harsh conditions of Robben Island, breaking rocks in a limestone quarry. His release on February 11, 1990 was a moment watched by the whole world, and became the beginning of the end of apartheid."
  },
  {
    question: "In South African English, what is the common word for 'traffic lights'?",
    options: ["Signals", "Robots"],
    correct: 1,
    explanation: "South African English calls traffic lights 'robots' — one of the most famous examples of how South African English developed its own unique vocabulary. This term dates back to early traffic control devices and is still in everyday use across the country. It's a perfect illustration of how South African English diverged from American and British varieties."
  },
  {
    question: "What does the Nguni philosophy 'Ubuntu' mean?",
    options: ["'I am because we are'", "'Peace and harmony for all'"],
    correct: 0,
    explanation: "Ubuntu (oo-BOO-ntoo) means 'I am because we are' — a philosophy emphasizing community, shared humanity, and collective responsibility. It's central to South African culture and was championed by Nelson Mandela and Archbishop Desmond Tutu. Ubuntu influenced South Africa's Truth and Reconciliation process, choosing healing and community over revenge."
  },
  {
    question: "Which famous tech entrepreneur was born in Pretoria, South Africa?",
    options: ["Elon Musk", "Jeff Bezos"],
    correct: 0,
    explanation: "Elon Musk was born on June 28, 1971, in Pretoria, South Africa. He went on to co-found PayPal, and later founded Tesla, SpaceX, Neuralink, and X (formerly Twitter). He is one of the most impactful tech entrepreneurs in history — and South Africa's most famous modern export to the global tech world."
  },
  {
    question: "In what year did South Africa hold its first fully democratic election?",
    options: ["1990", "1994"],
    correct: 1,
    explanation: "On April 27, 1994, South Africa held its first fully democratic election open to all citizens regardless of race. Lines of voters stretched for miles; people waited 10 to 16 hours to cast their ballot. Nelson Mandela won, becoming South Africa's first Black president. This date is now celebrated as Freedom Day — one of the most important days in modern history."
  },
  {
    question: "What is the traditional South African outdoor barbecue called?",
    options: ["Braai", "Churrasco"],
    correct: 0,
    explanation: "A 'braai' comes from the Afrikaans word 'braaivleis,' meaning 'grilled meat.' It's far more than just cooking — it's a deeply social tradition that brings together South Africans of all backgrounds around an open fire. The braai is considered a cornerstone of South African culture, crossing all racial and economic lines. There is even a National Braai Day on September 24."
  },
  {
    question: "In which year did South Africa officially join the BRICS economic bloc?",
    options: ["2001", "2010"],
    correct: 1,
    explanation: "South Africa officially joined the BRICS bloc (Brazil, Russia, India, China) in 2010, making it the only African nation in the group. South Africa was invited because of its status as Africa's most industrialized economy and its role as a strategic gateway to the African continent. In 2023, South Africa hosted the BRICS Summit in Johannesburg."
  }
];

// ── State ──────────────────────────────
let currentQuestion = 0;
let score = 0;
let answered = false;

// ── DOM Elements ───────────────────────
let progressFill, questionCounter, scoreDisplay;
let questionText, answerButtons;
let explanationBox, expIcon, expText, nextBtn;
let quizContainer, quizResults;
let finalScore, resultsTitle, resultsEmoji, resultsMessage, restartBtn;

// ── Init ──────────────────────────────
function initQuiz() {
  progressFill    = document.getElementById('progressFill');
  questionCounter = document.getElementById('questionCounter');
  scoreDisplay    = document.getElementById('scoreDisplay');
  questionText    = document.getElementById('questionText');
  answerButtons   = document.getElementById('answerButtons');
  explanationBox  = document.getElementById('explanationBox');
  expIcon         = document.getElementById('expIcon');
  expText         = document.getElementById('expText');
  nextBtn         = document.getElementById('nextBtn');
  quizContainer   = document.getElementById('quizContainer');
  quizResults     = document.getElementById('quizResults');
  finalScore      = document.getElementById('finalScore');
  resultsTitle    = document.getElementById('resultsTitle');
  resultsEmoji    = document.getElementById('resultsEmoji');
  resultsMessage  = document.getElementById('resultsMessage');
  restartBtn      = document.getElementById('restartBtn');

  if (!quizContainer) return; // quiz section not in DOM yet
  loadQuestion();

  nextBtn.addEventListener('click', () => {
    currentQuestion++;
    if (currentQuestion < quizData.length) {
      loadQuestion();
    } else {
      showResults();
    }
  });

  restartBtn.addEventListener('click', () => {
    currentQuestion = 0;
    score = 0;
    answered = false;
    quizResults.style.display = 'none';
    quizContainer.style.display = 'block';
    loadQuestion();
  });
}

// ── Load Question ──────────────────────
function loadQuestion() {
  answered = false;
  const q = quizData[currentQuestion];

  // Update progress
  const pct = (currentQuestion / quizData.length) * 100;
  progressFill.style.width = pct + '%';
  questionCounter.textContent = `Question ${currentQuestion + 1} of ${quizData.length}`;
  scoreDisplay.textContent = score;

  // Fade out, then update
  const card = document.getElementById('quizCard');
  card.classList.add('fade-out');

  setTimeout(() => {
    questionText.textContent = q.question;
    answerButtons.innerHTML = '';

    q.options.forEach((option, index) => {
      const btn = document.createElement('button');
      btn.className = 'answer-btn';
      btn.textContent = option;
      btn.addEventListener('click', () => selectAnswer(index));
      answerButtons.appendChild(btn);
    });

    explanationBox.classList.remove('show-exp', 'wrong-exp');
    card.classList.remove('fade-out');
  }, 300);
}

// ── Select Answer ──────────────────────
function selectAnswer(selected) {
  if (answered) return;
  answered = true;

  const q = quizData[currentQuestion];
  const btns = answerButtons.querySelectorAll('.answer-btn');

  btns.forEach((btn, i) => {
    btn.disabled = true;
    if (i === q.correct) {
      btn.classList.add('correct');
    } else if (i === selected && selected !== q.correct) {
      btn.classList.add('wrong');
    }
  });

  const isCorrect = selected === q.correct;
  if (isCorrect) {
    score++;
    scoreDisplay.textContent = score;
  }

  // Show explanation
  expIcon.textContent = isCorrect ? '✅' : '❌';
  expText.textContent = q.explanation;

  explanationBox.classList.add('show-exp');
  if (!isCorrect) {
    explanationBox.classList.add('wrong-exp');
  }

  // Update next button text on last question
  if (currentQuestion === quizData.length - 1) {
    nextBtn.textContent = 'See Results →';
  } else {
    nextBtn.textContent = 'Next Question →';
  }
}

// ── Show Results ───────────────────────
function showResults() {
  progressFill.style.width = '100%';
  quizContainer.style.display = 'none';
  quizResults.style.display = 'block';

  finalScore.textContent = score;

  let emoji, title, message;

  if (score === 10) {
    emoji   = '🏆';
    title   = 'Perfect Score!';
    message = 'Extraordinary! You know South Africa inside and out. Siyabonga Kakhulu — thank you very much. You\'ve truly understood the Rainbow Nation.';
  } else if (score >= 8) {
    emoji   = '🌟';
    title   = 'Excellent!';
    message = 'Outstanding knowledge! You clearly paid attention. South Africa\'s rich history and culture made a real impression on you.';
  } else if (score >= 6) {
    emoji   = '👍';
    title   = 'Good Job!';
    message = 'Solid effort! You have a good grasp of South Africa\'s story. A quick review of the site will help lock in the rest.';
  } else if (score >= 4) {
    emoji   = '📚';
    title   = 'Keep Learning!';
    message = 'A decent start! South Africa has a rich and complex story. Head back through the sections and give the quiz another try.';
  } else {
    emoji   = '🔁';
    title   = 'Try Again!';
    message = 'No worries — South Africa\'s history is deep and detailed. Explore the site again; we promise it\'s worth it!';
  }

  resultsEmoji.textContent   = emoji;
  resultsTitle.textContent   = title;
  resultsMessage.textContent = message;

  // Save to localStorage
  try {
    const best = parseInt(localStorage.getItem('sa_quiz_best') || '0');
    if (score > best) {
      localStorage.setItem('sa_quiz_best', score);
    }
  } catch(e) {}
}

// Init when DOM is ready
document.addEventListener('DOMContentLoaded', initQuiz);