import { Injectable, Inject, Optional } from "@angular/core";
import { MatSnackBar, MatSnackBarConfig, MAT_SNACK_BAR_DEFAULT_OPTIONS } from "@angular/material";

@Injectable({
  providedIn: 'root'
})
export class SnackBarService {
  constructor(
    private snackBar: MatSnackBar,
    @Optional() @Inject(MAT_SNACK_BAR_DEFAULT_OPTIONS) private matOption: MatSnackBarConfig
  ) { }

  success(message: string, matSnackbarAction?: string) {
    this.showSnackbar(message, 'success-snack-bar', matSnackbarAction);
  }

  error(message: string, matSnackbarAction?: string) {
    this.showSnackbar(message, 'error-snack-bar', matSnackbarAction);
  }

  private showSnackbar(message: string,  customClass: string, matSnackbarAction?: string) {
    let config = new MatSnackBarConfig();
    if (this.matOption) {
      config = { ...this.matOption };
    }
    config.panelClass = [customClass];

    this.snackBar.open(`${message}`, matSnackbarAction, config);
  }
}
