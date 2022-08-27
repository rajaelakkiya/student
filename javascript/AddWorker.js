let workers = [];
$(document).ready(function () {
  let searchParams = new URLSearchParams(window.location.search);
  let param = searchParams.get("id");
  if (param != null) {
    getUpdate(param);
  }
    $("#Submit").click(function (e) {
      e.preventDefault();

      let fname = $("#fname").val();
      let lname = $("#lname").val();
      let mobile = $("#mobile").val();
      let email = $("#email").val();
      let standard = $("#standard").val();
      let district = $("#district").val();
      let address = $("#address").val();
      let gender = $(".gender").val();
      let dob = $("#dob").val();
      let jdb = $("#jdb").val();
      let age = $("#age").val();
      let city = $("#city").val();
      let state = $("#state").val();
      let country = $("#country").val();
      let selectposition = $("#selectposition").val();
      let selectblood = $("#selectblood").val();
      let id = $("#newid").val();
      $(".error").remove()
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

      if ($(".gender:checked").length > 1 || $(".gender:checked").length == 0) {
        $(".errormessage").after('<span class="error">Please select your gender</span>');
        flag = false;
      } else {
        flag = true;
      }



      if (city == "") {
        $("#city ").after("<span class='error'>Select Your City!");
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
      if (standard == "") {
        $("#standard").after("<span class='error'>Select Your Standard!");
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

      if (selectposition == "") {
        $("#selectposition").after("<span class='error'> invalid!</span>");
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

      {
      
        if (email.length < 1) {
          let regEx = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;;
          let validEmail = regEx.test(email);
          if (!validEmail) {
            $("#email").after('<span class="error">Enter a valid email!</span>');
            flag = false;
          }
        }
        else {
          flag = true;
        }
        if (dob == "") {
          $("#dob").after("<span class='error'>Enter your dob!");
          flag: false;

        }
        else {
          flag = true;
        }
        if (jdb == "") {
          $("#jdb").after("<span class='error'>Enter your Jdb!");
          flag: false;

        }


        workerlist = {
          fname: fname,
          lname: lname,
          address: address,
          dob: dob,
          age: age,
          jdb: jdb,
          city: city,
          state: state,
          country: country,
          selectposition: selectposition,
          mobile: mobile,
          standard: standard,
          email: email,
          gender: gender,
          selectblood: selectblood,
          id: id

        }
        console.log(workerlist);
         if (id != "") {
          update(workerlist);
         }

        else {

          $.ajax({
            url: "https://62ff505434344b6431f68e0c.mockapi.io/workers",
            method: "post",
            data: workerlist,
            dataType: "json",
            success: function (result) {
              workers.push(result);
              onloadfromAPI(workers);
              window.location.href = "../Html/workers.html";
            },
            error: function (error) {
              console.log(error);
            },


          });
        };
      }
    });
    onloadfromAPI(workers);
  });



function onloadfromAPI(workers) {
  $.ajax({
    url: "https://62ff505434344b6431f68e0c.mockapi.io/workers",
    method: "get",
    dataType: "json",
    success: function (result) {
  
      updateTable(result);
    },
    error: function (error) {
      console.log(error);
    },
  });
};

function updateTable(workers) {
  $("#tbody").html("");
  for (let i = 0; i < workers.length; i++) {
  
    row =
      "<tr><td>" +
      workers[i].id +
      "</td><td>" +
      workers[i].fname +
      "</td><td>" +
      workers[i].dob +
      "</td><td>" +
      workers[i].mobile +
      "</td><td>" +
      workers[i].city +
       "</td><td><button type='button' class='text-white btn btn-warning' onclick='getEditWin(" +
       i +
       "," +
       workers[i].id +
       ")'>Edit</button></td><td><button type='button' class='btn btn-danger' onclick='deleteRow(" +
       i +
       "," +
       workers[i].id +
       ")'>Delete</button></td></tr>";
    $("#tbody").append(row);
    console.log(workers)
  };
};


function deleteRow(index, worker_id) {
  $.ajax({
    url: "https://62ff505434344b6431f68e0c.mockapi.io/workers/" + worker_id,
    method: "delete",
    dataType: "json",
    success: function (result) {
      workers.splice(index, 1);
      onloadfromAPI(workers);
    },
    error: function (error) {
      console.log(error);
    },
  })
}

function getUpdate(id) {
  $.ajax({
    url: "https://62ff505434344b6431f68e0c.mockapi.io/workers/" + id,
    method: "get",
    dataType: "json",
    success: function (result) {

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
      $("#newid").val(result.id);
      if (result.gender == "Male") {
        $("#male").prop("checked", true);
      } else {
        $("#female").prop("checked", true);
      }
      
    },
    error: function (error) {
      console.log(error);
    },
  });
};
function getEditWin( id) {
  window.location.href = "Addworker.html?id=" + id;
}

function update(workerlist) {
  $.ajax({
    url: "https://62ff505434344b6431f68e0c.mockapi.io/workers/" + workerlist.id,
    method: "put",
    data: workerlist,
    dataType: "json",
    success: function (result) {
      workers.push(result);
      onloadApi(workers);
      window.location.href = "../Html/worker.html"
    },
    error: function (error) {
      console.log(error);
    },
  });
}
