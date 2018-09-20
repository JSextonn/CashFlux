import { Component, OnInit, Inject, ViewChild, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatTableDataSource, MatSort } from '@angular/material';
import { FormControl, Validators } from '@angular/forms';
import { FluxSource } from '../models/source.model';
import { CashFlux } from '../models/flux.model';
import { SelectionModel } from '@angular/cdk/collections';
import { Subscription } from 'rxjs';

const AMOUNT_PATTERN = '(-?)(0|([1-9][0-9]*))(\\.[0-9]+)?$';

// TODO: If no sources are given, display informative error message
// instead of flux creation tools.
@Component({
  selector: 'app-flux-creation',
  templateUrl: './flux-creation.component.html',
  styleUrls: ['./flux-creation.component.css']
})
export class FluxCreationComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;

  // Form controls
  amount: FormControl;
  date: FormControl;

  // Table resources
  displayedColumns: string[] = ['select', 'source', 'category'];
  dataSource = new MatTableDataSource<FluxSource>();
  selection = new SelectionModel<FluxSource>(false, []);

  selectedProfile: string;

  constructor(
    public dialogRef: MatDialogRef<FluxCreationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.initializeControls();

    this.dataSource.data = this.data.sources;
    this.dataSource.sort = this.sort;

    this.selectedProfile = this.data.profile;
  }

  initializeControls() {
    this.amount = new FormControl('', [Validators.required, Validators.pattern(AMOUNT_PATTERN)]);
    this.date = new FormControl(new Date(), [Validators.required]);
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  create() {
    if (!this.amount.valid || !this.date.valid || this.selection.selected.length === 0) {
      this.amount.markAsTouched();
      this.date.markAsTouched();
      return;
    }

    const flux: CashFlux = {
      amount: Number(this.amount.value),
      sourceId: this.selection.selected[0].id,
      profileId: this.selectedProfile,
      timeCreated: this.date.value
    };
    this.dialogRef.close(flux);
  }

  cancel() {
    this.dialogRef.close();
  }
}
