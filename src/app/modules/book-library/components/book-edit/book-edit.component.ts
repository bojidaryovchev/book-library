import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import * as fromApp from 'src/app/store/app.reducer';
import { Book } from '../../models/book';
import {
  bookCreatedError,
  bookCreatedSuccess,
  bookUpdatedError,
  bookUpdatedSuccess,
  createBook,
  updateBook,
} from '../../store/actions/book.actions';

@Component({
  selector: 'app-book-edit',
  templateUrl: './book-edit.component.html',
  styleUrls: ['./book-edit.component.scss'],
})
export class BookEditComponent implements OnInit {
  bookEditForm: FormGroup = new FormGroup({
    title: new FormControl('', [Validators.required]),
    year: new FormControl('', [Validators.required, Validators.pattern(/\d+/)]),
    genre: new FormControl('', []),
  });
  subscriptions: Subscription[] = [];

  constructor(
    private readonly matDialog: MatDialogRef<BookEditComponent>,
    @Inject(MAT_DIALOG_DATA) private readonly data: { book: Book },
    private readonly store: Store<fromApp.AppState>,
    private readonly actions$: Actions
  ) {}

  ngOnInit(): void {
    if (this.data) {
      this.initBookEditForm(this.data.book);
    }

    this.subscriptions.push(
      this.actions$
        .pipe(ofType(bookCreatedSuccess, bookCreatedError, bookUpdatedSuccess, bookUpdatedError))
        .subscribe(() => {
          this.matDialog.close();
        })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((s) => s.unsubscribe());
  }

  get buttonText(): string {
    return this.data ? 'Edit Book' : 'Add Book';
  }

  onEditBook(): void {
    const title: string = this.bookEditForm.controls['title'].value;
    const year: number = this.bookEditForm.controls['year'].value;
    const genre: string = this.bookEditForm.controls['genre'].value;

    const book: Book = {
      title,
      year,
      genre,
    };

    if (this.data) {
      this.store.dispatch(updateBook({ id: this.data.book.id, book }));
    } else {
      this.store.dispatch(createBook({ book }));
    }
  }

  private initBookEditForm(book: Book): void {
    this.bookEditForm.controls['title'].setValue(book.title);
    this.bookEditForm.controls['year'].setValue(book.year);
    this.bookEditForm.controls['genre'].setValue(book.genre);
  }
}
