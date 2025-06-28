import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogContent,
  MatDialogModule,
  MatDialogTitle,
} from '@angular/material/dialog';

@Component({
  selector: 'app-global-error',
  imports: [MatDialogModule, MatDialogContent, MatDialogTitle],
  templateUrl: './global-error.component.html',
  styleUrl: './global-error.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GlobalErrorComponent {
  data = inject(MAT_DIALOG_DATA);
}
