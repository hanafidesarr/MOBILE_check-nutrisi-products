import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalNutriscoreInfoPage } from './modal-nutriscore-info.page';

describe('ModalNutriscoreInfoPage', () => {
  let component: ModalNutriscoreInfoPage;
  let fixture: ComponentFixture<ModalNutriscoreInfoPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ModalNutriscoreInfoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
