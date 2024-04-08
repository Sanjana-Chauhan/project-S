//check for valid sign up inputs
function validateLoginForm(){
    let usermail=document.querySelector("#userEmail").value;
    let userPassword=document.querySelector("#userPassword").value;


    if(usermail=="" || userPassword==""){
        alert("All fields are mandatory");
        return false;
    }
    let userobj=JSON.parse(localStorage.getItem(usermail));

    let storemail=userobj.mail;
    let storePass=userobj.password;
    
     if(usermail==storemail && userPassword==storePass){
       return true;      
    }
    else{
        alert("Invalid login credentials");
        document.querySelector("#userEmail").value=""
        document.querySelector("#userPassword").value="";
        return false;
    }
    
}

function validateSignupForm(){
    let username=document.querySelector("#userName").value;
    let usermail=document.querySelector("#userEmail").value;
    let userPassword=document.querySelector("#userPassword").value;

    if(username=="" || usermail=="" || userPassword==""){
        alert("All fields are mandatory");
        return false;
    }
    else if(username.length<3){
        alert("Username length is too short");
        document.querySelector("#userName").value="";
        return false;   
    }
    else if(userPassword.length<5){
        alert("Minimum 5 digit password is rquired");
        document.querySelector("#userPassword").value="";
        return false;   
    }
    else{
        let myobj={
            name:username,
            mail:usermail,
            password:userPassword,
        };
        dataset=JSON.stringify(myobj);
        localStorage.setItem(usermail,dataset);

        document.querySelector("#userName").value="";
        document.querySelector("#userEmail").value="";
        document.querySelector("#userPassword").value="";
        return true;
    }

}