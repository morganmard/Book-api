using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Book_api.Data;
using Book_api.Models;
using Microsoft.AspNetCore.Authorization;

namespace Book_api.Controllers;

[Route("api/[controller]")]
[ApiController]
public class BooksController(ApplicationDbContext context) : ControllerBase
{
    /* All enpoints in this controller at secured by '[Authorize]', a valid token is needed to call these */
    // GET: api/Books
    [HttpGet]
    [Authorize]
    public async Task<ActionResult<IEnumerable<Book>>> GetAllBooks() => await context.Books.ToListAsync();

    // PUT: api/Books/5
    [HttpPut("{id}")]
    [Authorize]
    public async Task<IActionResult> UpdateBook(int id, Book book)
    {

        /* Sanity check to guard against bad requests */
        if (id != book.id) return BadRequest();

        /* Load the old object to mutate */
        var oldBook = await context.Books.FirstOrDefaultAsync(b => b.id == id);

        /* Make sure this is not a rogue Create-operation */
        if (oldBook is null) return NotFound();

        /* Copy the new info */
        oldBook.title = book.title;
        oldBook.author = book.author;
        oldBook.publicationDate = book.publicationDate;

        context.Books.Update(oldBook);
        await context.SaveChangesAsync();

        return NoContent();
    }

    // POST: api/Books
    [HttpPost]
    [Authorize]
    public async Task CreateBook(Book book)
    {
        context.Books.Add(book);
        await context.SaveChangesAsync();
    }

    // DELETE: api/Books/5
    [HttpDelete("{id}")]
    [Authorize]
    public async Task<IActionResult> DeleteBook(int id)
    {
        var book = await context.Books.FindAsync(id);
        if (book == null) return NotFound();

        context.Books.Remove(book);
        await context.SaveChangesAsync();

        return NoContent();
    }
}
