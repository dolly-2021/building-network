import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import { User } from '../../model/user';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  authUser!: User;
	isUserLoggedIn: boolean = false;
  defaultProfilePhotoUrl = environment.defaultProfilePhotoUrl;

  constructor(private matDialog: MatDialog) {}
 
  ngOnInit(): void {
    
  }

  // openSearchDialog(): void {
  //   this.matDialog.open(SearchDialogComponent, {
	// 		autoFocus: true,
	// 		width: '500px'
	// 	});
  // }

}
