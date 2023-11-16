import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalNovascoreInfoPage } from './modal-novascore-info.page';

describe('ModalNovascoreInfoPage', () => {
  let component: ModalNovascoreInfoPage;
  let fixture: ComponentFixture<ModalNovascoreInfoPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ModalNovascoreInfoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
