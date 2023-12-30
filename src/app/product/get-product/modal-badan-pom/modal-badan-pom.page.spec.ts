import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalBadanPomPage } from './modal-badan-pom.page';

describe('ModalBadanPomPage', () => {
  let component: ModalBadanPomPage;
  let fixture: ComponentFixture<ModalBadanPomPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ModalBadanPomPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
