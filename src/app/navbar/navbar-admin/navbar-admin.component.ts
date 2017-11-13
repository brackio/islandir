import { Component, OnInit } from '@angular/core';
import { SidenavService } from '../../admin/shared/sidenav.service';

@Component({
  selector: 'ilr-navbar-admin',
  templateUrl: './navbar-admin.component.html',
  styleUrls: ['./navbar-admin.component.scss']
})
export class NavbarAdminComponent implements OnInit {

  constructor(
    private sidenavService: SidenavService
  ) { }

  ngOnInit() {
  }

  public toggleSidenav(): void {
    this.sidenavService
      .toggle()
      .then(() => { });
  }

}
