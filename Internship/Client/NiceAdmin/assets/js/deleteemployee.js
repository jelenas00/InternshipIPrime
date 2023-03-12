import { Api } from "../../js/api.js"
import { Task } from "../../js/task.js";
import { Employee } from "../../js/employee.js";

var api= new Api();
var employees= await api.getEmployees()
console.log(employees)
var selectEmployee= document.querySelector(".chooseEmployee")
employees.forEach((el,i)=>{
    selectEmployee.innerHTML+=`
    <option value="${i}">${el.fullName}</option>
    `
})
var change=document.getElementById("deleteEmployee")
change.onclick=(ev)=>{
    var k=document.querySelector(".chooseEmployee").value;
    if(k==="false")
    {
        alert("Choose an employee to delete!")
    }
    else{
            let text = "Delete employee?";
            if (confirm(text) == true) {
                console.log("true")
                deleteTask(employees[k].id)
            } else {
                console.log("false")
                document.getElementById("demo").style.display="none"
            }
            document.getElementById("demo").innerHTML = text;
        
    }
}

async function deleteTask(id)
{
    var ch= await api.deleteEmployee(id)
    if(ch==true){
        alert(`Employee successfully deleted!`)
        window.location.reload()
    }
    else{
        alert(`Something went wrong, try again later`)
        window.location.reload()
    }
}