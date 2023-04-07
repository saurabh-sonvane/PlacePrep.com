 document.getElementById("btn").addEventListener("click",fun);

function fun(){
    event.preventDefault()
    var name=document.getElementById("na").value;
    var mail=document.getElementById("email").value;
    var Number=document.getElementById("mobile").value;
    var college=document.getElementById("college").value;
    var city=document.getElementById("city").value;
    var github=document.getElementById("gi").value;
    var geeks=document.getElementById("gfg").value;
    var chef=document.getElementById("codechef").value;
    var hacker=document.getElementById("hacker").value;
    
    
    if(name!="" && mail!="" && Number!="" && college!="" && city!="" && github!="" && geeks!="" && chef!="" && hacker!=""){
        document.getElementById("name").innerText=name;
        document.getElementById("coll").innerText=college;
        document.getElementById("cit").innerText=city;
        document.getElementById("github").href=github;
        document.getElementById("geeksforgeeks").href=geeks
        document.getElementById("codef").href=chef
        document.getElementById("HackerRank").href=hacker
        document.getElementById("Gmail").innerText=mail

        document.getElementById("na").value="";
        document.getElementById("email").value="";
        document.getElementById("mobile").value="";
        document.getElementById("college").value="";
        document.getElementById("city").value="";
        document.getElementById("gi").value="";
        document.getElementById("gfg").value="";
        document.getElementById("codechef").value="";
        document.getElementById("hacker").value="";

    }else{
        alert("Please Enter All Details!")
    }
}