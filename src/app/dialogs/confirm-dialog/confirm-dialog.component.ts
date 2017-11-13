import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'ilr-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent implements OnInit {
  public title: string;
  public message: string;
  public actionCancel: string;
  public actionConfirm: string;

  constructor(public dialogRef: MatDialogRef<ConfirmDialogComponent>) {}

  ngOnInit() {
  }

}
