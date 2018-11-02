import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, Validators, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FluxSource } from "../../redux/reducers/source.reducer";

@Component({
  selector: 'app-source-creation',
  templateUrl: './source-creation.component.html',
  styleUrls: ['./source-creation.component.css']
})
export class SourceCreationComponent implements OnInit {

  nameForm: FormControl;
  categoryForm: FormControl;

  sources: FluxSource[];
  ignoreCase: boolean;
  errorMessage: string;

  constructor(
    public dialogRef: MatDialogRef<SourceCreationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.sources = this.data.sources ? this.data.sources : [];
    this.ignoreCase = this.data.ignoreCase ? this.data.ignoreCase : false;

    this.initializeControls();
  }

  initializeControls(): void {
    this.nameForm = new FormControl('', [Validators.required]);
    this.categoryForm = new FormControl('', [Validators.required, this._categoryUniqueToSource.bind(this)]);
  }

  create(): void {
    if (!this.nameForm.valid || !this.categoryForm.valid) {
      return;
    }

    const source: FluxSource = {
      name: this.nameForm.value,
      category: this.categoryForm.value,
      timeCreated: new Date()
    };

    this.dialogRef.close(source);

  }

  cancel(): void {
    this.dialogRef.close();
  }

  private _categoryUniqueToSource(control: AbstractControl): { [key: string]: boolean } | null {
    const length = this.sources.filter(source => {
      return source.name === this.nameForm.value && source.category === control.value;
    }).length;

    if (length !== 0) {
      return { 'notUnique': true };
    }

    return null;
  }
}
