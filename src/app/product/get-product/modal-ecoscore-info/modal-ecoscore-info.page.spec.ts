import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalEcoscoreInfoPage } from './modal-ecoscore-info.page';

describe('ModalEcoscoreInfoPage', () => {
  let component: ModalEcoscoreInfoPage;
  let fixture: ComponentFixture<ModalEcoscoreInfoPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ModalEcoscoreInfoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
