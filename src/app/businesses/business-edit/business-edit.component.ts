import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ilr-business-edit',
  templateUrl: './business-edit.component.html',
  styleUrls: ['./business-edit.component.scss']
})
export class BusinessEditComponent implements OnInit {
  public navLinks = [
    {
      label: 'Edit Info',
      path: './',
      icon: 'store',
      options: {exact: true}
    },
    {
      label: 'Manage',
      path: 'manage',
      icon: 'account_circle',
      options: {exact: false}
    },
    {
      label: 'Photos',
      path: 'photos',
      icon: 'photo_library',
      options: {exact: false}
    },
    {
      label: 'Reviews',
      path: 'reviews',
      icon: 'chat',
      options: {exact: false}
    }
  ];


  constructor() { }

  ngOnInit() {
  }
}
