console.clear();

const loginBtn = document.getElementById('login');
const signupBtn = document.getElementById('signup');
const loginSubmitBtn = document.getElementById('login-btn');
const signupSubmitBtn = document.getElementById('signup-btn');

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
    let name = document.getElementById('user-name').value;
    let email = document.getElementById('user-email').value;
    let password = document.getElementById('user-password').value;
    console.log(name, email, password);
    addUser({ body: JSON.stringify({ name: name, email: email, password: password }) })
})
loginSubmitBtn.addEventListener('click', (e) => {
    let email = document.getElementById('login-email').value;
    let password = document.getElementById('login-password').value;
    console.log(email, password);
    getUser({ email, password })
})
//todo setup properly
async function addUser({ body }) {
    console.log(body);
    try {
        const res = await fetch("http://localhost:3000/users", {
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
//todo setup properly
async function getUser({ email, password }) {
    console.log(body);
    try {
        const res = await fetch("http://localhost:3000/users");
        console.log("res", res);
    } catch (error) {
        console.log("error", error);
    }
}