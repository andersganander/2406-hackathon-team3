
const categories = [
  "Work and Education",
  "Health",
  "Social Media and Technology",
  "Family and Relations"
];

const questions = {
  "Work and Education": [
      "I often feel overwhelmed by my workload.",
      "I find it hard to balance work and personal life.",
      "I frequently worry about my performance at work.",
      "I have trouble meeting deadlines.",
      "I feel stressed about job security.",
      "I find it hard to concentrate at work.",
      "I feel undervalued at my job.",
      "I worry about advancing in my career."
  ],
  "Health": [
      "I often feel fatigued or tired.",
      "I experience frequent headaches or muscle tension.",
      "I have trouble sleeping.",
      "I feel stressed about my health.",
      "I worry about getting sick.",
      "I find it hard to maintain a healthy lifestyle.",
      "I feel anxious about medical appointments.",
      "I have difficulty managing chronic health conditions."
  ],
  "Social Media and Technology": [
      "I feel overwhelmed by notifications.",
      "I spend too much time on social media.",
      "I feel stressed about my online presence.",
      "I worry about missing out on social media.",
      "I feel anxious about cyberbullying.",
      "I find it hard to disconnect from my devices.",
      "I feel pressure to be available online.",
      "I worry about my privacy on social media."
  ],
  "Family and Relations": [
      "I often argue with family members.",
      "I feel stressed about family responsibilities.",
      "I have trouble communicating with my partner.",
      "I worry about my children's well-being.",
      "I feel pressure to meet family expectations.",
      "I find it hard to balance family and work life.",
      "I feel unsupported by my family.",
      "I worry about family conflicts."
  ]
};

const scores = {
  "Work and Education": 0,
  "Health": 0,
  "Social Media and Technology": 0,
  "Family and Relations": 0
};

let currentCategoryIndex = 0;
let currentQuestionIndex = 0;
const questionsPerPage = 4;

document.addEventListener('DOMContentLoaded', function() {
  var elems = document.querySelectorAll('.parallax');
  var instances = M.Parallax.init(elems);
  var sidenav = document.querySelectorAll('.sidenav');
  M.Sidenav.init(sidenav);
  M.AutoInit();
  showQuestions();

});


function showQuestions() {
  const category = categories[currentCategoryIndex];
  const categoryQuestions = questions[category];
  const questionForm = document.getElementById('question-form');
  const categoryHeading = document.getElementById('category-heading');

  console.log("Showing questions for category: ${category}");
  categoryHeading.textContent = `${category} (${currentQuestionIndex + 1}-${Math.min(currentQuestionIndex + questionsPerPage, categoryQuestions.length)} of ${categoryQuestions.length})`;

  questionForm.innerHTML = '';

  for (let i = currentQuestionIndex; i < currentQuestionIndex + questionsPerPage && i < categoryQuestions.length; i++) {
      const questionDiv = document.createElement('div');
      questionDiv.className = 'question';
      questionDiv.innerHTML = `
          <span class="question-number">${i + 1}.</span>
          <label>${categoryQuestions[i]}</label>
          <p class="range-field">
              <input type="range" id="q${i}" min="1" max="5" />
          </p>
      `;
      questionForm.appendChild(questionDiv);
  }
}

function nextQuestions() {
  currentQuestionIndex += questionsPerPage;
  if (currentQuestionIndex >= questions[categories[currentCategoryIndex]].length) {
      currentQuestionIndex = 0;
      currentCategoryIndex++;
  }
  if (currentCategoryIndex >= categories.length) {
      showSummary();
  } else {
      showQuestions();
  }
}

function showSummary() {
  const summary = document.getElementById('summary');
  const summaryText = document.getElementById('summary-text');
  summaryText.innerHTML = '';

  categories.forEach(category => {
      let totalScore = 0;
      for (let i = 0; i < questions[category].length; i++) {
          const score = parseInt(document.getElementById(`q${i}`) ? document.getElementById(`q${i}`).value : 0);
          totalScore += score;
      }
      summaryText.innerHTML += `<p><strong>${category}:</strong> ${totalScore}</p>`;
  });

  document.getElementById('question-form').classList.add('hidden');
  document.getElementById('next-button').classList.add('hidden');
  summary.classList.remove('hidden');
}



