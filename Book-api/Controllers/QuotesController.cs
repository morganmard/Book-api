using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Book_api.Data;
using Book_api.Models;
using Microsoft.AspNetCore.Authorization;

namespace Book_api.Controllers;

[Route("api/[controller]")]
[ApiController]
public class QuotesController(ApplicationDbContext context) : ControllerBase
{
    // GET: api/Quotes
    [HttpGet]
    [Authorize]
    public async Task<ActionResult<IEnumerable<Quote>>> GetAllQuotes() => await context.Quotes.ToListAsync();

    // PUT: api/Quotes/5
    [HttpPut("{id}")]
    [Authorize]
    public async Task<IActionResult> UpdateQuotes(int id, Quote quote)
    {
        if (id != quote.id) return BadRequest();

        var oldQuote = await context.Quotes.FirstOrDefaultAsync(b => b.id == id);

        if (oldQuote is null) return NotFound();

        oldQuote.content = quote.content;
        oldQuote.author = quote.author;

        context.Quotes.Update(oldQuote);
        await context.SaveChangesAsync();

        return NoContent();
    }

    // POST: api/Quotes
    [HttpPost]
    [Authorize]
    public async Task CreateQuote(Quote quote)
    {
        context.Quotes.Add(quote);
        await context.SaveChangesAsync();
    }

    // DELETE: api/Quotes/5
    [HttpDelete("{id}")]
    [Authorize]
    public async Task<IActionResult> DeleteQuote(int id)
    {
        var quote = await context.Quotes.FindAsync(id);
        if (quote == null) return NotFound();

        context.Quotes.Remove(quote);
        await context.SaveChangesAsync();

        return NoContent();
    }
}
