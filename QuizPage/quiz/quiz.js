const questionContainer = document.getElementById("que_div");
const yourAnswerDiv = document.getElementById('your_answer');
const textNumberDiv1 = document.getElementById('result');
const scoreDiv = document.getElementById('score');
const userAnswer = document.getElementsByTagName('input');
const btn = document.getElementsByClassName('btn');
const backBtn = document.getElementById('back-btn');



//camera and screen recording
let cameraStream = null;
  let screenStream = null;
  let mediaRecorder = null;
  let recordedChunks = [];

  const startButton = document.getElementById('startButton');
  const stopButton = document.getElementById('stopButton');
  const cameraVideo = document.getElementById('cameraVideo');
  const screenVideo = document.getElementById('screenVideo');


window.onload = async () => {
    const type = localStorage.getItem('quiz-type');
    if (type == 'test') {
        document.getElementById('your_answer').style.display = 'none';
        document.getElementById('result').style.display = 'none';


        // document.getElementsByClassName('question_container')[0].style.width = '70%';
        // document.getElementsByClassName('store_result_container')[0].style.width = '25%';

        // Recording Start 
        try {
            // get camera stream
            cameraStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
            // get screen stream
            screenStream = await navigator.mediaDevices.getDisplayMedia({ video: true, audio: true });
  
            // display camera stream in video element
            cameraVideo.srcObject = cameraStream;
  
            // create media recorder for screen stream
            mediaRecorder = new MediaRecorder(screenStream, { mimeType: 'video/webm; codecs=vp9' });
  
            mediaRecorder.ondataavailable = (event) => {
                recordedChunks.push(event.data);
            };
  
            mediaRecorder.onstop = () => {
                const blob = new Blob(recordedChunks, { type: 'video/webm' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'recording.webm';
                document.body.appendChild(a);
                a.click();
                recordedChunks = [];
                stopButton.disabled = true;
                startButton.disabled = false;
                cameraVideo.style.display = 'block';
                screenVideo.style.display = 'none';
            };
  
            stopButton.disabled = false;
            startButton.disabled = true;
            mediaRecorder.start();
        } catch (err) {
            console.error(err);
        }
    }
    backBtn.addEventListener('click', () => {
        history.back()
    })
    textNumberDiv1.style.display = 'none';
    let currentSubject = localStorage.getItem('subject');
    getQuestions({ category: currentSubject });
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
    console.log(counter);
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
        btn[1].innerHTML = "Result";
        btn[1].style.display = "block";
        btn[2].style.display = "none";

        //recording stop
        mediaRecorder.stop();
        cameraStream.getTracks().forEach(track => track.stop());
        screenStream.getTracks().forEach(track => track.stop());
        cameraStream = null;
        screenStream = null;
        setTimeout(()=>{
            history.back()
        },100000)
    }
}


function pre() {
    btn[2].style.display = "block";
    btn[1].style.display = "none";
    console.log(counter, quizzes.length);

    if (counter <= quizzes.length) {
        if (counter > 0) {
            counter--;
            console.log(document.querySelectorAll(".your_choice:last-child")[0].remove())
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
        storeData[counter] = 'skipped';
        storeAns[counter] = 'x';

    }

    yourAnswerDiv.innerHTML += '<div class="your_choice"><div>' + storeData[counter] + '</div><div>' + correctOption + '</div></div>';
    counter++;
}
function result() {
    scoreDiv.innerHTML = "Score";
    let score = 0;
    textNumberDiv1.innerHTML = "";
    for (j = 0; j < quizzes.length; j++) {
        if (storeData[j] == storeAns[j]) {
            textNumberDiv1.innerHTML += '<div id="result_div">' + (j + 1) + '.Right Answer</div>';
            score++;
        }
        else {
            textNumberDiv1.innerHTML += '<div id="result_div">' + (j + 1) + '.Wrong Answer</div>';
        }
    }
    textNumberDiv1.style.display = 'none';
    scoreDiv.innerHTML = "Score : " + score + "/" + quizzes.length;
    const type = localStorage.getItem('quiz-type');
    if (type == 'test') {
        getScores().then(res => {
            let quizScores = res.quizScores
            let newTotal = 0;
            let flag = false;
            console.log('previous scores', quizScores);
            let currentSubject = localStorage.getItem('subject');
            for (const key in quizScores) {
                if (key === currentSubject) {
                    if (quizScores[key] < score) {
                        quizScores[key] = score;
                    }
                    flag = true;
                }
                newTotal += quizScores[key]
                console.log(`${key}: ${quizScores[key]}`);
            }
            if (!flag) {
                quizScores[currentSubject] = score
                newTotal += score
                console.log(quizScores);
            }
            console.log(newTotal);
            updateScore({ total: newTotal, individual: quizScores })
        })
    }

}
async function getQuestions({ category = "oops" }) {
    try {
        const res = await fetch(`https://placeprepbackend.onrender.com/mcq?category=${category}`, {
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
async function updateScore({ total, individual }) {
    let user = JSON.parse(localStorage.getItem('user'));
    const quizScores = {
        "totalScore": total,
        "quizScores": individual // object
    }
    console.log(quizScores);
    try {
        const res = await fetch(`https://placeprepbackend.onrender.com/users/${user.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(quizScores),
        });
        getScores();
        console.log("res", res);
    } catch (error) {
        console.log("error", error);
    }
}
async function getScores() {
    let user = JSON.parse(localStorage.getItem('user'));
    console.log("userSc", user);
    try {
        const res = await fetch(`https://placeprepbackend.onrender.com/users/${user.id}`, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        let json = await res.json();
        localStorage.setItem("user", JSON.stringify(json));
        return json;

    } catch (error) {
        console.log("error", error);
    }
}