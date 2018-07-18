import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule, } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { HttpModule } from '@angular/http';
import { EmailComposer } from '@ionic-native/email-composer';


import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { SignupPage } from '../pages/signup/signup';
import { ForgotPage } from '../pages/forgot/forgot';
import { FirebaseServiceProvider } from '../providers/firebase-service/firebase-service';
import { FIREBASE_CONFIG } from './app.firebase.config';
import { HomepagePage } from '../pages/homepage/homepage';
import { Geolocation } from '@ionic-native/geolocation';
import { Camera } from '@ionic-native/camera';
import { SMS } from '@ionic-native/sms';
import { EmailPage } from '../pages/email/email';
import { FileTransfer } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { DocumentViewer } from '@ionic-native/document-viewer';







@NgModule({
  declarations: [
    MyApp,
    HomePage,
    SignupPage,ForgotPage,
    HomepagePage,EmailPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    AngularFireDatabaseModule,
    
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(FIREBASE_CONFIG)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,SignupPage,ForgotPage,
    HomepagePage,
    EmailPage

  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AngularFireAuth,Geolocation,
    Camera,SMS,EmailComposer,
    File,
    FileTransfer,
    FirebaseServiceProvider,
    DocumentViewer
    
  ]
})
export class AppModule {}
