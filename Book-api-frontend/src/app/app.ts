import { Component, signal, OnInit, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
})
export class App implements OnInit {
  protected readonly title = signal('Book-api-frontend');

  public router = inject(Router);

  ngOnInit(): void {
    const token = sessionStorage.getItem('token');
    if (!token) {
      this.router.navigate(['login']);
    }
  }
}
