class Question {
  constructor(id, text, options, correctAnswer) {
    this.id = id;
    this.text = text;
    this.options = options;
    this.correctAnswer = correctAnswer;
  }
}

const questions = [
  new Question(1, "Which flies a green, white, and orange (in that order) tricolor flag?", ["Ireland", "Ivory coast", "Italy"], "Ireland"),
  new Question(2, "Who sang the title song for the latest Bond film, No Time to Die?", ["Adele", "Sam Smith","Billie Eilish"], "Billie Eilish"),
  new Question(3, "What company makes the Xperia model of smartphone??", ["Samsung", "Nokia","Sony"], "Sony"),
  new Question(4, "What spirit is used in making a Tom Collins", ["Vodka", "Rum","Gin"], "Gin"),
  new Question(5, "What was the name of the Franco-British supersonic commercial plane that operated from 1976-2003?", ["Accord", "Concorde","Mirage"], "Concorde"),
  new Question(6, "The 31.5-mile-long Chunnel connects England and France", ["True", "False"], "True"),
  new Question(7, "The world’s largest island is Greenland.", ["True", "False"], "True"),
  new Question(8, "Of all the states in the union, Alaska has the most active volcanoes.", ["True", "False"], "True"),
  new Question(9, "The largest ocean in the world is the Atlantic Ocean.", ["True", "False"], "False"),
  new Question(10,"Pinocchio” is the shortest Disney film. ", ["True", "False"], "False"),
];

class Quiz {
  constructor(questions) {
    this.questions = questions;
    this.answers = {}; // user answers
    this.loadAnswers();
  }

  loadAnswers() {
    const savedAnswers = JSON.parse(localStorage.getItem('quiz-answers'));
    if (savedAnswers) {
      this.answers = savedAnswers;
    }
  }

  saveAnswers() {
    localStorage.setItem('quiz-answers', JSON.stringify(answers));
  }

  reset() {
    this.answers = {};
    localStorage.removeItem('quiz-answers');
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
    document.getElementById('result').textContent = 
      `Score: ${score}/${total} - ${passed ? 'Passed ✅' : 'Failed ❌'}`;
    // Clear saved answers after finishing
    localStorage.removeItem('quiz-answers');
  }
}