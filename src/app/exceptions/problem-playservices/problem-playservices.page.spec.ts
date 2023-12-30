import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProblemPlayservicesPage } from './problem-playservices.page';

describe('ProblemPlayservicesPage', () => {
  let component: ProblemPlayservicesPage;
  let fixture: ComponentFixture<ProblemPlayservicesPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ProblemPlayservicesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
