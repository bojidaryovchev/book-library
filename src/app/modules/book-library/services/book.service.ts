import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { v4 } from 'uuid';
import books from '../../../../assets/books.json';
import { Book } from '../models/book';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  books: Book[] = books;

  constructor() {}

  getBooks(): Observable<Book[]> {
    return of(this.books);
  }

  createBook(book: Book): Observable<Book> {
    const created = { id: v4(), ...book };

    this.books = this.books.slice();
    this.books.push(created);

    return of(created);
  }

  updateBook(id: string, book: Book): Observable<Book> {
    const updated = { id, ...book } as Book;

    const index: number = this.books.findIndex((b) => b.id === id);

    this.books = this.books.slice();
    this.books[index] = updated;

    return of(updated);
  }

  deleteBook(id: string): Observable<string> {
    this.books = this.books.filter((b) => b.id !== id);

    return of(id);
  }
}
