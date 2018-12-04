import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatSort, MatTableDataSource } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import * as FluxActions from '../../redux/actions/flux.actions';
import { WarningComponent } from '../warning/warning.component';
import { FluxTableModel, selectFluxTableModels } from "../../redux/reducers/flux.reducer";
import { AppState } from "../../redux/app.state";

@Component({
  selector: 'app-flux-table',
  templateUrl: './flux-table.component.html',
  styleUrls: ['./flux-table.component.css']
})
export class FluxTableComponent implements OnInit, OnDestroy {
  @ViewChild(MatSort) sort: MatSort;

  // Table resources
  readonly displayedColumns = ['select', 'amount', 'source', 'category', 'timeOccurred'];
  dataSource = new MatTableDataSource<FluxTableModel>();
  selection = new SelectionModel<FluxTableModel>(true, []);
  fluxesSubscription: Subscription;

  constructor(private _store: Store<AppState>, public dialog: MatDialog) { }

  ngOnInit(): void {
    // Fluxes state
    // Selects fluxes within selected profile and returns them as FluxTableModel.
    this.fluxesSubscription = this._store.select(selectFluxTableModels)
      .subscribe(data => {
        this.dataSource.data = data;
      });

    this.dataSource.sort = this.sort;
  }

  ngOnDestroy(): void {
    this.fluxesSubscription.unsubscribe();
  }

  applyFilter(filterValue: string): void {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  /**
   * Returns true if all rows are selected
   */
  isAllSelected(): boolean {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /**
   * Selects all rows if they are not all selected; otherwise clear selection.
   */
  masterToggle(): void {
    this.isAllSelected() ?
      this.selection.clear() :
      // Only select filtered data inorder to only select the data
      // that is currently visible
      this.dataSource.filteredData.forEach(row => this.selection.select(row));
  }

  /**
   * Remove selected items from store.
   * Clears selection model.
   */
  removeSelectedRows(): void {
    // Delete local fluxes
    const localFluxIdsToDelete = this.selection.selected.map(flux => flux.id);
    this._store.dispatch(new FluxActions.RemoveLocalFluxes(localFluxIdsToDelete));

    // Delete cloud fluxes
    const cloudFluxIdsToDelete = this.selection.selected.map(flux => flux.cloudId);
    this._store.dispatch(new FluxActions.RemoveCloudFluxes(cloudFluxIdsToDelete));

    // Reset selection model
    this.selection = new SelectionModel<FluxTableModel>(true, []);
  }

  openWarningDialog(): void {
    const dialogRef = this.dialog.open(WarningComponent, {
      height: '200px',
      autoFocus: true,
      data: {
        message: 'Are you sure you want to do this?'
      }
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result === true) {
        this.removeSelectedRows();
      }
    });
  }
}
