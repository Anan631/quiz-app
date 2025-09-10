class Question {
  constructor(id, text, options, correctAnswer) {
    this.id = id;
    this.text = text;
    this.options = options;
    this.correctAnswer = correctAnswer;
  }
}

class TFQuestion extends Question {
  render(selectedAnswer) {
    const optionsDiv = document.createElement('div');
    optionsDiv.classList.add('options');

    this.options = ["True", "False"];
    this.options.forEach(option => {
      const label = document.createElement('label');
      label.innerHTML = `
        <input type="radio" name="${this.id}" value="${option}" ${selectedAnswer === option ? 'checked' : ''}>
        ${option}
      `;
      optionsDiv.appendChild(label);
    });

    const div = document.createElement('div');
    div.classList.add('question');
    div.innerHTML = `<p>${this.text}</p>`;
    div.appendChild(optionsDiv);
    return div;
  }
}

class Quiz {
  constructor(questions) {
    this.questions = questions;
    this.answers = JSON.parse(localStorage.getItem('quiz-answers')) || {};
  }

  saveAnswers() {
    localStorage.setItem('quiz-answers', JSON.stringify(this.answers));
  }

  reset() {
    this.answers = {};
    localStorage.removeItem('quiz-answers');
    this.render();
    document.getElementById('result').textContent = '';
  }

  handleChange(questionId, value) {
    this.answers[questionId] = value;
    this.saveAnswers();
  }

  calculateScore() {
    let score = 0;
    this.questions.forEach(q => {
      if (this.answers[q.id] === q.correctAnswer) score++;
    });
    return score;
  }

  submit() {
    const score = this.calculateScore();
    const total = this.questions.length;
    const percentage = (score / total) * 100;
    const passed = percentage >= 70;
    const resultEl = document.getElementById('result');
    resultEl.textContent = `Score: ${score}/${total} - ${passed ? 'Passed' : 'Failed'}`;
    resultEl.style.color = passed ? 'green' : 'red';
    localStorage.removeItem('quiz-answers');
  }

  render() {
    const container = document.getElementById('quiz-container');
    container.innerHTML = '';

    this.questions.forEach(q => {
      if (q instanceof TFQuestion) {
        container.appendChild(q.render(this.answers[q.id]));
      } else {
        const div = document.createElement('div');
        div.classList.add('question');
        div.innerHTML = `<p>${q.text}</p>`;

        const optionsDiv = document.createElement('div');
        optionsDiv.classList.add('options');

        q.options.forEach(option => {
          const id = `${q.id}-${option}`;
          const checked = this.answers[q.id] === option ? 'checked' : '';
          optionsDiv.innerHTML += `
            <label>
              <input type="radio" name="${q.id}" value="${option}" ${checked}>
              ${option}
            </label>
          `;
        });

        div.appendChild(optionsDiv);
        container.appendChild(div);
      }
    });

    // Attach event listeners
    this.questions.forEach(q => {
      const inputs = document.getElementsByName(q.id);
      inputs.forEach(input => {
        input.addEventListener('change', e => {
          this.handleChange(q.id, e.target.value);
        });
      });
    });
  }
}

// Questions list
const questions = [
  new Question(1, "Which flies a green, white, and orange (in that order) tricolor flag?", ["Ireland", "Ivory coast", "Italy"], "Ireland"),
  new Question(2, "Who sang the title song for the latest Bond film, No Time to Die?", ["Adele", "Sam Smith", "Billie Eilish"], "Billie Eilish"),
  new Question(3, "What company makes the Xperia model of smartphone?", ["Samsung", "Nokia","Sony"], "Sony"),
  new Question(4, "What spirit is used in making a Tom Collins?", ["Vodka", "Rum","Gin"], "Gin"),
  new Question(5, "What was the name of the Franco-British supersonic commercial plane that operated from 1976-2003?", ["Accord", "Concorde","Mirage"], "Concorde"),
  new TFQuestion(6, "The 31.5-mile-long Chunnel connects England and France", ["True","False"], "True"),
  new TFQuestion(7, "The world’s largest island is Greenland.", ["True","False"], "True"),
  new TFQuestion(8, "Of all the states in the union, Alaska has the most active volcanoes.", ["True","False"], "True"),
  new TFQuestion(9, "The largest ocean in the world is the Atlantic Ocean.", ["True","False"], "False"),
  new TFQuestion(10,"Pinocchio is the shortest Disney film.", ["True","False"], "False"),
];

const quiz = new Quiz(questions);
quiz.render();

document.getElementById('reset-btn').addEventListener('click', () => quiz.reset());
document.getElementById('submit-btn').addEventListener('click', () => quiz.submit());
