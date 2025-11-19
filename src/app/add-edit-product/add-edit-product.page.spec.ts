import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddEditProductPage } from './add-edit-product.page';

describe('AddEditProductPage', () => {
  let component: AddEditProductPage;
  let fixture: ComponentFixture<AddEditProductPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AddEditProductPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
