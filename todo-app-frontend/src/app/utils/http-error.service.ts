import { HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { GlobalErrorComponent } from '../shared/global-error-component/global-error.component';

@Injectable({
  providedIn: 'root',
})
export class HttpErrorService {
  readonly dialog = inject(MatDialog);
  formatError(err: HttpErrorResponse): string {
    return this.httpErrorFormatter(err);
  }

  private httpErrorFormatter(err: HttpErrorResponse): string {
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.statusText}`;
    }
    this.dialog.open(GlobalErrorComponent, {
      data: { errorMessage }, // Pass the error message to the dialog
      width: '400px',
      disableClose: true,
    });
    return errorMessage;
  }
}
