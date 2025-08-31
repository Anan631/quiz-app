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