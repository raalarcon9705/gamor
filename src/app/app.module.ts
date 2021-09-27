import { APP_INITIALIZER, NgModule, Provider } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireModule } from '@angular/fire/compat';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from '@environment';
import { AuthService } from './services/auth.service';
import { skip } from 'rxjs/operators';

const appInitializerFactory = (auth: AuthService) => () =>
  new Promise<void>((resolve) => {
    auth.user$.pipe(skip(1)).subscribe(() => resolve());
  });

const APP_INITIALIZER_PROVIDERS: Provider[] = [
  {
    provide: APP_INITIALIZER,
    useFactory: appInitializerFactory,
    deps: [AuthService],
    multi: true,
  },
];

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
  ],
  providers: [...APP_INITIALIZER_PROVIDERS],
  bootstrap: [AppComponent],
})
export class AppModule {}
