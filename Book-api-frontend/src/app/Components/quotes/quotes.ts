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

  private isDarkMode: boolean = false;

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
      next: () => this.loadQuotes(),
    });
  }

  lightDarkMode(): void {
    if (this.isDarkMode) {
      document.body.classList.remove('dark-mode');
    } else {
      document.body.classList.add('dark-mode');
    }
    this.isDarkMode = !this.isDarkMode;
  }
}

export interface IQuote {
  id: number;
  content: string;
  author: string;
}
