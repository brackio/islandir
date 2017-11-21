import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'ilr-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {
  private _position: string;
  @Input() messageType: string;
  @Input() action: string;
  @Input() icon: string;
  @Input() title: string;
  @Input() message: string;
  @Input() actionName: string;
  @Input()
  set position(position: string) {
    this._position = position || 'left';
  }

  get position(): string { return this._position; }

  constructor() { }

  ngOnInit() {
  }

}
