import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./Components/login/login').then((m) => m.Login),
  },
  {
    path: 'register',
    loadComponent: () => import('./Components/register/register').then((m) => m.Register),
  },
  {
    path: 'books',
    loadComponent: () => import('./Components/books/books').then((m) => m.Books),
  },
  {
    path: '',
    loadComponent: () => import('./Components/books/books').then((m) => m.Books),
  },
  {
    path: 'edit',
    loadComponent: () =>
      import('./Components/add-edit-book/add-edit-book').then((m) => m.AddEditBook),
  },
  {
    path: 'add',
    loadComponent: () =>
      import('./Components/add-edit-book/add-edit-book').then((m) => m.AddEditBook),
  },
  {
    path: 'quotes',
    loadComponent: () => import('./Components/quotes/quotes').then((m) => m.Quotes),
  },
  {
    path: 'editQuote',
    loadComponent: () =>
      import('./Components/add-edit-quote/add-edit-quote').then((m) => m.AddEditQuote),
  },
  {
    path: 'addQuote',
    loadComponent: () =>
      import('./Components/add-edit-quote/add-edit-quote').then((m) => m.AddEditQuote),
  },
];
