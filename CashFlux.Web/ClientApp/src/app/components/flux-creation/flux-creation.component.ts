import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef, MatSort, MatTableDataSource} from '@angular/material';
import {FormControl, Validators} from '@angular/forms';
import {SelectionModel} from '@angular/cdk/collections';
import { FluxSource } from "../../redux/models/source.model";
import { CashFlux } from "../../redux/models/flux.model";

const AMOUNT_PATTERN = '(-?)(0|([1-9][0-9]*))(\\.[0-9]+)?$';

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

  constructor(
    public dialogRef: MatDialogRef<FluxCreationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit() {
    this.initializeControls();

    // Prepare table
    this.dataSource.data = this.data.sources;
    this.dataSource.sort = this.sort;
  }

  initializeControls(): void {
    this.amount = new FormControl('', [Validators.required, Validators.pattern(AMOUNT_PATTERN)]);
    this.date = new FormControl(new Date(), [Validators.required]);
  }

  applyFilter(filterValue: string): void {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  create(): void {
    if (!this.amount.valid || !this.date.valid || this.selection.selected.length === 0) {
      this.amount.markAsTouched();
      this.date.markAsTouched();
      return;
    }

    const flux: CashFlux = {
      amount: Number(this.amount.value),
      sourceId: this.selection.selected[0].id,
      profileId: this.data.selectedProfile,
      timeCreated: this.date.value
    };
    this.dialogRef.close(flux);
  }

  cancel(): void {
    this.dialogRef.close();
  }
}
