import {
  ApplicationConfig,
  importProvidersFrom,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { FormsModule } from '@angular/forms';
import { provideHttpClient } from '@angular/common/http';
import { MAT_DATE_LOCALE } from '@angular/material/core';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
    provideHttpClient(),
    importProvidersFrom(
      FormsModule
      // InMemoryWebApiModule.forRoot(TodoDataServer, { delay: 1000 })
    ),
    provideRouter(routes),
  ],
};
