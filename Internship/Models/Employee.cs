using System.Text.Json.Serialization;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Internship.Models{

    public class Employee{
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set;}=string.Empty;

        [BsonElement("FullName")]
        [JsonPropertyName("FullName")]
        public string FullName { get; set;}=string.Empty; 

        [BsonElement("Email")]
        [JsonPropertyName("Email")]
        public string Email { get; set;}=string.Empty; 

        [BsonElement("PhoneNumber")]
        [JsonPropertyName("PhoneNumber")]
        public string PhoneNumber { get; set;}=string.Empty; 

        [BsonElement("DateOfBirth")]
        [JsonPropertyName("DateOfBirth")]
        public string DateOfBirth { get; set;}=string.Empty; 

        [BsonElement("MonthlySalary")]
        [JsonPropertyName("MonthlySalary")]
        public int MonthlySalary { get; set;}

        [BsonElement("CompletedTasks")]
        [JsonPropertyName("CompletedTasks")]
        public int CompletedTasks { get; set;}
    }
}