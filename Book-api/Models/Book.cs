namespace Book_api.Models;

public class Book
{
    public int id { get; set; }
    public required string title { get; set; }
    public required string author { get; set; }
    public required DateOnly publicationDate { get; set; }
}
