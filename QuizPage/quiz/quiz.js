const questionContainer = document.getElementById("que_div");
const yourAnswerDiv = document.getElementById('your_answer');
const textNumberDiv1 = document.getElementById('result');
const scoreDiv = document.getElementById('score');
const userAnswer = document.getElementsByTagName('input');
const btn = document.getElementsByClassName('btn');
window.onload = () => {
    const type = localStorage.getItem('quiz-type');
    if (type == 'test') {
        document.getElementById('your_answer').style.display = 'none';
        document.getElementById('result').style.display = 'none';
        // document.getElementsByClassName('question_container')[0].style.width = '70%';
        // document.getElementsByClassName('store_result_container')[0].style.width = '25%';
    }
    getQuestions({ category: "oops" });
}
let quizzes = [
    {
        "question": " Which one of the following node is considered the top of the stack if the stack is implemented using the linked list?",
        "optionA": "First node1",
        "optionB": "Second node",
        "optionC": "Last node",
        "optionD": "None of the above",
        "multipleAnswers": "false",
        "answerA": "true",
        "answerB": "false",
        "answerC": "false",
        "answerD": "false",
        "category": "dsa",
        "id": 60
    },
    {
        "question": " Which one of the following node is considered the top of the stack if the stack is implemented using the linked list?",
        "optionA": "First node2",
        "optionB": "Second node",
        "optionC": "Last node",
        "optionD": "None of the above",
        "multipleAnswers": "false",
        "answerA": "true",
        "answerB": "false",
        "answerC": "false",
        "answerD": "false",
        "category": "dsa",
        "id": 60
    },
    {
        "question": " Which one of the following node is considered the top of the stack if the stack is implemented using the linked list?",
        "optionA": "First node3",
        "optionB": "Second node",
        "optionC": "Last node",
        "optionD": "None of the above",
        "multipleAnswers": "false",
        "answerA": "true",
        "answerB": "false",
        "answerC": "true",
        "answerD": "false",
        "category": "dsa",
        "id": 60
    }
]
let question = '';
var storeData = [];
var storeAns = [];
let questions = quizzes.map((question) => {
    return question.question;
})
question = '';
var counter = 0;
function next() {
    yourStore();
    renderQuestion();

}

function renderQuestion() {
    if (counter < quizzes.length) {
        question = '<p class="heading">Q: ' + (counter + 1) + '. ' + quizzes[counter].question + '</p><div class="options_container">';
        question += "<div class='option_input'><input name='options_" + (counter) + "' type='checkbox' value='A'>" + quizzes[counter].optionA + "</div>";
        question += "<div class='option_input'><input name='options_" + (counter) + "' type='checkbox' value='B'>" + quizzes[counter].optionB + "</div>";
        question += "<div class='option_input'><input name='options_" + (counter) + "' type='checkbox' value='C'>" + quizzes[counter].optionC + "</div>";
        question += "<div class='option_input'><input name='options_" + (counter) + "' type='checkbox' value='D'>" + quizzes[counter].optionD + "</div></div><div class='btns_container'><button onclick='pre()' class='btn'>Prev</button><button onclick='result(quizzes[" + counter + "])' class='btn'>Result</button><button onclick='next()' class='btn'>Next</button></div>";
        questionContainer.innerHTML = question;
    }
    if (counter === quizzes.length) {
        btn[1].style.display = "block";
        btn[2].style.display = "none";
    }
}


function pre() {
    btn[2].style.display = "block";
    btn[1].style.display = "none";
    if (counter < 5) {
        if (counter > 0) {
            counter--;
        }
        question = '<p class="heading">Q: ' + (counter + 1) + '. ' + quizzes[counter].question + '</p><div class="options_container">';
        question += "<div class='option_input'><input name='options_" + counter + "' type='checkbox' value='A'>" + quizzes[counter].optionA + "</div>";
        question += "<div class='option_input'><input name='options_" + counter + "' type='checkbox' value='B'>" + quizzes[counter].optionB + "</div>";
        question += "<div class='option_input'><input name='options_" + counter + "' type='checkbox' value='C'>" + quizzes[counter].optionC + "</div>";
        question += "<div class='option_input'><input name='options_" + counter + "' type='checkbox' value='D'>" + quizzes[counter].optionD + "</div></div><div class='btns_container'><button onclick='pre()' class='btn'>Prev</button><button onclick='result(quizzes[" + counter + "])' class='btn'>Result</button><button onclick='next()' class='btn'>Next</button></div>";
        questionContainer.innerHTML = question;
    }
}

function yourStore() {
    let checkedOption = '';
    let correctOption = '';
    for (i = 0; i < userAnswer.length; i++) {
        console.log(userAnswer[i].checked, userAnswer[i].value)
        if (userAnswer[i].checked === true) {
            checkedOption += `${userAnswer[i].value} `;
        }
        if (quizzes[counter][`answer${userAnswer[i].value}`] === "true") {
            correctOption += `${userAnswer[i].value} `;
        }
    }
    if (checkedOption != '') {
        storeData[counter] = checkedOption;
        storeAns[counter] = correctOption;
    } else {
        storeData[counter] = 'y';
        storeAns[counter] = 'x';

    }

    yourAnswerDiv.innerHTML += '<div class="your_choice"><div>' + storeData[counter] + '</div><div>' + correctOption + '</div></div>';
    counter++;
}
function result() {
    scoreDiv.innerHTML = "Score";
    let score = 0;
    textNumberDiv1.innerHTML = "";
    for (j = 0; j < userAnswer.length; j++) {
        if (storeData[j] == storeAns[j]) {
            textNumberDiv1.innerHTML += '<div id="result_div">' + (j + 1) + '.Right Answer</div>';
            score++;
        }
        else {
            textNumberDiv1.innerHTML += '<div id="result_div">' + (j + 1) + '.Wrong Answer</div>';
        }
    }
    scoreDiv.innerHTML = "Score : " + score + "/" + userAnswer.length;
}
async function getQuestions({ category = "oops" }) {
    try {
        const res = await fetch(`http://localhost:3000/mcq?category=${category}`, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        let json = await res.json();
        console.log(json);
        if (json.length > 0) {
            quizzes = json;
            renderQuestion();
        }

    } catch (error) {
        console.log("error", error);
    }
}