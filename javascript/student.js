let students = [];
$(document).ready(function(){

    let searchParams = new URLSearchParams(window.location.search);
    let param = searchParams.get("id");
    if(param!=null){
    getUpdate(param);
    };
  
       $("#createStudent").click(function(e){
           e.preventDefault();
   
           let firstname = $("#firstName").val();
           let lastname = $("#lastName").val();
           let fathername = $("#fatherName").val();
           let mothername = $("#motherName").val();
           let gaurdian = $("#gaurdian").val();
           let phonenumber = $("#phoneNumber").val();
           let email = $("#email").val();
           let studentclass = $("#studentClass").val();
           let studentcity = $("#studentCity").val();
           let address = $("#address").val();
           let dob =$("#dob").val();
           let gender =  $('input[name="gender"]:checked').val();
           let checkbox = $("#news").is(":checked");
           let board8th = $("#8th-stateboard").val();
           let percentage8th = $("#8th-Percentage").val();
           let yearofpass8th = $("#8th-yearofPass").val();
           let board10th = $("#10th-stateboard").val();
           let percentage10th = $("#10th-Percentage").val();
           let yearofpass10th = $("#10th-yearofPass").val();
           let id = $("#new_update").val();

   
           let regEx = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
           let validEmail = regEx.test(email);
   
           $(".error").remove();
           let flag = false;
           
           if(firstname.length<1){
               $("#firstName").after('<span class="error">This field is required</span>');
               flag = false;   
           } else{
               flag = true;
           }
   
           if(lastname.length<1){
               $("#lastName").after('<span class="error">This field is required</span>');
               flag = false;    
           } else{
               flag = true;
           }
   
           if(fathername.length<1){
               $("#fatherName").after('<span class="error">This field is required</span>');
               flag = false;  
           } else{
               flag = true;
           }
   
           if(mothername.length<1){
               $("#motherName").after('<span class="error">This field is required</span>');
               flag = false;   
           } else{
               flag = true;
           }
   
           if(gaurdian.length<1){
               $("#gaurdian").after('<span class="error">This field is required</span>');
               flag = false;  
           } else{
               flag = true;
           }
   
           if(phonenumber.length<1){
               $("#phoneNumber").after('<span class="error">This field is required</span>');
               flag = false;
           } else if(phoneNumber.length<8){
               $("#phoneNumber").after('<span class="error">Password must contain 8 characters</span>');
               flag = false;
           } else{
           flag = true;
           }
           if(email.length<1){
               $("#email").after('<span class="error">This field is required</span>');
               flag = false;
           } else if(!validEmail){
               $("#email").after('<span class="error">Enter a valid email</span>')
               flag = false;
           } else{
               flag = true;
           }
   
           if(studentclass==""){
               $("#studentClass").after('<span class="error"> Please select your class</span>' );
               flag = false; 
           } else{
               flag = true;
           }
   
           if(studentcity==""){
               $("#studentCity").after('<span class="error"> Please select your class</span>' );
               flag = false; 
           } else{
               flag = true;
           }
   
           if(address.length<1){
               $("#address").after('<span class="error">This field is required</span>');
               flag = false;
           } else{
               flag = true;
           }
   
           if(dob.length<1){
               $("#dob").after('<span class="error">This field is required</span>');
               flag = false;
           } else{
               flag = true;
           }
   
           if($(".gender:checked").length > 1 || $(".gender:checked").length == 0){
               $(".errormessage").after('<span class="error">Please select your gender</span>');
               flag = false;
           } else{
               flag = true;
           }
   
           if(!checkbox){
               $("#error-message").after('<span class="error">checkbox not selected</span>');
               flag = false;
           } else{
               flag = true;
           }
           
           listofStudents = {
            firstname:firstname,
            lastname:lastname,
            fathername:fathername,
            mothername:mothername,
            dob:dob,
            phonenumber:phonenumber,
            gender:gender,
            studentclass:studentclass,
            gaurdian:gaurdian,
            email:email,
            studentcity:studentcity,
            address:address,
            board8th:board8th,
            percentage8th:percentage8th,
            yearofpass8th:yearofpass8th,
            board10th:board10th,
            percentage10th:percentage10th,
            yearofpass10th:yearofpass10th,
            id:id
           }
            console.log(listofStudents);
            if(id!=""){
            update(listofStudents);
           }else{
            $.ajax({
                url:"https://62ff3a1734344b6431f4dbde.mockapi.io/student",
                method:"post",
                data:listofStudents,
                dataType:"json",
                success: function(result){
                    students.push(result);
                    onloadApi(students);
                    window.location.href = "/HTML/students_list.html";
                },
                error: function(error){
                    console.log(error);
                },
            });
         };
       });  
       onloadApi(students);
   });

   function onloadApi(students){
    $.ajax({
        url:"https://62ff3a1734344b6431f4dbde.mockapi.io/student",
        method:"get",
        dataType:"json",
        success: function(result){
            students = result;
            updateTable(result);
        },
        error: function(result){
            console.log(error);
        },
    });
   };

   function updateTable(students){
    $("#tbody").html("");
    for(let i=0; i<students.length; i++){
        let date = students[i].dob;
    var dateAr = date.split("-");
    var date_string = dateAr[2] + "-" + dateAr[1] + "-" + dateAr[0];
        row =
        "<tr><td>" +
        students[i].id +
        "</td><td>" +
        students[i].firstname +
        "</td><td>" +
        students[i].fathername +
        "</td><td>" +
        date_string +
        "</td><td>" +
        students[i].phonenumber +
        "</td><td>" +
        students[i].gender +
        "</td><td>" +
        students[i].studentclass +
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
        url:"https://62ff3a1734344b6431f4dbde.mockapi.io/student/"+student_id,
        method:"delete",
        dataType:"json",
        success: function(result){
            students.splice(index,1);
            onloadApi(students);
        },
        error: function(error){
            console.log(error);
        },
    });
   };

   function getUpdate(id){
    $.ajax({
        url:"https://62ff3a1734344b6431f4dbde.mockapi.io/student/"+id,
        method:"get",
        dataType:"json",
        success: function(result){
            $("#firstName").val(result.firstname);
            $("#lastName").val(result.lastname);
            $("#fatherName").val(result.fathername);
            $("#motherName").val(result.mothername);
            $("#gaurdian").val(result.gaurdian);
            $("#phoneNumber").val(result.phonenumber);
            $("#email").val(result.email);
            $("#studentClass").val(result.studentclass);
            $("#studentCity").val(result.studentcity);
            $("#address").val(result.address);
            $("#dob").val(result.dob);
            $("#news").is(":checked");
            $("#8th-stateboard").val(result.board8th);
            $("#8th-Percentage").val(result.percentage8th);
            $("#8th-yearofPass").val(result.yearofpass8th);
            $("#10th-stateboard").val(result.board10th);
            $("#10th-Percentage").val(result.percentage10th);
            $("#10th-yearofPass").val(result.yearofpass10th);
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
    window.location.href= "/HTML/create_students.html?id="+id;
   };

   function update(listofStudents){
    $.ajax({
        url:"https://62ff3a1734344b6431f4dbde.mockapi.io/student/"+listofStudents.id,
        method:"put",
        data:listofStudents,
        dataType:"json",
        success: function(result){
            students.push(result);
            onloadApi(students);
            window.location.href = "/HTML/students_list.html";
        },
        error: function(error){
            console.log(error);
        },
    });
   };
   