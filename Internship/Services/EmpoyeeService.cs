using Internship.Models;
using MongoDB.Driver;
using Microsoft.Extensions.Options;

namespace Internship.Services{

    public class EmployeeService{

        private readonly IMongoCollection<Employee> _employeeCollection;
        public EmployeeService(IOptions<InternshipDatabaseSettings> InternshipDatabaseSettings ){
            var mongoClient = new MongoClient(InternshipDatabaseSettings.Value.ConnectionString);

            var mongoDatabase = mongoClient.GetDatabase(InternshipDatabaseSettings.Value.DatabaseName);

            _employeeCollection = mongoDatabase.GetCollection<Employee>( InternshipDatabaseSettings.Value.EmployeesCollectionName);
        }
        public async Task<List<Employee>> GetAsync() => await _employeeCollection.Find(_ => true).ToListAsync();
        public async Task<Employee?> GetAsync(string id) =>await _employeeCollection.Find(x => x.Id == id).FirstOrDefaultAsync();

        public async Task<List<Employee>> GetAsyncTopFive(){
            var employee= await _employeeCollection.Find(_ => true).ToListAsync();
            var sortEmpl= employee.OrderByDescending(x=>x.CompletedTasks).ToList();
            if(DateTime.Now.Day==1){
                for(int i=0;i<sortEmpl.Count();i++){
                    sortEmpl[i].CompletedTasks=0;
                }
                await _employeeCollection.InsertManyAsync(sortEmpl);
                if(sortEmpl.Count()<5) return sortEmpl;
                else return sortEmpl.GetRange(0,5);
            }
            else{
                if(sortEmpl.Count()<5) return sortEmpl;
                else return sortEmpl.GetRange(0,5);
            } 
        }
        
        public async Task<Employee?> CreateAsync(Employee employee)
        {
            await _employeeCollection.InsertOneAsync(employee);
            return employee;
        }

        public async Task<Employee?> UpdateAsync(Employee employee)
        {
            var use=await _employeeCollection.Find(x=>x.Id==employee.Id).FirstOrDefaultAsync();
            if(use!=null)
            {
                use=employee;
            }
            if(use!=null)
                await _employeeCollection.ReplaceOneAsync(x=>x.Id==use.Id,employee);
            return use;
        }

        public async Task<Employee?> DeleteAsync(string id)
        {
            var use=await _employeeCollection.Find(x=>x.Id==id).FirstOrDefaultAsync();
            if(use!=null)
            {
                await _employeeCollection.DeleteOneAsync(x=>x.Id==id);
                return null;
            }
            return use;

        }
    }
}