import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { MaterialModule } from '../material/material.module';
import { BookLibraryRoutingModule } from './book-library-routing.module';
import { BookEditComponent } from './components/book-edit/book-edit.component';
import { BookLibraryComponent } from './components/book-library/book-library.component';
import { BooksTableComponent } from './components/books-table/books-table.component';
import { SearchBooksPipe } from './pipes/search.pipe';
import { SortBooksPipe } from './pipes/sort.pipe';
import { BookEffects } from './store/effects/book.effects';

@NgModule({
  imports: [
    CommonModule,
    BookLibraryRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    EffectsModule.forFeature([BookEffects]),
  ],
  declarations: [BookLibraryComponent, BooksTableComponent, BookEditComponent, SearchBooksPipe, SortBooksPipe],
})
export class BookLibraryModule {}
