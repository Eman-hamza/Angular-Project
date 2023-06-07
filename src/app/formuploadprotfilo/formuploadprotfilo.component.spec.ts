import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormuploadprotfiloComponent } from './formuploadprotfilo.component';

describe('FormuploadprotfiloComponent', () => {
  let component: FormuploadprotfiloComponent;
  let fixture: ComponentFixture<FormuploadprotfiloComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormuploadprotfiloComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormuploadprotfiloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
