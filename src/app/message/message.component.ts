import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'ilr-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {
  @Input() messageType: string;
  @Input() action: string;
  @Input() icon: string;
  @Input() title: string;
  @Input() message: string;
  @Input() actionName: string;

  constructor() { }

  ngOnInit() {
  }

}
