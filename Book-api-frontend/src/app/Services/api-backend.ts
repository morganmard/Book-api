import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiBackend {
  private http = inject(HttpClient);

  private readonly baseUrl = 'http://localhost:5010/api';

  Register(cred: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/User/Register/`, cred);
  }

  Login(cred: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/User/`, cred);
  }

  /* Crud for books */

  CreateBook(book: any): Observable<any> {
    const token = sessionStorage.getItem('token');
    if (token) {
      return this.http.post(`${this.baseUrl}/Books/`, book, {
        headers: { Authorization: `Bearer ${token}` },
      });
    }
    throw new Error('No token found');
  }

  getAllBooks(): Observable<any> {
    const token = sessionStorage.getItem('token');
    if (token) {
      return this.http.get(`${this.baseUrl}/Books/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
    }
    throw new Error('No token found');
  }

  UpdateBook(book: any, id: number): Observable<any> {
    const token = sessionStorage.getItem('token');
    if (token) {
      return this.http.put(`${this.baseUrl}/Books/${id}`, book, {
        headers: { Authorization: `Bearer ${token}` },
      });
    }
    throw new Error('No token found');
  }

  DeleteBook(id: number): Observable<any> {
    const token = sessionStorage.getItem('token');
    if (token) {
      return this.http.delete(`${this.baseUrl}/Books/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
    }
    throw new Error('No token found');
  }

  /* Crud for Quotes */

  CreateQuote(quote: any): Observable<any> {
    const token = sessionStorage.getItem('token');
    if (token) {
      return this.http.post(`${this.baseUrl}/Quotes/`, quote, {
        headers: { Authorization: `Bearer ${token}` },
      });
    }
    throw new Error('No token found');
  }

  getAllQuotes(): Observable<any> {
    const token = sessionStorage.getItem('token');
    if (token) {
      return this.http.get(`${this.baseUrl}/Quotes/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
    }
    throw new Error('No token found');
  }

  UpdateQuote(quote: any, id: number): Observable<any> {
    const token = sessionStorage.getItem('token');
    if (token) {
      return this.http.put(`${this.baseUrl}/Quotes/${id}`, quote, {
        headers: { Authorization: `Bearer ${token}` },
      });
    }
    throw new Error('No token found');
  }

  DeleteQuote(id: number): Observable<any> {
    const token = sessionStorage.getItem('token');
    if (token) {
      return this.http.delete(`${this.baseUrl}/Quotes/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
    }
    throw new Error('No token found');
  }
}
