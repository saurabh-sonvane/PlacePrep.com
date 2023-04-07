const practice = document.getElementById('practice-quiz');
const test = document.getElementById('test-quiz');
practice.addEventListener('click', goToPractice);
test.addEventListener('click', goToTest);

function goToPractice(event) {
    localStorage.setItem('quiz-type', 'practice');
    location.href = './SelectSubject.html'
}
function goToTest(event) {
    localStorage.setItem('quiz-type', 'test');
    location.href = './SelectSubject.html'
}

// location.href = './quiz/quiz.html' 