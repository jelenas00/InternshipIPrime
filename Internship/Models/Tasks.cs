using System.Text.Json.Serialization;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Internship.Models{

    public class Tasks{
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set;}=string.Empty;

        [BsonElement("Title")]
        [JsonPropertyName("Title")]
        public string Title { get; set;}=string.Empty;

        [BsonElement("Description")]
        [JsonPropertyName("Description")]
        public string Description { get; set;}=string.Empty;
        
        [BsonElement("Assignee")]
        [JsonPropertyName("Assignee")]
        public string Assignee { get; set;}=string.Empty;

        [BsonElement("DueDate")]
        [JsonPropertyName("DueDate")]
        public string DueDate { get; set;}=string.Empty;

        [BsonElement("Status")]
        [JsonPropertyName("Status")]
        public string Status { get; set;}=string.Empty;
    }
}