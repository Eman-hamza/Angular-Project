import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProposalsForJobComponent } from './proposals-for-job.component';

describe('ProposalsForJobComponent', () => {
  let component: ProposalsForJobComponent;
  let fixture: ComponentFixture<ProposalsForJobComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProposalsForJobComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProposalsForJobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
