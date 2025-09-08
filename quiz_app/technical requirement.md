# Quiz App - Technical Requirements

## User Story 1: See all questions at once
**Code Implementation:**
```javascript
render() {
  const container = document.getElementById('quiz-container');
  this.questions.forEach(q => {
    // Creates div for each question and appends to container
  });
}
```
- All questions rendered simultaneously using `forEach` loop
- Questions displayed in `#quiz-container` div

## User Story 2: Multiple choice options
**Code Implementation:**
```javascript
q.options.forEach(option => {
  optionsDiv.innerHTML += `
    <input type="radio" name="${q.id}" value="${option}">
    ${option}
  `;
});
```
- Radio buttons grouped by question ID (`name="${q.id}"`)
- Each option becomes a selectable radio button

## User Story 3: Reset button
**Code Implementation:**
```javascript
reset() {
  this.answers = {};
  localStorage.removeItem('quiz-answers');
  this.render();
  document.getElementById('result').textContent = '';
}
```
- Clears `answers` object
- Removes saved data from localStorage
- Re-renders form and clears results

## User Story 4: Submit button
**Code Implementation:**
```javascript
submit() {
  const score = this.calculateScore();
  const total = this.questions.length;
  // Display results and cleanup
}
```
- Calculates final score
- Displays results in `#result` div

## User Story 5: Show final score
**Code Implementation:**
```javascript
calculateScore() {
  let score = 0;
  this.questions.forEach(q => {
    if (this.answers[q.id] === q.correctAnswer) score++;
  });
  return score;
}
```
- Compares user answers with correct answers
- Returns score count
- Displayed as "Score: X/Y" format

## User Story 6: Pass/Fail status
**Code Implementation:**
```javascript
const percentage = (score / total) * 100;
const passed = percentage >= 70;
document.getElementById('result').textContent = 
  `Score: ${score}/${total} - ${passed ? 'Passed' : 'Failed'}`;
```
- 70% threshold for passing
- Shows "Passed" or "Failed" status

## User Story 7: Save answers temporarily
**Code Implementation:**
```javascript
handleChange(questionId, value) {
  this.answers[questionId] = value;
  this.saveAnswers();
}

saveAnswers() {
  localStorage.setItem('quiz-answers', JSON.stringify(this.answers));
}

loadAnswers() {
  const savedAnswers = JSON.parse(localStorage.getItem('quiz-answers'));
  if (savedAnswers) {
    this.answers = savedAnswers;
  }
}
```
- Saves answers to localStorage on every change
- Loads saved answers on page refresh

## User Story 8: Fresh start after completion
**Code Implementation:**
```javascript
submit() {
  // ... calculate and show results
  localStorage.removeItem('quiz-answers'); // Clean up after submit
}
```
- Removes localStorage data after quiz submission
- Next page refresh starts with empty answers