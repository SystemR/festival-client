import { Component, ElementRef, Input, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-you-tube',
  templateUrl: './you-tube.component.html',
  styleUrls: ['./you-tube.component.scss']
})
export class YouTubeComponent implements OnInit, OnDestroy {
  @Input()
  link: string;

  width: number;
  height: number;

  isReady = false;
  windowResize$: Subscription;

  constructor(private el: ElementRef) {}

  ngOnInit() {
    setTimeout(() => {
      this.resize();
      this.setIsReady(true);
    }, 300);

    this.windowResize$ = fromEvent(window, 'resize')
      .pipe(debounceTime(50))
      .subscribe(e => {
        this.setIsReady(false);
        setTimeout(() => {
          this.resize();
          this.setIsReady(true);
        }, 300);
      });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.link && !changes.link.firstChange) {
      this.setIsReady(true);
    }
  }

  ngOnDestroy() {
    this.windowResize$.unsubscribe();
  }

  resize() {
    let width = this.el.nativeElement.clientWidth;
    if (width > 1000) {
      width = 1000;
    }
    this.width = width;
    this.height = width * 0.5583333333;
  }

  private setIsReady(isReady: boolean) {
    if (this.link && this.link.match('you')) {
      this.isReady = isReady;
    } else {
      this.isReady = false;
    }
  }
}
