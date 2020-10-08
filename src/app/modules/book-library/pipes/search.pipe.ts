import { Pipe, PipeTransform } from '@angular/core';
import { Book } from '../models/book';

@Pipe({
  name: 'searchBooks',
})
export class SearchBooksPipe implements PipeTransform {
  transform(books: Book[], searchValue: string): Book[] {
    return books.filter((b) => b.title.toLowerCase().indexOf(searchValue.toLowerCase()) !== -1);
  }
}
