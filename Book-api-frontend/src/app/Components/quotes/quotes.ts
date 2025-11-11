import { Component, OnInit, inject } from '@angular/core';
import { ApiBackend } from '../../Services/api-backend';
import { Router } from '@angular/router';

@Component({
  selector: 'app-quotes',
  templateUrl: './quotes.html',
})
export class Quotes implements OnInit {
  private backend = inject(ApiBackend);
  public router = inject(Router);

  quotes: IQuote[] = [];

  ngOnInit(): void {
    this.loadQuotes();
  }

  addQuote(): void {
    this.router.navigate(['addQuote'], {
      queryParams: { Edit: false },
    });
  }

  loadQuotes(): void {
    this.backend.getAllQuotes().subscribe({
      next: (v) => (this.quotes = v),
    });
  }

  editQuote(quote: any): void {
    this.router.navigate(['editQuote'], {
      queryParams: { quote: JSON.stringify(quote), Edit: true },
    });
  }

  removeQuote(Id: number): void {
    this.backend.DeleteQuote(Id).subscribe({
      next: () => this.router.navigate(['quotes']),
    });
  }
}

export interface IQuote {
  id: number;
  content: string;
  author: string;
}
