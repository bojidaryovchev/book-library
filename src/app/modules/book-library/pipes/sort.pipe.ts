import { Pipe, PipeTransform } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { Book } from '../models/book';

@Pipe({
  name: 'sortBooks',
})
export class SortBooksPipe implements PipeTransform {
  transform(books: Book[], sort: Sort): Book[] {
    const sortedBooks = books.slice();

    const { active, direction } = sort;

    if (direction) {
      const compareFn = (a: Book, b: Book) => {
        switch (active) {
          case 'id':
            return a.id.localeCompare(b.id);
          case 'title':
            return a.title.localeCompare(b.title);
          case 'year':
            return a.year - b.year;
          case 'genre':
            return a.genre.localeCompare(b.genre);
        }
      };

      sortedBooks.sort((a, b) => {
        return direction === 'asc' ? compareFn(a, b) : compareFn(b, a);
      });
    }

    return sortedBooks;
  }
}
