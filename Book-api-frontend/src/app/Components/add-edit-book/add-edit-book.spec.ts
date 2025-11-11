import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditBook } from './add-edit-book';

describe('AddEditBook', () => {
  let component: AddEditBook;
  let fixture: ComponentFixture<AddEditBook>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEditBook],
    }).compileComponents();

    fixture = TestBed.createComponent(AddEditBook);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
