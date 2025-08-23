import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';
import { provideNzIcons } from 'ng-zorro-antd/icon';
import {
  UserOutline,
  MailOutline,
  IdcardOutline,
  CalendarOutline,
  EnvironmentOutline,
  VerifiedOutline,
  SearchOutline,
  SettingOutline,
  MenuOutline,
  FileSearchOutline,
} from '@ant-design/icons-angular/icons';

import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { environment } from '../../environments/environment';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimations(),
    provideHttpClient(),
    provideNzIcons([
      UserOutline,
      MailOutline,
      IdcardOutline,
      CalendarOutline,
      EnvironmentOutline,
      VerifiedOutline,
      SearchOutline,
      SettingOutline,
      MenuOutline,
      FileSearchOutline,
    ]),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
  ],
};
