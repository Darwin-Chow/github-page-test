import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";

export interface DialogData {
  id: number;
  word: string;
}

@Component({
  selector: 'zoomIn-dialog',
  templateUrl: './zoomIn-dialog.html',
  styleUrls: ['./zoomIn-dialog.scss'],
})
export class zoomInDialog {

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) {}


}
