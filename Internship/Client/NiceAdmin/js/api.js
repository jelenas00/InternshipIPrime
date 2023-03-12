import { Employee } from "./employee.js" 
import { Task } from "./task.js"

export class Api{
    constructor(){}

    /////////////////////PUT
    async updateEmployee(employee){

        let response = await fetch("http://localhost:5219/Employees/UpdateEmployee",
        {
            headers:
            {
                Accept:"application/json",
                "Content-type":"application/json",
            },
            method:"PUT",
            body: JSON.stringify(employee)
        });

        switch(response.status){
            case 200: {
                return response.json();
            }
            case 400:{
                console.log(`Client error: ${await response.text()}`);
                return false;
            }
            default:{
                console.log(`Server error: ${await response.text()}`);
                return false;
            }
        }
    }
    async updateTask(task){

        let response = await fetch("http://localhost:5219/Tasks/UpdateTask",
        {
            headers:
            {
                Accept:"application/json",
                "Content-type":"application/json",
            },
            method:"PUT",
            body: JSON.stringify(task)
        });

        switch(response.status){
            case 200: {
                return response.json();
            }
            case 400:{
                console.log(`Client error: ${await response.text()}`);
                return false;
            }
            default:{
                console.log(`Server error: ${await response.text()}`);
                return false;
            }
        }
    }
    /////////////////////POST
    async createEmployee(employee){

        let response = await fetch("http://localhost:5219/Employees/CreateEmployee",
        {
            headers:
            {
                Accept:"application/json",
                "Content-type":"application/json",
            },
            method:"POST",
            body: JSON.stringify(employee)
        });

        switch(response.status){
            case 200: {
                return response.json();
            }
            case 400:{
                console.log(`Client error: ${await response.text()}`);
                return false;
            }
            default:{
                console.log(`Server error: ${await response.text()}`);
                return false;
            }
        }
    }
    async createTask(task){

        let response = await fetch("http://localhost:5219/Tasks/CreateTask",
        {
            headers:
            {
                Accept:"application/json",
                "Content-type":"application/json",
            },
            method:"POST",
            body: JSON.stringify(task)
        });

        switch(response.status){
            case 200: {
                return response.json();
            }
            case 400:{
                console.log(`Client error: ${await response.text()}`);
                return false;
            }
            default:{
                console.log(`Server error: ${await response.text()}`);
                return false;
            }
        }
    }
    /////////////////////GET
    async getEmployees()
    {
        let list=[]
        let response= await fetch("http://localhost:5219/Employees/GetAllEmployees", 
        {
            method:"GET"
        });
        switch(response.status)
        {
            case 200:
                {
                    var data= await response.json();
                    data.forEach(el => {
                        const employee= new Employee(el.id,el.FullName,el.Email,el.PhoneNumber,el.DateOfBirth,el.MonthlySalary,el.CompletedTasks);
                        list.push(employee);
                    });
                    return list;
                }
            case 400:{
                console.log(`Client error: ${await response.text()}`);
                return false;
            }
            default:{
                console.log(`Server error: ${await response.text()}`);
                return false;
            }
        }
    }

    async getTop5()
    {
        let list=[]
        let response= await fetch("http://localhost:5219/Employees/GetTopFive", 
        {
            method:"GET"
        });
        switch(response.status)
        {
            case 200:
                {
                    var data= await response.json();
                    data.forEach(el => {
                        const employee= new Employee(el.id,el.FullName,el.Email,el.PhoneNumber,el.DateOfBirth,el.MonthlySalary,el.CompletedTasks);
                        list.push(employee);
                    });
                    return list;
                }
            case 400:{
                console.log(`Client error: ${await response.text()}`);
                return false;
            }
            default:{
                console.log(`Server error: ${await response.text()}`);
                return false;
            }
        }
    }

    async getEmployeeById(id)
    {
        let response= await fetch("http://localhost:5219/Employees/GetEmployeeById/"+id, 
        {
            method:"GET"
        });
        switch(response.status)
        {
            case 200:
                {
                    var el= await response.json();
                    const employee= new Employee(el.id,el.FullName,el.Email,el.PhoneNumber,el.DateOfBirth,el.MonthlySalary,el.CompletedTasks);
                    return employee;
                }
            case 400:{
                console.log(`Client error: ${await response.text()}`);
                return false;
            }
            default:{
                console.log(`Server error: ${await response.text()}`);
                return false;
            }
        }
    }
    async getTasks()
    {
        let list=[]
        let response= await fetch("http://localhost:5219/Tasks/GetAllTasks", 
        {
            method:"GET"
        });
        switch(response.status)
        {
            case 200:
                {
                    var data= await response.json();
                    data.forEach(el => {
                        const task= new Task(el.id,el.Title,el.Description,el.DueDate,el.Assignee,el.Status);
                        list.push(task);
                    });
                    return list;
                }
            case 400:{
                console.log(`Client error: ${await response.text()}`);
                return false;
            }
            default:{
                console.log(`Server error: ${await response.text()}`);
                return false;
            }
        }
    }

    async getTaskById(id)
    {
        let response= await fetch("http://localhost:5219/Tasks/GetTaskById/"+id, 
        {
            method:"GET"
        });
        switch(response.status)
        {
            case 200:
                {
                    var el= await response.json();
                    const task= new Task(el.id,el.Title,el.Description,el.DueDate,el.Assignee,el.Status);
                    return task;
                }
            case 400:{
                console.log(`Client error: ${await response.text()}`);
                return false;
            }
            default:{
                console.log(`Server error: ${await response.text()}`);
                return false;
            }
        }
    }
    /////////////////////DELETE
    async deleteEmployee(id)
    {
        let response= await fetch("http://localhost:5219/Employees/DeleteEmployee/"+id,
        {
            method:"DELETE"
        });
        switch(response.status){
            case 200: {
                console.log(`Employee successfully deleted!`);
                return true;
            }
            case 400:{
                console.log(`Client error: ${await response.text()}`);
                return false;
            }
            default:{
                console.log(`Server error: ${await response.text()}`);
                return false;
            }
        }
    }
    async deleteTask(id)
    {
        let response= await fetch("http://localhost:5219/Tasks/DeleteTask/"+id,
        {
            method:"DELETE"
        });
        switch(response.status){
            case 200: {
                console.log(`Task successfully deleted!`);
                return true;
            }
            case 400:{
                console.log(`Client error: ${await response.text()}`);
                return false;
            }
            default:{
                console.log(`Server error: ${await response.text()}`);
                return false;
            }
        }
    }
}