import { Api } from "../../js/api.js"
import { Employee } from "../../js/employee.js";

var api= new Api();
var empl= await api.getEmployees();
var top5= await api.getTop5();
console.log(top5)
document.getElementById("noEmployees").innerHTML=empl.length
top5.forEach((el,i)=>{
    document.getElementById("noEmployeesTop5").innerHTML+=`
    <li class="list-group-item">${el.fullName+" completed "+el.completedTasks+" tasks last month."}</li>
    `
})
