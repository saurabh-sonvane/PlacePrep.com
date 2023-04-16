// import data from "../backend/db.json" assert {type:'json'}  
let res;

window.onload = async () => {
  res = await getMcqs();
  let joinNowBtn = document.querySelector(".join-us-btn");
  let user = JSON.parse(localStorage.getItem('user'));

  let loc = "../login/loginSignup.html";
  console.log('xxx', user);
  if (user) {
    loc = "../UserProfile/userProfile.html";
    joinNowBtn.textContent = 'Profile'
  }
  joinNowBtn.addEventListener('click', function () {
    location.href = loc;
  })
}


var sendForm = document.querySelector('#chatform'),
  textInput = document.querySelector('.chatbox'),
  chatList = document.querySelector('.chatlist'),
  userBubble = document.querySelectorAll('.userInput'),
  botBubble = document.querySelectorAll('.bot__output'),
  animateBotBubble = document.querySelectorAll('.bot__input--animation'),
  overview = document.querySelector('.chatbot__overview'),
  hasCorrectInput,
  imgLoader = false,
  animationCounter = 1,
  animationBubbleDelay = 600,
  input,
  previousInput,
  isReaction = false,
  unkwnCommReaction = "I didn't quite get that.",
  chatbotButton = document.querySelector(".submit-button")

sendForm.onkeydown = function (e) {
  if (e.keyCode == 13) {
    e.preventDefault();

    //No mix ups with upper and lowercases
    var input = textInput.value.toLowerCase();

    //Empty textarea fix
    if (input.length > 0) {
      createBubble(input)
    }
  }
};

sendForm.addEventListener('submit', function (e) {
  //so form doesnt submit page (no page refresh)
  e.preventDefault();

  //No mix ups with upper and lowercases
  var input = textInput.value.toLowerCase();

  //Empty textarea fix
  if (input.length > 0) {
    createBubble(input)
  }
}) //end of eventlistener

var createBubble = function (input) {
  //create input bubble
  var chatBubble = document.createElement('li');
  chatBubble.classList.add('userInput');

  //adds input of textarea to chatbubble list item
  chatBubble.innerHTML = input;

  //adds chatBubble to chatlist
  chatList.appendChild(chatBubble)

  checkInput(input);
}

var checkInput = function (input) {
  hasCorrectInput = false;
  isReaction = false;
  //Checks all text values in possibleInput
  for (var textVal in possibleInput) {
    //If user reacts with "yes" and the previous input was in textVal
    if (input == "yes" || input.indexOf("yes") >= 0) {
      if (previousInput == textVal) {
        console.log("sausigheid");

        isReaction = true;
        hasCorrectInput = true;
        botResponse(textVal);
      }
    }
    if (input == "no" && previousInput == textVal) {
      unkwnCommReaction = "For a list of commands type: Commands";
      unknownCommand("I'm sorry to hear that :(")
      unknownCommand(unkwnCommReaction);
      hasCorrectInput = true;
    }

    if (input == "coding languages") {
      hasCorrectInput = true;
      textInput.value = "";
      window.open('../AllStudy/Languages/languages.html', '_blank')
    }

    if (input == "logical reasoning") {
      hasCorrectInput = true;
      textInput.value = "";
      window.open('../AllStudy/Logical Reasoning/logical.html', '_blank')
    }

    if (input == "dbms") {
      hasCorrectInput = true;
      textInput.value = "";
      window.open('../AllStudy/STUDY MATERIAL/DBMS/dbms.html', '_blank')
    }

    if (input == "dsa") {
      hasCorrectInput = true;
      textInput.value = "";
      window.open('../AllStudy/STUDY MATERIAL/DSA/dsa.html', '_blank')
    }

    if (input == "oops") {
      hasCorrectInput = true;
      textInput.value = "";
      window.open('../AllStudy/STUDY MATERIAL/OOPS/oops.html', '_blank')
    }

    if (input == "osa") {
      hasCorrectInput = true;
      textInput.value = "";
      window.open('../AllStudy/STUDY MATERIAL/OSA/osa.html', '_blank')
    }

    if (input == "verbal ability") {
      hasCorrectInput = true;
      textInput.value = "";
      window.open('../AllStudy/Verbal Ability/Verbal Ability.html', '_blank')
    }

    //Is a word of the input also in possibleInput object?
    if (input == textVal || input.indexOf(textVal) >= 0 && isReaction == false) {
      console.log("succes");
      hasCorrectInput = true;
      botResponse(textVal);
    }
  }

  //mcq response
  // console.log('res',res);
  console.log('input', input);
  if (hasCorrectInput == false) {
    for (var i = 0; i < res.length; i++) {

      //  console.log(quest)
      //  console.log("input")
      if (input == res[i].question.toLowerCase()) {
        if (res[i].answerA == "true") {
          isReaction = true;
          hasCorrectInput = true;
          botResponse(res[i].optionA);
          console.log(res[i].optionA)
          //responseText("Answer: "+ res[i].optionA)
          // var userBubble = document.createElement('li');
          // userBubble.classList.add('bot__output');
          // userBubble.innerHTML = "Answer: "+ res[i].optionA
          // chatList.appendChild(userBubble) 
          textInput.value = "";
          hasCorrectInput = true;
        } else if (res[i].answerB == "true") {
          isReaction = true;
          hasCorrectInput = true;
          botResponse(res[i].optionB);
          console.log(res[i].optionB)
          //responseText("Answer: "+ res[i].optionB)
          // var userBubble = document.createElement('li');
          // userBubble.classList.add('bot__output');
          // userBubble.innerHTML = "Answer: "+ res[i].optionB
          // chatList.appendChild(userBubble) 
          textInput.value = "";
          hasCorrectInput = true;
        } else if (res[i].answerC == "true") {
          isReaction = true;
          hasCorrectInput = true;
          botResponse(res[i].optionC);
          console.log(res[i].optionC)
          //responseText("Answer: "+ res[i].optionC)
          // var userBubble = document.createElement('li');
          // userBubble.classList.add('bot__output');
          // userBubble.innerHTML = "Answer: "+ res[i].optionC
          // chatList.appendChild(userBubble) 
          textInput.value = "";
          hasCorrectInput = true;
        } else if (res[i].answerD == "true") {
          isReaction = true;
          hasCorrectInput = true;
          botResponse(res[i].optionD);
          console.log(res[i].optionD)
          // responseText("Answer: "+ res[i].optionD)
          // var userBubble = document.createElement('li');
          // userBubble.classList.add('bot__output');
          // userBubble.innerHTML = "Answer: "+ res[i].optionD
          // chatList.appendChild(userBubble) 
          textInput.value = "";
          hasCorrectInput = true;
        }
        break;
      }
    }

    //When input is not in possibleInput
    if (hasCorrectInput == false) {
      console.log("failed");
      unknownCommand(unkwnCommReaction);
      hasCorrectInput = true;
    }


  }


}

// debugger;

function botResponse(textVal) {
  //sets previous input to that what was called
  // previousInput = input;
  console.log('creating bubble', isReaction, textVal);
  //create response bubble
  var userBubble = document.createElement('li');
  userBubble.classList.add('bot__output');


  if (isReaction == true) {
    if (typeof reactionInput[textVal] === "function") {
      //adds input of textarea to chatbubble list item
      userBubble.innerHTML = reactionInput[textVal]();
    } else {
      userBubble.innerHTML = reactionInput[textVal];
    }
    console.log('xxx', reactionInput[textVal]);
    if (reactionInput[textVal] == undefined) {
      console.log('here');
      unknownCommand("Answer: " + textVal);
      animationCounter = 1;
    }
  }


  if (isReaction == false) {
    //Is the command a function?
    if (typeof possibleInput[textVal] === "function") {
      // console.log(possibleInput[textVal] +" is a function");
      //adds input of textarea to chatbubble list item
      userBubble.innerHTML = possibleInput[textVal]();
    } else {
      userBubble.innerHTML = possibleInput[textVal];
    }
  }
  //add list item to chatlist
  chatList.appendChild(userBubble) //adds chatBubble to chatlist

  // reset text area input
  textInput.value = "";
}

function unknownCommand(unkwnCommReaction) {
  // animationCounter = 1;

  //create response bubble
  var failedResponse = document.createElement('li');

  failedResponse.classList.add('bot__output');
  failedResponse.classList.add('bot__output--failed');

  //Add text to failedResponse
  failedResponse.innerHTML = unkwnCommReaction; //adds input of textarea to chatbubble list item

  //add list item to chatlist
  chatList.appendChild(failedResponse) //adds chatBubble to chatlist

  animateBotOutput();

  // reset text area input
  textInput.value = "";

  //Sets chatlist scroll to bottom
  chatList.scrollTop = chatList.scrollHeight;

  animationCounter = 1;
}

function responseText(e) {

  var response = document.createElement('li');

  response.classList.add('bot__output');

  //Adds whatever is given to responseText() to response bubble
  response.innerHTML = e;

  chatList.appendChild(response);

  animateBotOutput();

  console.log(response.clientHeight);

  //Sets chatlist scroll to bottom
  setTimeout(function () {
    chatList.scrollTop = chatList.scrollHeight;
    console.log(response.clientHeight);
  }, 0)
}

function responseImg(e) {
  var image = new Image();

  image.classList.add('bot__output');
  //Custom class for styling
  image.classList.add('bot__outputImage');
  //Gets the image
  image.src = "/images/" + e;
  chatList.appendChild(image);

  animateBotOutput()
  if (image.completed) {
    chatList.scrollTop = chatList.scrollTop + image.scrollHeight;
  }
  else {
    image.addEventListener('load', function () {
      chatList.scrollTop = chatList.scrollTop + image.scrollHeight;
    })
  }
}

//change to SCSS loop
function animateBotOutput() {
  chatList.lastElementChild.style.animationDelay = (animationCounter * animationBubbleDelay) + "ms";
  animationCounter++;
  chatList.lastElementChild.style.animationPlayState = "running";
}

function commandReset(e) {
  animationCounter = 1;
  previousInput = Object.keys(possibleInput)[e];
}

// hlep

var possibleInput = {
  // "hlep" : this.help(),
  "help": function () {
    responseText("You can type a command in the chatbox")
    responseText("Something like &quot;DSA&quot;")
    commandReset(0);
    return
  },
  "best work": function () {
    responseText("I will show you Mees' best work!");
    responseText("These are his <a href='#animation'>best animations</a>")
    responseText("These are his <a href='#projects'>best projects</a>")
    commandReset(1);
    return
  },
  "about": function () {
    responseText("Placeprep is a Educational platform where anybody can learn about coding related topics and languages.");
    responseText("Placeprep allows you to give mcq test, apart from that it has two logins one for user login and another for admin with email validation.");
    responseText("Would you like to see how I was built? (Yes/No)");

    commandReset(2);
    return
  },
  "experience": function () {
    responseText("Mees has previously worked at:");
    responseText("Cobra Systems as web- developer / designer");
    responseText("BIT Students as web- developer / designer");
    responseText("MediaMonks as a junior Front-end Developer");
    commandReset(3);
    return
  },
  "hobbies": function () {
    responseText("Mees loves:");
    responseText("Coding complicated chatbots");
    responseText("Family time");
    responseText("Going out with friends");
    responseText("Working out");
    commandReset(4);
    return
  },
  "interests": function () {
    responseText("Mees loves:");
    responseText("Coding complicated chatbots");
    responseText("Family time");
    responseText("Going out with friends");
    responseText("Working out");
    commandReset(5);
    return
  },
  "vision": function () {
    responseText("Things I want to learn or do:");
    responseText("Get great at CSS & JS animation");
    responseText("Create 3D browser experiences");
    responseText("Learn Three.js and WebGL");
    responseText("Combine Motion Design with Front-End");
    commandReset(6);
    return
  },
  "contact": function () {
    responseText("email: <a href='mailto:meesrutten@gmail.com?Subject=Hello%20Mees' target='_top'>send me a message</a>");
    responseText("Twitter: <a href='https://twitter.com/meesrttn'>@MeesRttn</a>");
    commandReset(7);
    return
  },
  "commands": function () {
    responseText("This is a list of commands Suru knows:")
    responseText("about,Coding Languages,Logical Reasoning, Verbal Ability, DBMS, DSA , OOPS, OSA,help");
    commandReset(8);
    return
  },
  "rick roll": function () {
    window.location.href = "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
  },
  // work experience
}

var reactionInput = {
  "best work": function () {
    //Redirects you to a different page after 3 secs
    responseText("On this GitHub page you'll find everything about Navvy");
    responseText("<a href='https://github.com/meesrutten/chatbot'>Navvy on GitHub</a>")
    animationCounter = 1;
    return
  },
  "about": function () {
    responseText("On this GitHub page you'll find everything about Placeprep!");
    responseText("<a href='https://github.com/s17200/PlacePrep.com'>Placeprep on GitHub</a>")
    animationCounter = 1;
    return
  }
}
async function getMcqs() {
  try {
    const res = await fetch(`https://placeprepbackend.onrender.com/mcq`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    let json = await res.json();
    console.log(json, 'mcq');
    return json;
  } catch (error) {
    console.log("error", error);
  }
}