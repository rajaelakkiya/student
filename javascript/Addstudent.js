let students = [];
$(document).ready(function () {
  let searchParams = new URLSearchParams(window.location.search);
  let param = searchParams.get("id");
  if(param!=null){
  getUpdate(param);
  }
    $("#Submit").click(function (e) {
      e.preventDefault();
  
      let fname = $("#fname").val();
      let lname = $("#lname").val();
      let mobile = $("#mobile").val();
      let email = $("#email").val();
      let standard = $("#standard").val();
       let district= $("#district").val();
      let address = $("#address").val();
      let age = $("#age").val();
      let gender = $("input[name='gender']:checked").val();
      let dob = $("#dob").val();
      let city = $("#city").val();
      let state = $("#state").val();
      let country = $("#country").val();
      let selectlanguage = $("#selectlanguage").val();
      let selectblood = $("#selectblood").val();
      let id = $("#new2").val();
      $(".error").remove();
      let flag = false;
      if (fname == "") {
        $("#fname").after("<span class='error'>Enter Your First Name!</span");
        flag = false;
      }
      else {
        flag = true;
      }
      

      if (lname == "") {
  
        $("#lname").after("<span class='error'> Enter Your Last Name!</span");
        flag = false;
      }
      else {
        flag = true;
      }
  
      if (mobile == "") {
        $("#mobile").after("<span class='error'>Enter Your mobile no!</span");
        flag = false;
      }
      else {
        flag = true;
      }
      if (address == "") {
        $("#address").after("<span class='error'>Enter Your Postal address!</span");
        flag = false;
      }
      else {
        flag = true;
      }
  
      if (!gender) {
        alert(gender)

        $("#gender").html('<span class="error">This field is required</span>');
        flag = false;
      } else {
        flag = true;
      }
      if (selectlanguage == "") {
        $("#selectlanguage").after("<span class='error'> invalid!");
        flag = false;
      }
      else {
        flag = true;
      }
     if (selectblood == "") {
        $("#selectblood").after("<span class='error'> invalid!");
        flag = false;
      }
      else {
        flag = true;
      }
       if(city  == "")
       {
        $("#city ").after("<span class='error'>Select Your City!");
       flag=false;
       }
        else{
          flag=true; 
        }
        if(country == "")
        {
         $("#country").after("<span class='error'>Select Your Country!");
        flag=false;
        }
         else{
           flag=true; 
         }
      if (state == "") {
        $("#state").after("<span class='error'>Select Your state!");
        flag = false;
      }
      else {
        flag = true;
  
      }
        if (district == "") {
        $("#district").after("<span class='error'>Select Your district!");
      flag = false;
       }
      else {
        flag = true;
      }
      if ( standard == "") {
        $("#standard").after("<span class='error'>Select Your Standard!");
      flag = false;
       }
      else {
        flag = true;
      }
      if (age == "") {
  
        $("#age").after("<span class='error'>Enter your age!");
        flag = false;
      }else {
        flag = true;
      }
        // $("#email").after("<span clascs='error'>Enter your correct email ID!");
        alert(email.length )
        if (email.length < 1) {
          let regEx = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;;
          let validemail = regEx.test(email);
          if (!validemail) {
            $("#email").after('<span class="error">Enter a valid email</span>');
            flag = false;
          }
        }
        else {
          flag = true;
        }
        if (dob == "") {
          $("#dob").after("<span class='error'>Enter Your DOB!</span");
          flag = false;
        }
        else {
          flag = true;
        }
        
  listofStudents = {
    fname:fname,
    lname:lname,
   mobile:mobile,
    email:email,
    standard:standard,
    gender:gender,
    age:age,
    address:address,
    dob:dob,
    city:city,
    state:state,
    country:country,
    selectlanguage:selectlanguage,
    selectblood:selectblood,
    id:id
   }
    console.log(listofStudents);
    if(id!=""){
    update(listofStudents);
   }else{
    $.ajax({
        url:"https://62ff505434344b6431f68e0c.mockapi.io/students",
        method:"post",
        data:listofStudents,
        dataType:"json",
        success: function (result){
            students.push(result);
            onloadApi(students);
            window.location.href = "../Html/Student.html";
        },
        error: function(error){
            console.log(error);
        },
      
    });
  }
  });

onloadApi(students);
});

function updatetable(students) {
  $("#tbody").html("");
for(let i=0; i<students.length; i++){
       row="<tr><td>"+students[i].id+"</td><td>"+students[i].fname+"</td><td>"+students[i].dob+"</td><td>"+students[i].mobile+
      "</td><td>"+students[i].city+
      "</td><td><button type='button' class='text-white btn btn-warning' onclick='getEditWin(" +
      i +
      "," +
      students[i].id +
      ")'>Edit</button></td><td><button type='button' class='btn btn-danger' onclick='deleteRow(" +
      i +
      "," +
      students[i].id +
      ")'>Delete</button></td></tr>";
  
       $("#tbody").append(row)
  }

}


function onloadApi(students){
$.ajax({
url:"https://62ff505434344b6431f68e0c.mockapi.io/students",
method:"get",
dataType:"json",
success: function(result){
    students = result;
    updateTable(result);
},
error: function(error){
    console.log(error);
},
});
};

function updateTable(students){
$("#tbody").html("");
for(let i=0; i<students.length; i++){
// let date = students[i].dob;
// var dateAr = date.split("-");
// var date_string = dateAr[2] + "-" + dateAr[1] + "-" + dateAr[0];
row =
"<tr><td>" +
students[i].id +
"</td><td>" +
students[i].fname +
"</td><td>" +
students[i].lname +
"</td><td>" +
students[i].dob +
"</td><td>" +
students[i].mobile +
"</td><td>" +
students[i].gender +
"</td><td>" +
students[i].standard +
"</td><td><button type='button' class='btn btn-secondary btn-sm' onclick='geteditUpdate(" +
i +
"," +
students[i].id +
")'>Edit</button></td><td><button type='button' class='btn btn-danger btn-sm' onclick='deleteRow(" +
i +
"," +
students[i].id +
")'>Delete</button></td></tr>";
$("#tbody").append(row);
};
};


function deleteRow(index,student_id){
$.ajax({
url:"https://62ff505434344b6431f68e0c.mockapi.io/students/"+student_id,
method:"delete",
dataType:"json",
success: function(result){
    students.splice(index,1);
    onloadApi(students);
},
error: function(error){
    console.log(error);
},
})
}

function getUpdate(id){
$.ajax({
url:"https://62ff505434344b6431f68e0c.mockapi.io/students/"+id,
method:"get",
dataType:"json",
success: function(result){

    $("#fname").val(result.fname);
    $("#lname").val(result.lname);
    $("#email").val(result.email);
    $("#district").val(result.district);
    $("#address").val(result.address);
    $("#age").val(age.email);
    $("#dob").val(result.dob);
    $("#city").val(result.city);
    $("#state").val(result.state);
    $("#country").val(result.country);
    $("#selectlanguage").val(result.selectlanguage);
    $("#selectblood").val(result.selectblood);
    $("#new_update").val(result.id); 
    alert(result.gender)
    if(result.gender=="Male"){
      $("#male").prop("checked", true);
    }else{
      $("#female").prop("checked", true);
    }
    alert(result.id);
},
error: function(error){
    console.log(error);
},
});
};
function geteditUpdate(index,id){
window.location.href= "Addstudent.html?id="+id;
}

function update(listofStudents){
$.ajax({
url:"https://62ff505434344b6431f68e0c.mockapi.io/students/"+listofStudents.id,
method:"put",
data:listofStudents,
dataType:"json",
success: function(result){
    students.push(result);
    onloadApi(students);
    window.location.href = "../Html/Student.html"
},
error: function(error){
    console.log(error);
},
});
};
