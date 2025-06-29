import { Injectable, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from './confirmation-dialog.component';
import { firstValueFrom } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ConfirmationDialogService {
  private dialog = inject(MatDialog);

  confirm(message: string, title = 'Confirm'): Promise<boolean> {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: { title, message },
      width: '350px',
      disableClose: true,
    });
    return firstValueFrom(dialogRef.afterClosed());
  }
}
