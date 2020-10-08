import { ActionReducerMap } from '@ngrx/store';
import * as fromBook from '../modules/book-library/store/reducers/book.reducers';

export interface AppState {
  books: fromBook.State;
}

export const appReducer: ActionReducerMap<AppState> = {
  books: fromBook.booksReducers,
};
