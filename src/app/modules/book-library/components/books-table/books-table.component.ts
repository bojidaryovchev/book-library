import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { Book } from '../../models/book';

@Component({
  selector: 'app-books-table',
  templateUrl: './books-table.component.html',
  styleUrls: ['./books-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BooksTableComponent implements OnInit {
  @Input() books: Book[];

  @Output() bookEdit: EventEmitter<Book> = new EventEmitter();
  @Output() bookDelete: EventEmitter<Book> = new EventEmitter();
  @Output() booksSort: EventEmitter<Sort> = new EventEmitter();

  sortedBooks: Book[];

  readonly displayedColumns: string[] = ['id', 'title', 'year', 'genre', 'edit', 'delete'];

  constructor() {}

  ngOnInit(): void {}

  sortBooks(sort: Sort): void {
    this.booksSort.emit(sort);
  }

  onEditBook(book: Book): void {
    this.bookEdit.emit(book);
  }

  onDeleteBook(book: Book): void {
    this.bookDelete.emit(book);
  }
}
