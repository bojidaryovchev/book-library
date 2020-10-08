import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { BookService } from '../../services/book.service';
import {
  bookCreatedError,
  bookCreatedSuccess,
  bookDeletedError,
  bookDeletedSuccess,
  booksLoadedError,
  booksLoadedSuccess,
  bookUpdatedError,
  bookUpdatedSuccess,
  createBook,
  deleteBook,
  loadBooks,
  updateBook,
} from '../actions/book.actions';

@Injectable()
export class BookEffects {
  getBooks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadBooks),
      mergeMap(() =>
        this.bookService.getBooks().pipe(
          map((books) => booksLoadedSuccess({ books })),
          catchError(() => of(booksLoadedError()))
        )
      )
    )
  );

  createBook$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createBook),
      mergeMap(({ book }) =>
        this.bookService.createBook(book).pipe(
          map((book) => bookCreatedSuccess({ book })),
          catchError(() => of(bookCreatedError()))
        )
      )
    )
  );

  updateBook$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateBook),
      mergeMap(({ id, book }) =>
        this.bookService.updateBook(id, book).pipe(
          map((book) => bookUpdatedSuccess({ book })),
          catchError(() => of(bookUpdatedError()))
        )
      )
    )
  );

  deleteBook$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteBook),
      mergeMap(({ id }) =>
        this.bookService.deleteBook(id).pipe(
          map(() => bookDeletedSuccess({ id })),
          catchError(() => of(bookDeletedError()))
        )
      )
    )
  );

  constructor(private readonly actions$: Actions, private readonly bookService: BookService) {}
}
