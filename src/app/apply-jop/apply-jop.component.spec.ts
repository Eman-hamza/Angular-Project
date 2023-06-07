import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplyJopComponent } from './apply-jop.component';

describe('ApplyJopComponent', () => {
  let component: ApplyJopComponent;
  let fixture: ComponentFixture<ApplyJopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApplyJopComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplyJopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
