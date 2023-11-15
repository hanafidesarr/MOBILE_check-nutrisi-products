import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalBarcodePage } from './modal-barcode.page';

describe('ModalBarcodePage', () => {
  let component: ModalBarcodePage;
  let fixture: ComponentFixture<ModalBarcodePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ModalBarcodePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
