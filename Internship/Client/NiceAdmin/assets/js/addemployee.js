import { Api } from "../../js/api.js"
import { Task } from "../../js/task.js";
import { Employee } from "../../js/employee.js";

var api= new Api();

var add=document.getElementById("add")
add.onclick=(ev)=>{
    var fullName= document.getElementById("inputFullName").value;
    var email=document.getElementById("inputEmail").value;
    var phoneNumber= document.getElementById("inputPhoneNumber").value;
    var dateOfBirth=document.getElementById("inputDateOfBirth").value;
    var monthlySalary= document.getElementById("inputMonthlySalary").value;
    console.log(fullName,email,phoneNumber,dateOfBirth,monthlySalary)
    var emp={
        "FullName": fullName,
        "Email": email,
        "PhoneNumber": phoneNumber,
        "DateOfBirth": dateOfBirth,
        "MonthlySalary": monthlySalary,
        "CompletedTasks": 0
      }
    create(emp)
}
async function create(emp){
    var ch= await api.createEmployee(emp)
    if(ch!=false){
        alert("Employee succesfully added!")
        window.location.reload()
    }
}