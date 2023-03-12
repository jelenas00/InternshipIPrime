using Internship.Services;
using Microsoft.AspNetCore.Mvc;

namespace Internship.Models{
    [Route("/[controller]")]
    [ApiController]
    public class EmployeesController: ControllerBase{
        private readonly EmployeeService _employeeService;
        private readonly TaskService _taskService;

        public EmployeesController(EmployeeService employeeService, TaskService taskService){
            _employeeService=employeeService;
            _taskService=taskService;
        }

        [Route("GetAllEmployees")]
        [HttpGet]
        public async Task<List<Employee>> Get() =>await _employeeService.GetAsync();
        
        [Route("GetEmployeeById/{id}")]
        [HttpGet]
        public async Task<ActionResult<Employee>> Get(string id)
        {
            var employee = await _employeeService.GetAsync(id);

            if (employee is null)
            {
                return NotFound();
            }

            return employee;
        }

        [Route("GetTopFive")]
        [HttpGet]
        public async Task<ActionResult<List<Employee>>> GetTopFive()
        {
            var employees = await _employeeService.GetAsyncTopFive();

            if (employees is null)
            {
                return NotFound();
            }
            else{
                return employees;
            }
        }

        [Route("CreateEmployee")]
        [HttpPost]
        public async Task<ActionResult<Employee>> CreateEmployee(Employee emp)
        {
            var employee= await _employeeService.CreateAsync(emp);
            if(employee==null)
                return NotFound();
            else
                return employee;
        }

        [Route("UpdateEmployee")]
        [HttpPut]
        public async Task<ActionResult<Employee>> UpdateEmployee(Employee emp)
        {
            var user=await _employeeService.UpdateAsync(emp);
            if(user==null)
                return NotFound();
            else
                return user;
        }

        [Route("DeleteEmployee/{id}")]
        [HttpDelete]
        public async Task<ActionResult<Employee>> DeleteAsync(string id)
        {
            var user=await _employeeService.GetAsync(id);
            if(user==null)
                return NotFound();
            // else
            // {
            //     var diary=await _diariesService.GetAsync(user.Diary);
            //     if(diary!=null)
            //     if(diary.Pages!=null)
            //         foreach(var x in diary.Pages)
            //             await _pagesService.DeleteAsync(x);
            //     await _diariesService.DeleteAsync(user.Diary);
            //     await _usersService.DeleteAsync(id);
            //     return user;
            // }
            else{
                await _employeeService.DeleteAsync(id);
                return Ok();
            }
        }
    }
}