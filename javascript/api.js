const students = [];
function createStudenttoLocalstoarge() {
  const student = {
    firstname: $("#firstname").val(),
    fathername: $("#fathername").val(),
    dob: $("#address").val(),
    address: $("#dob").val(),
  };
  addRowtoTable(student);
  students.push(student);
  window.localStorage.setItem("students", JSON.stringify(students));
}

function createStudenttoapi() {
  const student = {
    firstname: $("#firstname").val(),
    fathername: $("#fathername").val(),
    dob: $("#address").val(),
    address: $("#dob").val(),
  };
  $.ajax({
    url: "https://62ff2dd634344b6431f3f3f7.mockapi.io/student",
    method: "post",
    data: student,
    dataType: "json",
    success: function (result) {
      addRowtoTable(result);
    },
    error: function (error) {
      console.log(error);
    },
  });
}

// function addRowtoTable(student) {
//   const row = document.createElement("tr"); //empty
//   const rowdata =
//     "<td>" +
//     student.firstname +
//     "</td><td>" +
//     student.fathername +
//     "</td><td>" +
//     student.address +
//     "</td><td>" +
//     student.dob+
//     "</td><td><button onclick='deleteRow' type='button'>Delete</td>";//create the tds
//   row.innerHTML = rowdata; //add the tds to row
//   const tablebody = document.getElementById("tbody"); //find the table body
//   tablebody?.appendChild(row); //add as child
// }

function updatetable(students) {
  for (let i = 0; i < students.length; i++) {
    const row = document.createElement("tr"); //empty
    const rowdata =
      "<td>" +
      students[i].firstname +
      "</td><td>" +
      students[i].fathername +
      "</td><td>" +
      students[i].address +
      "</td><td>" +
      students[i].dob +
      "</td><td><button onclick='deleteRow("+i+")' type='button'>Delete</td>"; //create the tds
    row.innerHTML = rowdata; //add the tds to row
    const tablebody = document.getElementById("tbody"); //find the table body
    tablebody?.appendChild(row); //add as child
  }
}
function deleteRow(index){
  console.log("delete row:"+ index);
  students=students.splice(index,1);
  updatetable(students);
}

// function onloadfromlocalstorage() {
//   const students = window.localStorage.getItem("students")
//     ? JSON.parse(window.localStorage.getItem("students"))
//     : [];

//   updatetable(students);
// }

// function onloadfromAPI() {
//   $.ajax({
//     url: "https://62ff2dd634344b6431f3f3f7.mockapi.io/student",
//     method: "get",
//     dataType: "json",
//     success: function (result) {
//       updatetable(result);
//     },
//     error: function (error) {
//       console.log(error);
//     },
//   });
// }

// //onloadfromlocalstorage();
onloadfromAPI();