namespace Book_api.Models;

public class Quote
{
    public int id { get; set; }
    public required string content { get; set; }
    public required string author { get; set; }
}
