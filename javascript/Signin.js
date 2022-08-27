$(document).ready(function(){

  $("#login-button").click(function(e){
      e.preventDefault();
      
      let email = $("#email").val();
      let password = $("#password").val();
   

      $(".error").remove();

      if(email.length<1){
          $("#email").after('<span class="error">This field is required</span>');
          return
      }
      let regEx = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;;
          let validEmail = regEx.test(email);
          if(!validEmail){
              $("#email").after('<span class="error">Enter a valid email</span>')
          }

      if(password.length<1){
          $("#password").after('<span class="error">This field is required</span>');
          return
      }
      if(password.length<8){
          $("#password").after('<span class="error">Password must contain 8 characters</span>');
      }
      else{
           valid = true
      }
 
let result = {email,password};
console.log(result);

if(valid){
          debugger
          window.location.href="../Html/home.html";
      }
      });
});