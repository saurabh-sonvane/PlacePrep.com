console.clear();

const loginBtn = document.getElementById('login');
const signupBtn = document.getElementById('signup');
const loginSubmitBtn = document.getElementById('login-btn');
const signupSubmitBtn = document.getElementById('signup-btn');
const optBtn = document.getElementById('otp-continue');
const optCloseBtn = document.getElementById('otp-close-btn');
const forgotPasswordBtn = document.getElementById('forgotPass');

window.onload = () => {
    emailjs.init("a0ZPOjoa8Y8snS_y8");
}
forgotPasswordBtn.addEventListener('click', async () => {
    let email = document.getElementById('login-email').value;
    let user = await getUserWithEmail({ email: email });
    console.log(user);
    if (user) {
        emailjs.send("service_co7vkub", "template_z7vnowc", { from_name: 'PlacePrep', to_name: user.name, to_email: email, the_pass: user.password, })
            .then(function (response) {
                console.log('SUCCESS!', response.status, response.text);
                alert('Your Password has been sent to your registered email')
            }, function (error) {
                alert('An error has occurred while sending your password')
                console.log('FAILED...', error);
            });
    } else {
        alert('Email not found! Please try again')
    }
})
loginBtn.addEventListener('click', (e) => {
    let parent = e.target.parentNode.parentNode;
    Array.from(e.target.parentNode.parentNode.classList).find((element) => {
        if (element !== "slide-up") {
            parent.classList.add('slide-up')
        } else {
            signupBtn.parentNode.classList.add('slide-up')
            parent.classList.remove('slide-up')
        }
    });
});

signupBtn.addEventListener('click', (e) => {
    let parent = e.target.parentNode;
    Array.from(e.target.parentNode.classList).find((element) => {
        if (element !== "slide-up") {
            parent.classList.add('slide-up')
        } else {
            loginBtn.parentNode.parentNode.classList.add('slide-up')
            parent.classList.remove('slide-up')
        }
    });
});

signupSubmitBtn.addEventListener('click', (e) => {
    e.preventDefault();
    let name = document.getElementById('user-name').value;
    let email = document.getElementById('user-email').value;
    let otpToSend = Math.floor(1000 + Math.random() * 9000);
    localStorage.setItem('otp', otpToSend);
    emailjs.send("service_co7vkub", "template_o8haspq", { from_name: 'PlacePrep', to_name: name, to_email: email, the_otp: otpToSend, reply_to: email })
        .then(function (response) {
            console.log('SUCCESS!', response.status, response.text);
        }, function (error) {
            console.log('FAILED...', error);
        });
    $('#otpModal').modal({ show: true, backdrop: 'static' })
})
loginSubmitBtn.addEventListener('click', (e) => {
    e.preventDefault();
    let email = document.getElementById('login-email').value;
    let password = document.getElementById('login-password').value;
    console.log(email, password);
    getUser({ email, password })
})
optBtn.addEventListener('click', (e) => {
    e.preventDefault();
    let name = document.getElementById('user-name').value;
    let email = document.getElementById('user-email').value;
    let password = document.getElementById('user-password').value;
    console.log(name, email, password);
    let otpInput = document.getElementById('otp-input').value;
    let otp = localStorage.getItem('otp');
    console.log(otp, otpInput, otp == otpInput);
    if (otp == otpInput) {
        verifyOtp(name, email, password)
    }
})

function verifyOtp(name, email, password) {

    addUser({ body: JSON.stringify({ name: name, email: email, password: password, totalScore: 0, quizScores: {} }) })
    optCloseBtn.click();
    loginBtn.click();
}

async function addUser({ body }) {
    console.log(body);
    try {
        const res = await fetch(`https://placeprepbackend.onrender.com/users`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: body,
        });
        console.log("res", res);
    } catch (error) {
        console.log("error", error);
    }
}
async function getUser({ email, password }) {
    try {
        const res = await fetch(`https://placeprepbackend.onrender.com/users?email=${email}&password=${password}`, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        let json = await res.json();
        console.log(json, 'sss');
        if (json.length > 0) {
            localStorage.setItem("user", JSON.stringify(json[0]));
            location.href = '../HomePage/index.html'
        }

    } catch (error) {
        console.log("error", error);
    }
}
async function getUserWithEmail({ email }) {
    try {
        const res = await fetch(`https://placeprepbackend.onrender.com/users?email=${email}`, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        let json = await res.json();
        console.log(json, 'sss');
        if (json.length > 0) {
            return json[0];
        }

    } catch (error) {
        console.log("error", error);
    }
}