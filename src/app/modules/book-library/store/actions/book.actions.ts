import { createAction, props } from '@ngrx/store';
import { Book } from '../../models/book';

export const loadBooks = createAction('[Books Library] Load Books');
export const booksLoadedSuccess = createAction('[Books API] Books Loaded Success', props<{ books: Book[] }>());
export const booksLoadedError = createAction('[Books API] Books Loaded Error');

export const createBook = createAction('[Books Library] Create Book', props<{ book: Book }>());
export const bookCreatedSuccess = createAction('[Books API] Book Created Success', props<{ book: Book }>());
export const bookCreatedError = createAction('[Books API] Book Created Error');

export const updateBook = createAction('[Books Library] Update Book', props<{ id: string; book: Book }>());
export const bookUpdatedSuccess = createAction('[Books API] Book Updated Success', props<{ book: Book }>());
export const bookUpdatedError = createAction('[Books API] Book Updated Error');

export const deleteBook = createAction('[Books Library] Delete Book', props<{ id: string }>());
export const bookDeletedSuccess = createAction('[Books API] Book Deleted Success', props<{ id: string }>());
export const bookDeletedError = createAction('[Books API] Book Deleted Error');
