import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Sort } from '@angular/material/sort';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import * as fromApp from 'src/app/store/app.reducer';
import { Book } from '../../models/book';
import { deleteBook, loadBooks } from '../../store/actions/book.actions';
import { BookEditComponent } from '../book-edit/book-edit.component';

@Component({
  selector: 'app-book-library',
  templateUrl: './book-library.component.html',
  styleUrls: ['./book-library.component.scss'],
})
export class BookLibraryComponent implements OnInit, OnDestroy {
  books$: Observable<Book[]>;
  searchValue: string = '';
  sort: Sort;
  subscriptions: Subscription[] = [];

  constructor(
    private readonly matDialog: MatDialog,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly store: Store<fromApp.AppState>
  ) {}

  ngOnInit(): void {
    this.books$ = this.store.select('books').pipe(map(({ books }) => books));

    this.store.dispatch(loadBooks());

    this.subscriptions.push(
      this.route.queryParams.subscribe((params: Params) => {
        const { sortBy, sortDirection } = params;

        this.sort = {
          active: sortBy,
          direction: sortDirection,
        };
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((s) => s.unsubscribe());
  }

  onBookAdd(): void {
    this.matDialog.open(BookEditComponent);
  }

  onBookEdit(book: Book): void {
    this.matDialog.open(BookEditComponent, { data: { book } });
  }

  onBookDelete({ id }: Book): void {
    this.store.dispatch(deleteBook({ id }));
  }

  onSort(sort: Sort): void {
    const { active, direction } = sort;

    if (direction) {
      this.router.navigate([], { queryParams: { sortBy: active, sortDirection: direction } });
    } else {
      this.router.navigate([]);
    }
  }
}
