
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

const choice_texts = {
  1: "Strongly disagree",
  2: "Disagree",
  3: "Neutral",
  4: "Agree",
  5: "Strongly agree"
}

let currentCategoryIndex = 0;
let currentQuestionIndex = 0;
const questionsPerPage = 4;
let changedCategoryIndex = false;

document.addEventListener('DOMContentLoaded', function() {
  var elems = document.querySelectorAll('.parallax');
  var instances = M.Parallax.init(elems);
  var sidenav = document.querySelectorAll('.sidenav');
  M.Sidenav.init(sidenav);
  // var array_of_dom_elements = document.querySelectorAll("input[type=range]");
  // M.Range.init(array_of_dom_elements);
  // M.AutoInit();
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
          <label class="questions">${categoryQuestions[i]}</label>
          <p id="choice_${i}">${choice_texts[3]}</p>
          <p class="range-field">
              <input type="range" id="q${i}" onchange=updateChoiceText(this,${i}) min="1" max="5" />
          </p>
      `;
      questionForm.appendChild(questionDiv);
  }
}

function nextQuestions() {
  // Update scores for current category
  // categories.forEach((category, index) => {
  //     scores[category] += parseInt(document.getElementById(`q${index}`) ? document.getElementById(`q${index}`).value : 0);
  //     console.log(`${category}: ${scores[category]}`);
  // });

  // log current category
  console.log(categories[currentCategoryIndex]);
  console.log(currentCategoryIndex);
  console.log(changedCategoryIndex);

 

  // change class to active for category header
  const categoryHeader = document.getElementById(`category-${currentCategoryIndex}`);
  //categoryHeader.classList.remove('active');
  //categoryHeader.classList.add('active');

  // sum all values of all questions
  let totalScore = 0;
  for (let i = 0; i < questions[categories[currentCategoryIndex]].length; i++) {
      const score = parseInt(document.getElementById(`q${i}`) ? document.getElementById(`q${i}`).value : 0);
      console.log(`q${i}: ${score}`);
      totalScore += score;
  }
  console.log('Total: '+totalScore);
  scores[categories[currentCategoryIndex]] += totalScore;
  console.log('After '+scores[categories[currentCategoryIndex]]);

  currentQuestionIndex += questionsPerPage;
  if (currentQuestionIndex >= questions[categories[currentCategoryIndex]].length) {
    currentQuestionIndex = 0;
    currentCategoryIndex++;
    changedCategoryIndex = true;
      
  }
  if (currentCategoryIndex >= categories.length) {
      showSummary();
  } else {
    if (currentCategoryIndex < categories.length && changedCategoryIndex) {
      const currentCategoryHeader = document.getElementById(`category_${currentCategoryIndex}`);
      const previousCategoryHeader = document.getElementById(`category_${currentCategoryIndex-1}`);
      currentCategoryHeader.classList.add('active_category');
      currentCategoryHeader.classList.remove('category_header');
      previousCategoryHeader.classList.remove('active_category');
      previousCategoryHeader.classList.add('category_header');
      changedCategoryIndex = false;
    }
      showQuestions();
  }
}

function showSummary() {
  const summary = document.getElementById('summary');
  const summaryText = document.getElementById('summary-text');
  summaryText.innerHTML = '';

const getEmoji = (score) => {
    if (score <= 16 ) {
      return { emoji: '😊', color: 'green lighten-2', emojiClass: 'emoji', text: 'No stress baby!! ⭐' };
    } else if (score <= 28) {
      return { emoji: '😐', color: 'yellow lighten-2', emojiClass: 'emoji', text: 'Almost there, keep pushing! 💪🏻' };
    } else {
      return { emoji: '😞', color: 'red lighten-2', emojiClass: 'emoji', text: 'This should be a focus area ❤️' };
    }
  };

  // Re-write
  //categories.forEach(category => {
  for (const [key, value] of Object.entries(scores)) {
    // let totalScore = 0;
    // questions[category].forEach((qIndex) => {
    //   const score = parseInt(document.getElementById(`q${qIndex}`).value);
    //   totalScore += score;
    // });

    const { emoji, color, emojiClass, text } = getEmoji(value);
    summaryText.innerHTML += `
      <div class="card ${color}">
        <div class="card-content">
          <span class="card-title"><strong>${key}:</strong> <span class="${emojiClass}">${emoji}</span> ${value}</span>
          <p>${text}</p>
        </div>
      </div>
    `;
  };
  
  


     // iterate scores object
    //  for (const [key, value] of Object.entries(scores)) {
    //   summaryText.innerHTML += `<p><strong>${key}:</strong> ${value}</p>`;
    // }


  document.getElementById('question-form').classList.add('hidden');
  document.getElementById('next-button').classList.add('hidden');
  document.getElementById('category-heading').classList.add('hidden');
  summary.classList.remove('hidden');
}

function updateChoiceText(event, qid) {
  document.getElementById("choice_"+qid).innerText = choice_texts[event.value];
}

function getTopTwoCategoryNames(scores) {
  let items = Object.entries(scores);

  items.sort(function(a, b) {
      return b[1] - a[1]; 
  });

  let topTwo = items.slice(0, 2);

  let topTwoCategoryNames = topTwo.map(function(item) {
      return item[0]; 
  });

  return topTwoCategoryNames; 
}




