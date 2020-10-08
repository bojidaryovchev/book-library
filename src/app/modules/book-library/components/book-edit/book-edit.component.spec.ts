import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogHarness } from '@angular/material/dialog/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { Observable } from 'rxjs';
import { BookEditComponent } from './book-edit.component';

describe('BookEditComponent', () => {
  let component: BookEditComponent;
  let fixture: ComponentFixture<BookEditComponent>;
  let actions$: Observable<Action>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BookEditComponent],
      providers: [
        { provide: MatDialogRef, useValue: MatDialogHarness },
        { provide: MAT_DIALOG_DATA, useValue: { book: { title: 'KKK' } } },
        provideMockStore({
          selectors: [
            {
              selector: 'books',
              value: [],
            },
          ],
        }),
        provideMockActions(() => actions$),
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain form', () => {
    expect(fixture.nativeElement.querySelector('[data-test="form"]')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('[data-test="title-input"]')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('[data-test="year-input"]')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('[data-test="genre-input"]')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('[data-test="submit-button"]')).toBeTruthy();
  });
});
