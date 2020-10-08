import { createReducer, on } from '@ngrx/store';
import { Book } from '../../models/book';
import {
  bookCreatedSuccess,
  bookDeletedSuccess,
  booksLoadedSuccess,
  bookUpdatedSuccess,
} from '../actions/book.actions';

export interface State {
  books: Book[];
}

const initialState: State = {
  books: [],
};

const _booksReducers = createReducer(
  initialState,
  on(booksLoadedSuccess, (state, { books }) => {
    return { ...state, books };
  }),
  on(bookCreatedSuccess, (state, { book }) => ({ ...state, books: [...state.books, book] })),
  on(bookUpdatedSuccess, (state, { book }) => {
    const books = state.books.slice();
    const index = books.findIndex((b) => b.id === book.id);

    books[index] = book;

    return { ...state, books };
  }),
  on(bookDeletedSuccess, (state, { id }) => {
    const books = state.books.filter((b) => b.id !== id);

    return { ...state, books };
  })
);

export function booksReducers(state, action) {
  return _booksReducers(state, action);
}
