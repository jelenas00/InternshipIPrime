import { Api } from "../../js/api.js"
import { Employee } from "../../js/employee.js";

var api= new Api();
var employees= await api.getEmployees()
employees.forEach((el,i)=>{
    document.getElementById("tblemployee").innerHTML+=`
    <tr>
        <th scope="row">${i+1}</th>
        <td>${el.fullName}</td>
        <td>${el.email}</td>
        <td>${el.phoneNumber}</td>
        <td>${el.dateOfBirth}</td>
        <td>${el.monthlySalary}</td>
        <td>${el.completedTasks}</td>
        <td name="radioemployees"></td>
    </tr>
`
})
let s= document.getElementsByName('radioemployees');
s.forEach((s,i)=>{
    let btn=document.createElement("input");
    btn.type="radio";
    btn.name="btnkemployee";
    btn.value=i;
    s.appendChild(btn);
})
function onclik(){
    let s=0;
    let val=document.getElementsByName("btnkemployee");
    val.forEach((s,i)=>
    {
        if(s.checked==true){
            alert(employees[i]);
        }
    })
    
}
let divbtnkemployee=document.getElementById('divchangetg');
let changeBtn=document.createElement("button");
changeBtn.innerText="Change";
changeBtn.className="btn btn-info buttonb buttonb2";
changeBtn.innerHTML+=`<i style="font-weight:bold;" class="bi bi-pencil-square"></i>`;
divbtnkemployee.appendChild(changeBtn);
let deleteBtn= document.createElement("button");
deleteBtn.innerText="Delete";
deleteBtn.innerHTML+=`<i style="font-weight:bold;" class="bi bi-x-square"></i>`;
deleteBtn.className="btn btn-danger buttonr buttonr2";
divbtnkemployee.appendChild(deleteBtn);

changeBtn.onclick=(ev)=>changeEmployee();
deleteBtn.onclick=(ev)=>deleteEmployee();

function deleteEmployee(){
    let index;
    let picked=0;
    document.getElementsByName("btnkemployee").forEach(d=>{
        if(d.checked==true)
        {
            index=d.value;
            picked=1;
        }
    });
    if(picked==0)
    {
        alert("Pick an employee!");
    }
    else
    {
        let text = "Delete employee?";
            if (confirm(text) == true) {
                console.log("true")
                deleteEmployeeAs(employees[index].id);
            } else {
                console.log("false")
                document.getElementById("demo").style.display="none"
            }
            document.getElementById("demo").innerHTML = text;
    }
}

async function deleteEmployeeAs(id)
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

function changeEmployee()
{
    let index;
    let picked=0;
    document.getElementsByName("btnkemployee").forEach(d=>{
        if(d.checked==true)
        {
            index=d.value;
            picked=1;
        }
    });
    if(picked==0)
    {
        alert("Pick an employee!");
    }
    else
    {
        showModal(employees[index]);
    }
    
}

function showModal( data) {
    let employee= new Employee();
    employee=data;
    console.log(employee);
    const modal = new bootstrap.Modal(document.getElementById("myModaltg"), {})
    modal.show();
    document.getElementById("modalBodytg").innerHTML=`
    <form role="form" method="POST" action="">
    <input type="hidden" name="_token" value="">
    <div class="form-group">
        <label class="control-label">Full Name</label>
        <div>
            <input type="text" class="form-control input-lg" name="ime" id="fullNameModaltg" value="${employee.fullName}" required/>
        </div>
    </div>
    <div class="form-group">
        <label class="control-label">Email</label>
        <div>
            <input type="text" class="form-control input-lg" id="emailModaltg" value="${employee.email}" required/>
        </div>
    </div>
    <div class="form-group">
        <label class="control-label">Phone number</label>
        <div>
            <input type="text" class="form-control input-lg" id="phoneNumberModaltg" value="${employee.phoneNumber}" required/>
        </div>
    </div>
    <div class="form-group">
    <label class="control-label">Date Of Birth</label>
    <div>
        <input type="date" class="form-control input-lg" id="dateOfBirthModaltg" value="${employee.dateOfBirth}" required/>
    </div>
    </div>
    <div class="form-group">
        <label class="control-label">Monthly Salary</label>
        <div>
            <input type="text" class="form-control input-lg" id="monthlySalaryModaltg" value="${employee.monthlySalary}" required/>
        </div>
    </div>
  </form>`
    let buttonModal=document.getElementById("btnModaltg");
    buttonModal.onclik=(ev)=>console.log("ce bude")
    buttonModal.onclick=(ev)=>pickPodatkeModal(employee);
}
async function pickPodatkeModal(emp)
{
    var fullName=document.getElementById("fullNameModaltg").value;
    var email=document.getElementById("emailModaltg").value;
    var phoneNumber=document.getElementById("phoneNumberModaltg").value;
    var dateOfBirth=document.getElementById("dateOfBirthModaltg").value;
    var monthlySalary=document.getElementById("monthlySalaryModaltg").value;
    console.log(fullName,email,dateOfBirth,monthlySalary)
    let employee={
        "id": emp.id,
        "FullName": fullName,
        "Email": email,
        "PhoneNumber": phoneNumber,
        "DateOfBirth": dateOfBirth,
        "MonthlySalary": monthlySalary
      }
      
    console.log(employee)
    let ch= await api.updateEmployee(employee);
    if(ch!=false)
    {
        window.location.reload();
    }
}