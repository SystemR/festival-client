import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SafePipe } from '../../pipes/safe.pipe';
import { YouTubeComponent } from './you-tube.component';

describe('YouTubeComponent', () => {
  let component: YouTubeComponent;
  let fixture: ComponentFixture<YouTubeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [YouTubeComponent, SafePipe]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YouTubeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
