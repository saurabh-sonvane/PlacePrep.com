const practice = document.getElementById('practice-quiz');
const test = document.getElementById('test-quiz');
practice.addEventListener('click', goToPractice);
test.addEventListener('click', goToTest);

function goToPractice(event) {
    localStorage.setItem('quiz-type', 'practice');
    location.href = './quiz/quiz.html'
}
function goToTest(event) {
    localStorage.setItem('quiz-type', 'test');
    location.href = './quiz/quiz.html'

}