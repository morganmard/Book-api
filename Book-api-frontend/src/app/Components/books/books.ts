import { Component, OnInit, inject } from '@angular/core';
import { ApiBackend } from '../../Services/api-backend';
import { Router } from '@angular/router';

@Component({
  selector: 'app-books',
  templateUrl: './books.html',
})
export class Books implements OnInit {
  private backend = inject(ApiBackend);
  public router = inject(Router);

  private isDarkMode: boolean = false;

  books: IBook[] = [];

  ngOnInit(): void {
    this.loadBooks();
  }

  addBook(): void {
    this.router.navigate(['add'], {
      queryParams: { Edit: false },
    });
  }

  loadBooks(): void {
    this.backend.getAllBooks().subscribe({
      next: (v) => (this.books = v),
    });
  }

  editBook(book: any): void {
    this.router.navigate(['edit'], {
      queryParams: { book: JSON.stringify(book), Edit: true },
    });
  }

  removeBook(Id: number): void {
    this.backend.DeleteBook(Id).subscribe({
      next: () => this.loadBooks(),
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

export interface IBook {
  id: number;
  title: string;
  author: string;
  publicationDate: Date;
}
