import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';

@Component({
  selector: 'app-elevent',
  templateUrl: './elevent.component.html',
  styleUrls: ['./elevent.component.scss']
})
export class EleventComponent implements OnInit, OnDestroy {
  @Input()
  link: string;

  @Output()
  load = new EventEmitter<boolean>();

  @ViewChild('eleventIframe')
  eleventIframe;

  eleventIframe$: Subscription;

  constructor() {}

  ngOnInit() {
    this.eleventIframe$ = fromEvent(this.eleventIframe.nativeElement, 'load').subscribe(() => {
      this.load.emit(true);
    });
  }

  ngOnDestroy() {
    this.eleventIframe$.unsubscribe();
  }

  onLoad() {}
}
