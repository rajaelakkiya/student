let teachers=[]
$(document).ready(function () {
  let searchParams = new URLSearchParams(window.location.search)
  let param = searchParams.get('id');
  if(param!=null){
    getEdit(param);
  }
  $("#submit").click(function (e) {
    e.preventDefault();
    let name = $("#firstName").val();
    let lastname = $("#lastName").val();
    let gender = $("input[name='gender']:checked").val();
    let phonenumber = $("#phoneNumber").val();
    let email = $("#emailId").val();
    let bloodgroup = $("#bloodGroup").val();
    let age = $("#age").val();
    let experience = $("#experiance").val();
    let qualification = $("#qualification").val();
    let state = $("#state").val();
    let country = $("#country").val();
    let language = $(".language").is(":checked");
    let address = $("#address").val();
    let pincode = $("#pincode").val();
    let joningdate = $("#joiningDate").val();
    let id= $("#newid").val();

    let check = $("#check:checked");
    let flag = false;
    let regEx =
      /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    let validEmail = regEx.test(email);
    $(".error").remove();
    if (language) {
      var languages = [];
      $(".language:checked").each(function (i) {
        language[i] = $(this).val();
      });
    }
    if (name.length < 1) {
      $("#firstName").after(
        '<span class="error">This field is required</span>'
      );
      flag = false;
    } else {
      flag = true;
    }
    if (lastname.length < 1) {
      $("#lastName").after('<span class="error">This field is required</span>');
      flag = false;
    } else {
      flag = true;
    }
    if (phonenumber.length < 1) {
      $("#phoneNumber").after(
        '<span class="error">This field is required</span>'
      );
      flag = false;
    } else if (phonenumber.length < 10) {
      $("#phoneNumber").after(
        '<span class="error">Phone number must be 10 digit</span>'
      );
      flag = false;
    } else {
      flag = true;
    }
    if (email.length < 1) {
      $("#emailId").after('<span class="error">This field is required</span>');
      flag = false;
    } else if (!validEmail) {
      $("#emailId").after(
        '<span class="error">Enter a valid email address</span>'
      );
      flag = false;
    } else {
      flag = true;
    }
    if (bloodgroup == "select") {
      $("#bloodGroup").after(
        '<span class="error">This field is required</span>'
      );
      flag = false;
    } else {
      flag = true;
    }
    if (age.length < 1) {
      $("#age").after('<span class="error">This field is required</span>');
      flag = false;
    } else if (age < 21) {
      $("#age").after('<span class="error">age should be above 21</span>');
      flag = false;
    } else {
      flag = true;
    }
    if (experience == "") {
      $("#experiance").after(
        '<span class="error">This field is required</span>'
      );
      flag = false;
    } else {
      flag = true;
    }
    if (qualification.length < 1) {
      $("#qualification").after(
        '<span class="error">This field is required</span>'
      );
      flag = false;
    } else {
      flag = true;
    }

    if (!gender) {
      $("#genderErrorId").after(
        '<span class="error">This field is required</span>'
      );
      flag = false;
    } else {
      flag = true;
    }
    if (state.length < 1) {
      $("#state").after('<span class="error">This field is required</span>');
      flag;
    } else {
      flag = true;
    }
    if (country.length < 1) {
      $("#country").after('<span class="error">This field is required</span>');
      flag = false;
    } else {
      flag = true;
    }
 if (language == " ") {
      $("#language").after('<span class="error">This field is required</span>');
      flag = false;
    } else {
      flag = true;
    }
    if (address.length < 1) {
      $("#address").after('<span class="error">This field is required</span>');
      flag = false;
    } else {
      flag = true;
    }
    if (pincode < 1) {
      $("#pincode").after('<span class="error">This field is required</span>');
      flag = false;
    } else if (pincode < 6) {
      $("#pincode").after(
        '<span class="error">Pincode  must be 6 digit</span>'
      );
      flag = false;
    } else {
      flag = true;
    }
    if (joningdate.length < 1) {
      $("#joiningDate").after(
        '<span class="error">This field is required</span>'
      );
      flag = false;
    } else {
      flag = true;
    }
    if (check.length == 0) {
      $("#tick").after('<div class="error">This field is required</div>');
      flag = false;
    } else {
      flag = true;
    }
    let Address = { address, state, country, pincode }; 
    
    let teacherlist = {
      'id':id,
      'name': name,
      'lastname': lastname,
      'gender': gender,
      'phonenumber': phonenumber,
     'email': email,
      'age': age,
      'address': Address,
      'experience': experience,
      'qualification': qualification,
      'language': languages,
      'joningdate': joningdate,
      'bloodgroup': bloodgroup,
    };
    
 if(id!=""){
update(teacherlist);

}else{
 
 $.ajax({
      url: "https://62ff38cb34344b6431f4c29e.mockapi.io/teacher",
      method: "post",
      data: teacherlist,
      dataType: "json",
    
      success: function (result) {
        workers.push(result);
        onloadfromAPI(teachers);
        window.location.href="/HTML/teacher_list.html"

      },
    
      error: function (error) {
        console.log(error);
      },
     
    }); 
  }

  });
  

  onloadfromAPI(teachers)
});
  function updatetable(teachers) {
    $("#tbody").html("");

    for (let i = 0; i < teachers.length; i++) {
      let date=teachers[i].joningdate;
      var dateAr = date.split('-');
   var date_string = dateAr[2] + '-' + dateAr[1] + '-' + dateAr[0];
        let row="<tr><td>"+teachers[i].id+"</td><td>"+teachers[i].name+"</td><td>"+teachers[i].phonenumber+"</td><td>"+teachers[i].email+
        "</td><td>"+teachers[i].qualification+"</td><td>"+date_string+
        "</td><td><button type='button' class='  text-white btn btn-warning' onclick='getEditWin(" +
        i +
        "," +
        teachers[i].id +
        ")'>Edit</button></td><td><button type='button' class='btn btn-danger' onclick='deleteRow(" +
        i +
        "," +
        teachers[i].id +
        ")'>Delete</button></tr>";
    
         $("#tbody").append(row)
    }
  
  }
 
  

function onloadfromAPI() {
  $.ajax({
    url: "https://62ff38cb34344b6431f4c29e.mockapi.io/teacher",
    method: "get",
    dataType: "json",
    success: function (result) {
      updatetable(result);
    },
    error: function (error) {
      console.log(error);
    },
  });
  }


  function deleteRow(index,teacher_id){
    $.ajax({
      url:"https://62ff38cb34344b6431f4c29e.mockapi.io/teacher/" +teacher_id,
      method:"delete",
      dataType:"json",
      success:function(result){
        teachers.splice(index,1);
        onloadfromAPI(teachers);
      },
    error: function (error) {
      console.log(error);
    },
    })
  
    }
    function getEdit(id){

      $.ajax({
        url:"https://62ff38cb34344b6431f4c29e.mockapi.io/teacher/"+id,
        method:"get",
        dataType:"json",
        success: function (result) {
      $("#newid").val(result.id);
             $("#firstName").val(result.name);
               $("#lastName").val(result.lastname);
                $("input[name='gender']:checked").val(result.gender);
             $("#phoneNumber").val(result.phonenumber);
               $("#emailId").val(result.email);
              $("#bloodGroup").val(result.bloodgroup);
              $("#age").val(result.age);
              $("#experiance").val(result.experience);
               $("#qualification").val(result.qualification);
               $("#state").val(result.state);
               $("#country").val(result.country);
             $(".language").val(result.language).is(":checked");
             $("#address").val(result.address);
              $("#pincode").val(result.pincode);
              $("#joiningDate").val(result.joningdate);

         alert(result.id);
        },
        error: function (error) {
          console.log(error);
        },


      })
    }

    function getEditWin(index,id){
      window.open( "create_teacher.html?id="+id);
    }
    function update(teacherlist){
      $.ajax({
        url: "https://62ff38cb34344b6431f4c29e.mockapi.io/teacher/" + teacherlist.id, 
        method: "put",
        data: teacherlist,
        dataType: "json",
        success: function (result) {
          teachers.push(result);

          onloadfromAPI(teachers);
          window.location.href="\Html\AddTeacher.html"

        },
        error: function (error) {
          console.log(error);
        },
      });
    }