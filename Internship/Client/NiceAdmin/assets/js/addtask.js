import { Api } from "../../js/api.js"
import { Task } from "../../js/task.js";
import { Employee } from "../../js/employee.js";

var api= new Api();
var employees= await api.getEmployees();
var add=document.getElementById("add")
var asg= document.querySelector(".assignee")
employees.forEach((el,i)=>{
    asg.innerHTML+=`
    <option value="${i}">${el.fullName}</option>
    `
})
add.onclick=(ev)=>{
    var title= document.getElementById("inputTitle").value;
    var description= document.getElementById("inputDescription").value;
    var dueDate=document.getElementById("inputDueDate").value;
    var assignee= document.querySelector(".assignee").value;
    var status=document.querySelector(".status").value
    if(assignee==="false")
    {
        alert("Chosee an employee!")
    }
    else{
        console.log(title,description,dueDate,assignee)
        var task={
            "Title": title,
            "Description": description,
            "DueDate": dueDate,
            "Assignee": employees[assignee].id,
            "Status": status
        }
        create(task)
    }
}
async function create(task){
    var ch= await api.createTask(task)
    if(ch!=false){
        alert("Task successfully created!")
        window.location.reload()
    }
}