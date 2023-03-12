using MongoDB.Driver;
using Microsoft.Extensions.Options;
using Internship.Models;

namespace Internship.Services;

public class TaskService{
    private readonly IMongoCollection<Tasks> _taskCollection;

    public TaskService(IOptions<InternshipDatabaseSettings> InternshipDatabaseSettings ){
        var mongoClient = new MongoClient(InternshipDatabaseSettings.Value.ConnectionString);

        var mongoDatabase = mongoClient.GetDatabase(InternshipDatabaseSettings.Value.DatabaseName);

        _taskCollection = mongoDatabase.GetCollection<Tasks>( InternshipDatabaseSettings.Value.TasksCollectionName);
    }

    public async Task<List<Tasks>> GetAsync() => await _taskCollection.Find(_ => true).ToListAsync();
    public async Task<Tasks?> GetAsync(string id) =>await _taskCollection.Find(x => x.Id == id).FirstOrDefaultAsync();
        
    public async Task<Tasks?> CreateAsync(Tasks task)
    {
        await _taskCollection.InsertOneAsync(task);
        return task;
    }

    public async Task<Tasks?> UpdateAsync(Tasks ta)
        {
            var use=await _taskCollection.Find(x=>x.Id==ta.Id).FirstOrDefaultAsync();
            if(use!=null)
            {
                use=ta;
            }
            if(use!=null)
                await _taskCollection.ReplaceOneAsync(x=>x.Id==use.Id,ta);
            return use;
        }

        public async Task<Tasks?> DeleteAsync(string id)
        {
            var use=await _taskCollection.Find(x=>x.Id==id).FirstOrDefaultAsync();
            if(use!=null)
            {
                await _taskCollection.DeleteOneAsync(x=>x.Id==id);
                return null;
            }
            return use;

        }
}