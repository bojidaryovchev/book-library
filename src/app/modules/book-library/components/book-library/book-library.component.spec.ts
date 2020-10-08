import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { BookLibraryComponent } from './book-library.component';

describe('BookLibraryComponent', () => {
  let component: BookLibraryComponent;
  let fixture: ComponentFixture<BookLibraryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BookLibraryComponent],
      imports: [MatDialogModule, RouterTestingModule],
      providers: [
        provideMockStore({
          selectors: [
            {
              selector: 'books',
              value: [],
            },
          ],
        }),
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookLibraryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
