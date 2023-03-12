import { Api } from "../../js/api.js"
import { Task } from "../../js/task.js";
import { Employee } from "../../js/employee.js";

var api= new Api();
var tasks= await api.getTasks()
console.log(tasks)
var selectTask= document.querySelector(".chooseTask")
tasks.forEach((el,i)=>{
    selectTask.innerHTML+=`
    <option value="${i}">${el.title}</option>
    `
})
var change=document.getElementById("deleteTask")
change.onclick=(ev)=>{
    var k=document.querySelector(".chooseTask").value;
    if(k==="false")
    {
        alert("Choose a task to delete!")
    }
    else{
        //deleteTask(tasks[k].id)
            let text = "Delete task?";
            if (confirm(text) == true) {
                console.log("true")
                deleteTask(tasks[k].id)
            } else {
                console.log("false")
                document.getElementById("demo").style.display="none"
            }
            document.getElementById("demo").innerHTML = text;
        
    }
}

async function deleteTask(id)
{
    var ch= await api.deleteTask(id)
    if(ch==true){
        alert(`Task successfully deleted!`)
        window.location.reload()
    }
    else{
        alert(`Something went wrong, try again later`)
        window.location.reload()
    }
}