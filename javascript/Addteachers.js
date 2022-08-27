let teachers = [];
$(document).ready(function () {
  let searchParams = new URLSearchParams(window.location.search)
  let param = searchParams.get('id');
  if (param != null) {
    getUpdate(param);
  }
  $("#Submit").click(function (e) {
    e.preventDefault();

    let fname = $("#fname").val();
    let lname = $("#lname").val();
    let mobile = $("#mobile").val();
    let email = $("#email").val();
    let age = $("#age").val();
    let state = $("#state").val();
    let district = $("#district").val();
    let address = $("#address").val();
    let gender = $("input[name='gender']:checked").val();
    let dob = $("#dob").val();
    let joindate = $("#joindate").val();
    let city = $("#city").val();
    let country = $("#country").val();
    let selectposition = $("#selectposition").val();
    let selectblood = $("#selectblood").val();
    let id = $("#newid").val();
     $(".error").remove();
     let regEx = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;;
     let validEmail = regEx.test(email);
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
      $("#address").after("<span class='error'>Enter Your Postal Address!</span");
      flag = false;
    }
    else {
      flag = true;
    }

    if (!gender) {
      $("#gender").after(
        '<span class="error">This field is required</span>');
      flag = false;
    } else {
      flag = true;
    }
    if (selectposition == "") {
      $("#selectposition").after("<span class='error'> invalid!");
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
    if (city == "") {
      $("#city").after("<span class='error'>Select Your City!");
      flag = false;
    }
    else {
      flag = true;
    }
    if (country == "") {
      $("#country").after("<span class='error'>Select Your Country!");
      flag = false;
    }
    else {
      flag = true;
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


    if (age == "") {

      $("#age").after("<span class='error'>Enter your age!");
      flag = false;
    }
    else {
      flag = true;
    }

   
     
        if (!validEmail) {
          $("#email").after('<span class="error">Enter a valid email</span>');
          flag = false;
        }
      
      if (dob == "") {
        $("#dob").after("<span class='error'>Enter your dob!");
        flag: false;

      }
      else {
        flag = true;
      }
      if (joindate == "") {
        $("#joindate").after("<span class='error'>Enter your Jdb!");
        flag: false;

      }
      else {
        flag = true;
      }

        teacherResults = {
          fname :fname,
          lname :lname,
          mobile : mobile,
          email : email,
          age : age,
          state :state,
          district : district,
          address : address,
          gender :gender,
          dob : dob,
          joindate :joindate,
          city : city,
          country : country,
          selectposition : selectposition,
          selectblood : selectblood,
          id : id

    }
  
    // teacherslist.push(results);
    // console.log(teacherslist);
    // localStorage.setItem("teacherslist", JSON.stringify(workerlist));



if(id !=""){
  update(teacherResults);
  
  }else{
   
   $.ajax({
        url:"https://62ff505434344b6431f68e0c.mockapi.io/teachers",
        method: "post",
        data: teacherResults,
        dataType: "json",
      
        success: function (result) {
          teachers.push(result);
          onloadfromAPI(teachers);
          window.location.href="../Html/teachers.html";
  
        },
      
        error: function (error) {
          console.log(error);
        },
       
      }); 
    };
    });
    onloadfromAPI(teachers);
});
    
  

    function updatetable(teachers) {
      $("#tbody").html("");
  for(let i=0; i<teachers.length; i++){
           row="<tr><td>"+teachers[i].id+"</td><td>"+teachers[i].fname+"</td><td>"+teachers[i].dob+"</td><td>"+teachers[i].mobile+
          "</td><td>"+teachers[i].city+
          "</td><td><button type='button' class='text-white btn btn-warning' onclick='getEditWin(" +
          i +
          "," +
          teachers[i].id +
          ")'>Edit</button></td><td><button type='button' class='btn btn-danger' onclick='deleteRow(" +
          i +
          "," +
          teachers[i].id +
          ")'>Delete</button></td></tr>";
      
           $("#tbody").append(row)
      }
    
    }
   
    
  
  function onloadfromAPI(teachers) {
    $.ajax({
      url: "https://62ff505434344b6431f68e0c.mockapi.io/teachers",
      method: "get",
      dataType: "json",
      success: function (result) {
        teachers = result;
        updatetable(result);
      },
      error: function (error) {
        console.log(error);
      },
    });
    }
    function deleteRow(index,teacher_id){
      $.ajax({
        url:"https://62ff505434344b6431f68e0c.mockapi.io/teachers/" +teacher_id,
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
      
      function   getUpdate(id){
  
        $.ajax({
          url:"https://62ff505434344b6431f68e0c.mockapi.io/teachers/"+id,
          method:"get",
          dataType:"json",
          success: function (result) {
         
         
            $("#fname").val(result.fname);
            $("#lname").val(result.lname);
           $("#mobile").val(result.mobile);
           $("#email").val(result.email);
           $("#age").val(result.age);
             $("#state").val(result.state);
             $("#district").val(result.district);
            $("#address").val(result.address);
            $("input[name='gender']:checked").val(result.gender);
            $("#dob").val(result.dob);
           $("#joindate").val(result.joindate);
          $("#city").val(result.city);
            $("#country").val(result.country);
            $("#selectposition").val(result.selectposition);
            $("#selectblood").val(result.selectblood);
           $("#new_id").val(result.id);
  
           alert(result.id);
          },
          error: function (error) {
            console.log(error);
          },
  
  
        })
      }
  
      function getEditWin(index,id){
        window.location.href= "AddTeacher.html?id="+id;
      }
      function update(teacherResults){
        $.ajax({
          url: "https://62ff505434344b6431f68e0c.mockapi.io/teachers/" + teacherResults.id, 
          method: "put",
          data: teacherResults,
          dataType: "json",
          success: function (result) {
            teachers.push(result);
  
            onloadfromAPI(teachers);
            window.location.href="../Html/teachers.html"
  
          },
          error: function (error) {
            console.log(error);
          },
        });
      }
    