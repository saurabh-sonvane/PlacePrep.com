// let exportBtn = document.getElementById('btnExport');
// exportBtn.onclick = exportToExcel;
// function exportToExcel() {
//     var wb = XLSX.utils.table_to_book(document.getElementById('rankTable'), { sheet: "Sheet JS" });
//     return XLSX.writeFile(wb, 'rankings.xlsx');
// }


window.onload = async function () {
    let body = document.querySelector('tbody');
    let users = await getScores();
    users.sort((a, b) => (b.totalScore - a.totalScore))
    users.forEach((element, index) => {
        console.log(element.name + ': ' + element.email + ': ' + element.totalScore)
        let tr = document.createElement('tr');
        tr.innerHTML = `
        <th scope="row">${index + 1}</th>
        <td>${element.name}</td>
        <td>${element.email}</td>
        <td>${element.totalScore}</td>
        <td><a href=${element.github} target="_blank">Github</a</td>
        <td><a href=${element.gfg} target="_blank">geeksforgeeks</a</td>
        <td><a href=${element.codeChef} target="_blank">CodeChef</a</td>
        <td><a href=${element.hackerRank} target="_blank">HackerRank</a</td>
        <td>${element.email}</td>
        <td>${element.mobile}</td>
        <td>${element.city}</td>`
        body.appendChild(tr);
    });
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
async function getScores() {
    let user = JSON.parse(localStorage.getItem('user'));
    try {
        const res = await fetch(`https://placeprepbackend.onrender.com/users`, {
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