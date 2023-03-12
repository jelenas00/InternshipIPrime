namespace Internship.Models;

public class InternshipDatabaseSettings{
    public string ConnectionString { get; set;}=null!;
    public string DatabaseName { get; set;}=null!;
    public string EmployeesCollectionName { get; set;}=null!;
    public string TasksCollectionName { get; set;}=null!;
}