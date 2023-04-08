document.querySelector("form").addEventListener("submit", fun);
var nameField = document.getElementById("na");
var mail = document.getElementById("email");
var Number = document.getElementById("mobile");
var college = document.getElementById("college");
var city = document.getElementById("city");
var github = document.getElementById("gi");
var geeks = document.getElementById("gfg");
var chef = document.getElementById("codechef");
var hacker = document.getElementById("hacker");
var score = document.getElementById("score");
window.onload = function () {
    loadUser();
};

function loadUser() {
    let user = JSON.parse(localStorage.getItem('user'))
    nameField.value = user?.name || "";
    mail.value = user?.email || "";
    Number.value = user?.mobile || "";
    score.textContent = user?.totalScore;
    college.value = user?.college || "";
    city.value = user?.city || "";
    github.value = user?.github || "";
    geeks.value = user?.gfg || "";
    chef.value = user?.codeChef || "";
    hacker.value = user?.hackerRank || "";
    document.getElementById("name").innerText = user?.name || "";
    document.getElementById("coll").innerText = user?.college || "";
    document.getElementById("cit").innerText = user?.city || "";
    document.getElementById("github").href = user?.github || "";
    document.getElementById("geeksforgeeks").href = user?.gfg || "";
    document.getElementById("codef").href = user?.codeChef || "";
    document.getElementById("HackerRank").href = user?.hackerRank || "";
    document.getElementById("Gmail").innerText = user?.email;
}



function fun(event) {
    event.preventDefault()
    nameFieldValue = nameField.value;
    mailValue = mail.value;
    NumberValue = Number.value;
    collegeValue = college.value;
    cityValue = city.value;
    githubValue = github.value;
    geeksValue = geeks.value;
    chefValue = chef.value;
    hackerValue = hacker.value;



    console.log(nameFieldValue, mailValue, NumberValue, collegeValue, cityValue, githubValue, geeksValue, chefValue, hackerValue);
    let id = JSON.parse(localStorage.getItem('user')).id;
    console.log("id: ", id);
    let body = JSON.stringify({
        name: nameFieldValue,
        college: collegeValue,
        email: mailValue,
        mobile: NumberValue,
        city: cityValue,
        github: githubValue,
        hackerRank: hackerValue,
        codeChef: chefValue,
        gfg: geeksValue
    })
    updateUser({ body: body, id: id });
    // document.getElementById("na").value = "";
    // document.getElementById("email").value = "";
    // document.getElementById("mobile").value = "";
    // document.getElementById("college").value = "";
    // document.getElementById("city").value = "";
    // document.getElementById("gi").value = "";
    // document.getElementById("gfg").value = "";
    // document.getElementById("codechef").value = "";
    // document.getElementById("hacker").value = "";
}
async function updateUser({ body, id }) {
    console.log(body);
    try {
        const res = await fetch(`http://localhost:3000/users/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: body,
        });
        console.log("updateUser res", res);
        getUser(id);
    } catch (error) {
        console.log("error", error);
    }
}
async function getUser(id) {
    try {
        const res = await fetch(`http://localhost:3000/users/${id}`, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        let json = await res.json();
        console.log("getUser json", json);
        if (json) {
            localStorage.setItem("user", JSON.stringify(json));
            loadUser();
        }

    } catch (error) {
        console.log("error", error);
    }
}
async function getScores() {
    let user = JSON.parse(localStorage.getItem('user'));
    try {
        const res = await fetch(`http://localhost:3000/users`, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        let json = await res.json();
        return json;

    } catch (error) {
        console.log("error", error);
    }
}