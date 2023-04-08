
let url = `https://placeprepbackend.onrender.com/mcq`;
let form=document.querySelector("form")
class mcq {
    constructor(question, optionA, optionB, optionC, optionD, multipleAnswers, answerA, answerB, answerC, answerD, category) {
        this.question = question;
        this.optionA = optionA;
        this.optionB = optionB;
        this.optionC = optionC;
        this.optionD = optionD;
        this.multipleAnswers = multipleAnswers;
        this.answerA = answerA;
        this.answerB = answerB;
        this.answerC = answerC;
        this.answerD = answerD;
        this.category = category;
    }
}

form.onsubmit = function () {
    event.preventDefault();
    create();
}

// function getFacilities(data) {
//     let arr = data.split(",");
//     let obj = {
//         wifi: arr[0],
//         AC: arr[1],
//         pool: arr[2],
//         spa: arr[3],
//         Gym:arr[4],
//         HotelBar: arr[5],
//         Pets: arr[6],
//         Parking: arr[7],
//         resturent: arr[8]
//     }

//     return obj;
// }

// function getRating(data) {
//     let arr = data.split(",");
//     let obj = {
//         overall: arr[0],
//         location: arr[1],
//         room: arr[2],
//         cleanliness: arr[3],
//         service: arr[4]
//     }

//     return obj;
// }

function create() {
    let question = document.querySelector("#Question").value;
    let optionA = document.querySelector("#optionA").value;
    let optionB = document.querySelector("#optionB").value;
    let optionC = document.querySelector("#optionC").value;
    let optionD = document.querySelector("#optionD").value;
    let multipleAnswers = document.querySelector("#multiple").value;
    let answerA = document.querySelector("#answerA").value;
    let answerB = document.querySelector("#answerB").value;
    let answerC = document.querySelector("#answerC").value;
    let answerD = document.querySelector("#answerD").value;
    let category = document.querySelector("#category").value;

    let Mcq = new mcq(question, optionA, optionB, optionC, optionD, multipleAnswers, answerA, answerB, answerC, answerD, category);
    if(question!="" && optionA!="" && optionB!="" && optionC!="" && optionD!="" && answerA!="" && answerB!="" && answerC!="" && answerD!="" && category!="" && multipleAnswers!=""){
        post(Mcq);
    }else{
        alert("please Enter All details");
    }
    
}

async function post(Mcq) {

    try {
        let response = await fetch(url, {
            method: "POST",
            body: JSON.stringify(Mcq),
            headers: {
                "Content-Type": "application/json"
            }
        });
        form.reset();
    } catch (error) {
        console.log(error);
    }
}