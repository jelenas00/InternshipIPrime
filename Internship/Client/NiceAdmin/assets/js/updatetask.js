import { Api } from "../../js/api.js"
import { Task } from "../../js/task.js";

var api= new Api();
var tasks= await api.getTasks()
var employees= await api.getEmployees()
console.log(employees)
tasks.forEach((el,i)=>{
    var name= employees.findIndex(function(value) {
        return value.id==el.assignee
    });
    document.getElementById("tbltasks").innerHTML+=`
    <tr>
        <th scope="row">${i+1}</th>
        <td>${el.title}</td>
        <td>${el.description}</td>
        <td>${el.dueDate}</td>
        <td>${employees[name].fullName}</td>
        <td>${el.status}</td>
        <td name="radiotasks"></td>
    </tr>
`
})
let s= document.getElementsByName('radiotasks');
s.forEach((s,i)=>{
    let btn=document.createElement("input");
    btn.type="radio";
    btn.name="btnktask";
    btn.value=i;
    s.appendChild(btn);
})
function onclik(){
    let s=0;
    let val=document.getElementsByName("btnktask");
    val.forEach((s,i)=>
    {
        if(s.checked==true){
            alert(tasks[i]);
        }
    })
    
}
let divbtnktask=document.getElementById('divchangetg');
let changeBtn=document.createElement("button");
changeBtn.innerText="Change";
changeBtn.className="btn btn-info buttonb buttonb2";
changeBtn.innerHTML+=`<i style="font-weight:bold;" class="bi bi-pencil-square"></i>`;
divbtnktask.appendChild(changeBtn);
let deleteBtn= document.createElement("button");
deleteBtn.innerText="Delete";
deleteBtn.innerHTML+=`<i style="font-weight:bold;" class="bi bi-x-square"></i>`;
deleteBtn.className="btn btn-danger buttonr buttonr2";
divbtnktask.appendChild(deleteBtn);

changeBtn.onclick=(ev)=>changeTask();
deleteBtn.onclick=(ev)=>deleteTask();

function deleteTask(){
    let index;
    let picked=0;
    document.getElementsByName("btnktask").forEach(d=>{
        if(d.checked==true)
        {
            index=d.value;
            picked=1;
        }
    });
    if(picked==0)
    {
        alert("Pick an task!");
    }
    else
    {
        let text = "Delete task?";
            if (confirm(text) == true) {
                console.log("true")
                deleteTaskAs(tasks[index].id)
            } else {
                console.log("false")
                document.getElementById("demo").style.display="none"
            }
            document.getElementById("demo").innerHTML = text;
        //deleteTaskAs(tasks[index].id);
    }
}

async function deleteTaskAs(id)
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

function changeTask()
{
    let index;
    let picked=0;
    document.getElementsByName("btnktask").forEach(d=>{
        if(d.checked==true)
        {
            index=d.value;
            picked=1;
        }
    });
    if(picked==0)
    {
        alert("Pick an task!");
    }
    else
    {
        showModal(tasks[index]);
    }
    
}

function showModal( data) {
    let task= new Task();
    task=data;
    console.log(task);
    const modal = new bootstrap.Modal(document.getElementById("myModaltg"), {})
    modal.show();
    document.getElementById("modalBodytg").innerHTML=`
    <form role="form" method="POST" action="">
    <input type="hidden" name="_token" value="">
    <div class="form-group">
        <label class="control-label">Titile</label>
        <div>
            <input type="text" class="form-control input-lg" id="titleModaltg" value="${task.title}" required/>
        </div>
    </div>
    <div class="form-group">
        <label class="control-label">Description</label>
        <div>
            <input type="text" class="form-control input-lg" id="descriptionModaltg" value="${task.description}" required/>
        </div>
    </div>
    <div class="form-group">
        <label class="control-label">Due date</label>
        <div>
            <input type="date" class="form-control input-lg" id="dueDateModaltg" value="${task.dueDate}" required/>
        </div>
    </div>
    <div class="col-md-4">
                  <label for="inputAssignee" class="form-label">Assignee</label>
                  <select id="inputAssignee" type="submit" aria-required="true" class="form-select assignee">
                    <option value="false">Employee...</option>
                  </select>
        </div>
        <div class="col-md-4">
                  <label for="inputAssignee" class="form-label">Status</label>
                  <select id="inputAssignee" type="submit" aria-required="true" class="form-select status">
                    <option value="false">Status...</option>
                    <option value="In progress">In progress</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>
  </form>`
    var asg= document.querySelector(".assignee")
    employees.forEach((el,i)=>{
    asg.innerHTML+=`
    <option value="${i}">${el.fullName}</option>
    `
    var name= employees.findIndex(function(value) {
        return value.id==task.assignee
    });
    document.querySelector(".assignee").value=name
    document.querySelector(".status").value=task.status
})
    let buttonModal=document.getElementById("btnModaltg");
    buttonModal.onclick=(ev)=>pickPodatkeModal(task);
}
async function pickPodatkeModal(task)
{
    var title= document.getElementById("titleModaltg").value;
    var description= document.getElementById("descriptionModaltg").value;
    var dueDate=document.getElementById("dueDateModaltg").value;
    var assignee= document.querySelector(".assignee").value;
    var status=document.querySelector(".status").value
    var taskUp={
        "id": task.id,
        "Title": title,
        "Description": description,
        "DueDate": dueDate,
        "Assignee": employees[assignee].id,
        "Status": status
    }
    console.log(taskUp)
    if(task.status=="In progress"&& status=="Completed")
    {
        var empl= await api.getEmployeeById(task.assignee)
        empl.completedTasks+=1
        var ch2= await api.updateEmployee(empl)
        if(ch2!=false){
            let ch= await api.updateTask(taskUp);
            if(ch!=false)
            {
                window.location.reload();
            }
        }
        else{
            alert("Something went wrong, try again later...")
        }
    }
    let ch= await api.updateTask(taskUp);
    if(ch!=false)
    {
        window.location.reload();
    }
    else{
        alert("Something went wrong, try again later...")
    }
}