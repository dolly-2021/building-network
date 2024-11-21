import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import { User } from '../../model/user';
import { MatDialog } from '@angular/material/dialog';
import { SearchDialogComponent } from '../search-dialog/search-dialog.component';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotificationService } from '../../service/notification.service';
import { HttpErrorResponse } from '@angular/common/http';
import { SnackbarComponent } from '../snackbar/snackbar.component';
import { AppConstants } from '../../shared/app-constant';
import { Notification } from '../../model/notification';
import { PostDialogComponent } from '../post-dialog/post-dialog.component';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  authUser!: User;
	isUserLoggedIn: boolean = false;
  defaultProfilePhotoUrl = environment.defaultProfilePhotoUrl;
  hasUnseenNotification: boolean = false;
  private subscriptions: Subscription[] = [];
  notifications: Notification[] = [];
  hasMoreNotifications: boolean = false;
  resultPage: number = 1;
	resultSize: number = 5;
	fetchingResult: boolean = false;

  constructor(private matDialog: MatDialog,
    private notificationService: NotificationService,
		private matSnackbar: MatSnackBar,
    private authService: AuthService
  ) {}

 
  ngOnInit(): void {
    if(this.authService.isUserLoggedIn){
      this.isUserLoggedIn = true;
      this.authUser = this.authService.getAuthUserFromCache();
    }
    else {
      this.isUserLoggedIn = false;
    }

    if (this.isUserLoggedIn) {
			this.loadNotifications(1);
		}

    this.authService.logoutSubject.subscribe(loggedOut => {
			if (loggedOut) {
				this.isUserLoggedIn = false;
			}
		});

		this.authService.loginSubject.subscribe(loggedInUser => {
			if (loggedInUser) {
				this.authUser = loggedInUser;
				this.isUserLoggedIn = true;
			}
		});

    
  }

  openSearchDialog(): void {
    this.matDialog.open(SearchDialogComponent, {
			autoFocus: true,
			width: '500px'
		});
  }

  handleUnseenNotifications(): void {
		if (this.hasUnseenNotification) {
			this.subscriptions.push(
				this.notificationService.markAllSeen().subscribe({
					next: (response: any) => {
						this.hasUnseenNotification = false;
					},
					error: (errorResponse: HttpErrorResponse) => {
						this.matSnackbar.openFromComponent(SnackbarComponent, {
							data: AppConstants.snackbarErrorContent,
							panelClass: ['bg-danger'],
							duration: 5000
						});
					}
				})
			);
		}
	}

  loadNotifications(page: number): void {
		this.fetchingResult = true;

		this.subscriptions.push(
			this.notificationService.getNotifications(page,  this.resultSize).subscribe({
				next: (notifications: any) => {
					this.fetchingResult = false;

					notifications.forEach(n => {
						this.notifications.push(n);
						if (!n.isSeen) this.hasUnseenNotification = true;
					});

					if (notifications.length > 0) {
						this.hasMoreNotifications = true;
					} else {
						this.hasMoreNotifications = false;
					}

					this.resultPage++;
				},
				error: (errorResponse: HttpErrorResponse) => {
					this.matSnackbar.openFromComponent(SnackbarComponent, {
						data: AppConstants.snackbarErrorContent,
						panelClass: ['bg-danger'],
						duration: 5000
					});
					this.fetchingResult = false;
				}
			})
		);
	}

  openPostDialog(): void {
		this.matDialog.open(PostDialogComponent, {
			data: null,
			autoFocus: false,
			minWidth: '500px',
			maxWidth: '700px'
		});
	}

}
