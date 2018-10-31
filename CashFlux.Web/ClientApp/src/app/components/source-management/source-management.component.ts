import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatSort, MatTableDataSource, MatDialog } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import * as SourceActions from '../../redux/actions/source.actions';
import { WarningComponent } from '../warning/warning.component';
import { FluxSource } from "../../redux/models/source.model";
import { selectAllSources } from "../../redux/reducers/source.reducer";
import { AppState } from "../../app.state";

@Component({
  selector: 'app-source-management',
  templateUrl: './source-management.component.html',
  styleUrls: ['./source-management.component.css']
})
export class SourceManagementComponent implements OnInit, OnDestroy {
  @ViewChild(MatSort) sort: MatSort;

  // Table resources
  readonly displayedColumns = ['select', 'name', 'category', 'timeCreated'];
  dataSource = new MatTableDataSource<FluxSource>();
  selection = new SelectionModel<FluxSource>(true, []);
  sourcesSubscription: Subscription;

  constructor(private _store: Store<AppState>, public dialog: MatDialog) { }

  ngOnInit(): void {
    // Fluxes state
    // Selects fluxes within selected profile and returns them as FluxTableModel.
    this.sourcesSubscription = this._store.select(selectAllSources)
      .subscribe(data => {
        this.dataSource.data = data;
      });

    this.dataSource.sort = this.sort;
  }

  ngOnDestroy(): void {
    this.sourcesSubscription.unsubscribe();
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
    const sourcesToDelete = this.selection.selected.map(source => source.id);
    this._store.dispatch(new SourceActions.RemoveSources(sourcesToDelete));

    // Reset selection model
    this.selection = new SelectionModel<FluxSource>(true, []);
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
