import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalNotBarcodePage } from './modal-not-barcode.page';

describe('ModalNotBarcodePage', () => {
  let component: ModalNotBarcodePage;
  let fixture: ComponentFixture<ModalNotBarcodePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ModalNotBarcodePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
