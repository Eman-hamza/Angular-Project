import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotifyHireComponent } from './notify-hire.component';

describe('NotifyHireComponent', () => {
  let component: NotifyHireComponent;
  let fixture: ComponentFixture<NotifyHireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotifyHireComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotifyHireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
