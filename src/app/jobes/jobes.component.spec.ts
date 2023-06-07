import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobesComponent } from './jobes.component';

describe('JobesComponent', () => {
  let component: JobesComponent;
  let fixture: ComponentFixture<JobesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
