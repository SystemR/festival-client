import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SafePipe } from '../../pipes/safe.pipe';
import { EleventComponent } from './elevent.component';

describe('EleventComponent', () => {
  let component: EleventComponent;
  let fixture: ComponentFixture<EleventComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EleventComponent, SafePipe]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EleventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
