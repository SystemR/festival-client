import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { DatesPageComponent } from './dates-page.component';

describe('DatesPageComponent', () => {
  let component: DatesPageComponent;
  let fixture: ComponentFixture<DatesPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DatesPageComponent],
      imports: [RouterTestingModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
