import { Component, inject, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IQuote } from '../quotes/quotes';
import { ApiBackend } from '../../Services/api-backend';

@Component({
  selector: 'app-add-edit-quote',
  templateUrl: './add-edit-quote.html',
  imports: [ReactiveFormsModule],
})
export class AddEditQuote implements OnInit {
  private route = inject(ActivatedRoute);
  private backend = inject(ApiBackend);
  public router = inject(Router);

  public quote: IQuote = { id: 0, content: '', author: '' };
  public IsEdit: boolean = false;

  quoteForm = new FormGroup({
    id: new FormControl(0),
    content: new FormControl(''),
    author: new FormControl(''),
  });

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.IsEdit = JSON.parse(params['Edit']);
      if (this.IsEdit) {
        this.quote = JSON.parse(params['quote']);
        this.quoteForm.patchValue({
          id: this.quote.id,
          content: this.quote.content,
          author: this.quote.author,
        });
      }
    });
  }

  onSubmit(): void {
    if (this.IsEdit) {
      this.backend.UpdateQuote(this.quoteForm.value, this.quote.id).subscribe({
        next: () => this.router.navigate(['quotes']),
      });
    } else {
      this.backend.CreateQuote(this.quoteForm.value).subscribe({
        next: () => this.router.navigate(['quotes']),
      });
    }
  }
}
