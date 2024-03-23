 
 //To store user details in local storage
 function signup(){
    let userName=document.querySelector("#userName").value;
    let userMail=document.querySelector("#signup-userEmail").value;
    let userPass=document.querySelector("#signup-userPassword").value;

    if(userName=='' || userMail=='' || userPass==''){
        alert("All fields are mandatory");
        return;
    }
    else{
        localStorage.setItem("Username",userName);
        localStorage.setItem("Usermail",userMail);
        localStorage.setItem("Userpass",userPass);
        alert("Successfully signed up \n Go to login");

       document.querySelector("#userName").value="";
        document.querySelector("#signup-userEmail").value="";
        document.querySelector("#signup-userPassword").value="";
    
    }

   

 }
function login(){
    let usermail=document.querySelector("#userEmail").value;
    let Password=document.querySelector("#userPassword").value;

    let storeMail=localStorage.getItem('Usermail');
    let storePass=localStorage.getItem('Userpass');

    if(usermail==storeMail && Password==storePass){
        console.log("value matched");
        location.replace("Homepage.html");
    }
    else if(usermail=="" || Password==""){
        alert("All fields are mandatory");       
    }
    else{
        alert("Invalid login credentials");
    }
    document.querySelector("#userEmail").value="";
    document.querySelector("#userPassword").value="";
}