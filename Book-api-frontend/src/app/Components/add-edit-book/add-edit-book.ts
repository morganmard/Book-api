import { Component, inject, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IBook } from '../books/books';
import { ApiBackend } from '../../Services/api-backend';

@Component({
  selector: 'app-add-edit-book',
  templateUrl: './add-edit-book.html',
  imports: [ReactiveFormsModule],
})
export class AddEditBook implements OnInit {
  private route = inject(ActivatedRoute);
  private backend = inject(ApiBackend);
  public router = inject(Router);

  public book: IBook = { id: 0, title: '', author: '', publicationDate: Date.prototype };
  public IsEdit: boolean = false;

  bookForm = new FormGroup({
    id: new FormControl(0),
    title: new FormControl(''),
    author: new FormControl(''),
    publicationDate: new FormControl(),
  });

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.IsEdit = JSON.parse(params['Edit']);
      if (this.IsEdit) {
        this.book = JSON.parse(params['book']);
        this.bookForm.patchValue({
          id: this.book.id,
          title: this.book.title,
          author: this.book.author,
          publicationDate: this.book.publicationDate,
        });
      }
    });
  }

  onSubmit(): void {
    if (this.IsEdit) {
      this.backend.UpdateBook(this.bookForm.value, this.book.id).subscribe({
        next: () => this.router.navigate(['books']),
      });
    } else {
      this.backend.CreateBook(this.bookForm.value).subscribe({
        next: () => this.router.navigate(['books']),
      });
    }
  }
}
