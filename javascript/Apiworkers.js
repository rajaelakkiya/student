let workerslist = [];

$(document).ready(function (){
$("#workers").click(function(){
let fname = $("#fname").val();
let lname = $("#lname").val();
let mobile = $("#mobile").val();
let email = $("#email").val();
let district= $("#district").val();
let address = $("#address").val();
let gender = $(".gender").val();
let dob = $("#dob").val();
let jdb =$("#jdb").val();
let age =$("#age").val();
let city = $("#city").val();
let state = $("#state").val();
let country = $("#country").val();
let selectposition = $("#selectposition").val();
let selectblood = $("#selectblood").val();

let workers = {
    fname:fname,
    lname:lname,
    dob:dob,
    age:age,
    jdb:jdb,
    address:address,
    gender:gender,
    city:city,
    state:state,
    country:country,
    mobile:mobile,
    email:email,
    district:district,
    selectposition:selectposition,
    selectblood:selectblood,

 }
 console.log(workers)
  function createworkerapi(workers){
    $.ajax({
        url:"https://62ff505434344b6431f68e0c.mockapi.io/workers",
        method:"post",
        datatypes:"json",
        data:workers,
        success:function(result){
            workerslist.push(result);
            onloadfromAPI();
        },
        error:function(error){
            console.log(error);
        },
    });
}
createworkerapi(workers);
})
})
function updateworkersapi(workerslist){
    $("#tbody").html('');
    for (let i=0;i<workerslist.length;i++){
      

        const row="<tr><td>"+workerslist[i].fname+"</td><td>"+workerslist[i].lname+"</td><td>"+workerslist[i].mobile+"</td><td>"+
        workerslist[i].dob+"</td><td>"+workerslist[i].jdb+"</td><td>"+"</td><td>"+workerslist[i].district+"</td><td>"+workerslist[i].gender
        "</td><td>"+workerslist[i].dob+"</td><td>"+workerslist[i].age+"</td><td>"+workerslist[i].city+"</td><td>"+workerslist[i].state+
        "</td><td>"+workerslist[i].country+"</td><td>"+workerslist[i].email+"</td><tr>"+workerslist[i].address+"</td><tr>"+workerslist[i].selectposition+"</td><tr>"+workerslist[i].selectblood+"</td><tr>";
        $("#tbody").append(row)
       }

}
function onloadfromAPI(){
    $.ajax({
        url:"https://62ff505434344b6431f68e0c.mockapi.io/workers",
        method:"get",
        datatypes:"json",
        success:function(result){
            workerslist= result;
            updateworkersapi(result)
        },
        error:function(error){
            console.log(error);
        },
    });
}
    
onloadfromAPI();
