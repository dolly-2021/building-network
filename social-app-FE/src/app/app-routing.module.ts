import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './component/profile/profile.component';
import { SignupComponent } from './component/signup/signup.component';
import { LoginComponent } from './component/login/login.component';
import { LogoutComponent } from './component/logout/logout.component';
import { TimelineComponent } from './component/timeline/timeline.component';
import { ForgotPasswordDialogComponent } from './component/forgot-password-dialog/forgot-password-dialog.component';

const routes: Routes = [
	{ path: '', component: TimelineComponent },
	{ path: 'posts/tags/:tagName', component: TimelineComponent },
	{ path: 'profile', component: ProfileComponent },
	{ path: 'users/:userId', component: ProfileComponent },
	{ path: 'signup', component: SignupComponent },
	{ path: 'login', component: LoginComponent },
	{ path: 'logout', component: LogoutComponent }
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
