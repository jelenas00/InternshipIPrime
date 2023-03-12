using Internship.Services;
using Microsoft.AspNetCore.Mvc;

namespace Internship.Models{
    [Route("/[controller]")]
    [ApiController]
    public class TasksController : ControllerBase{
        private readonly EmployeeService _employeeService;
        private readonly TaskService _taskService;

        public TasksController(EmployeeService employeeService, TaskService taskService){
            _employeeService=employeeService;
            _taskService=taskService;
        }

        [Route("GetAllTasks")]
        [HttpGet]
        public async Task<List<Tasks>> Get() =>await _taskService.GetAsync();
        
        [Route("GetTaskById/{id}")]
        [HttpGet]
        public async Task<ActionResult<Tasks>> Get(string id)
        {
            var task = await _taskService.GetAsync(id);

            if (task is null)
            {
                return NotFound();
            }

            return task;
        }

        [Route("CreateTask")]
        [HttpPost]
        public async Task<ActionResult<Tasks>> CreateTask(Tasks task)
        {
            var taskret= await _taskService.CreateAsync(task);
            if(taskret==null)
                return NotFound();
            else
                return taskret;
        }

        [Route("UpdateTask")]
        [HttpPut]
        public async Task<ActionResult<Tasks>> UpdateTask(Tasks ta)
        {
            var task=await _taskService.UpdateAsync(ta);
            if(task==null)
                return NotFound();
            else
                return task;
        }

        [Route("DeleteTask/{id}")]
        [HttpDelete]
        public async Task<ActionResult<Tasks>> DeleteAsync(string id)
        {
            var task=await _taskService.GetAsync(id);
            if(task==null)
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
                await _taskService.DeleteAsync(id);
                return Ok();
            }
        }
    }
}