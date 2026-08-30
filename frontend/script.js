function login(){


    let username = document.getElementById("username").value;

    let password = document.getElementById("password").value;



    fetch("http://localhost:5000/login",{


        method:"POST",


        headers:{


            "Content-Type":"application/json"


        },


        body:JSON.stringify({


            username:username,

            password:password


        })


    })


    .then(res=>res.json())


    .then(data=>{


        document.getElementById("message").innerHTML=data.message;



        if(data.success){


            document.getElementById("message").style.color="green";


        }

        else{


            document.getElementById("message").style.color="red";


        }


    })


    .catch(error=>{


        console.log(error);


    });


}





// Show / Hide Password


let eye = document.getElementById("eye");

let password = document.getElementById("password");



eye.onclick=function(){



    if(password.type==="password"){


        password.type="text";


        eye.classList.remove("fa-eye");


        eye.classList.add("fa-eye-slash");


    }


    else{


        password.type="password";


        eye.classList.remove("fa-eye-slash");


        eye.classList.add("fa-eye");


    }


}