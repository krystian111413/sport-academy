import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

export interface ImageDialogData {
  base64Image: any;
}
@Component({
  selector: 'image-dialog',
  templateUrl: './image-dialog.component.html',
  styleUrls: ['./image-dialog.component.scss']
})
export class ImageDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ImageDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: ImageDialogData) { }

  ngOnInit() {
  }

}
