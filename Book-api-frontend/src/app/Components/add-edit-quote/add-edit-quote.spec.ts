import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditQuote } from './add-edit-quote';

describe('AddEditQuote', () => {
  let component: AddEditQuote;
  let fixture: ComponentFixture<AddEditQuote>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEditQuote]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditQuote);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
