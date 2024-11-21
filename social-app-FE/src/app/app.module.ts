import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './component/header/header.component';
import { LoginComponent } from './component/login/login.component';
import { SignupComponent } from './component/signup/signup.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {MatToolbarModule} from '@angular/material/toolbar';
import { ProfileComponent } from './component/profile/profile.component';
import { TimelineComponent } from './component/timeline/timeline.component';
import { LogoutComponent } from './component/logout/logout.component';
import { SettingsComponent } from './component/settings/settings.component';
import { MessageComponent } from './component/message/message.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatChipsModule } from '@angular/material/chips';
import { MatBadgeModule } from '@angular/material/badge';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatRippleModule, MAT_DATE_FORMATS } from '@angular/material/core';
import { MatTabsModule } from '@angular/material/tabs';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { SnackbarComponent } from './component/snackbar/snackbar.component';
import { HttpClientModule } from '@angular/common/http';
import { ForgotPasswordDialogComponent } from './component/forgot-password-dialog/forgot-password-dialog.component';
import { PostDialogComponent } from './component/post-dialog/post-dialog.component';
//import { MatMomentDateModule } from "@angular/material-moment-adapter";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    SignupComponent,
    ProfileComponent,
    TimelineComponent,
    LogoutComponent,
    SettingsComponent,
    MessageComponent,
    SnackbarComponent,
    ForgotPasswordDialogComponent,
    PostDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,   
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
		ReactiveFormsModule,
    MatToolbarModule,
		MatIconModule,
		MatButtonModule,
		MatMenuModule,
		MatCardModule,
		MatInputModule,
		MatFormFieldModule,
		MatProgressBarModule,
    MatProgressSpinnerModule,
    MatDividerModule,
		MatListModule,
		MatTooltipModule,
		MatChipsModule,
		MatBadgeModule,
		MatDialogModule,
		MatSnackBarModule,
		MatRippleModule,
		MatTabsModule,
		MatSelectModule,
		MatRadioModule,
		MatDatepickerModule,
		MatNativeDateModule
  ],
  providers: [
    provideAnimationsAsync()
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
