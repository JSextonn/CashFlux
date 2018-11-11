import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatSort, MatTableDataSource } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import * as SourceActions from '../../redux/actions/source.actions';
import { WarningComponent } from '../warning/warning.component';
import { FluxSource, selectAllSources } from "../../redux/reducers/source.reducer";
import { AppState } from "../../redux/app.state";
import { selectAuthentication } from "../../redux/reducers/authentication.reducer";

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

  userId: string;
  authenticationSubscription: Subscription;

  constructor(private store: Store<AppState>, public dialog: MatDialog) { }

  ngOnInit(): void {
    // Fluxes state
    // Selects fluxes within selected profile and returns them as FluxTableModel.
    this.sourcesSubscription = this.store.select(selectAllSources)
      .subscribe(data => {
        this.dataSource.data = data;
      });

    // Authentication state
    // Needed in order to access the user id to send source delete requests.
    this.authenticationSubscription = this.store.select(selectAuthentication)
      .subscribe(data => {
        this.userId = data.userId;
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
    const sourcesToDelete = this.selection.selected;
    this.store.dispatch(new SourceActions.RemoveSources({
      cloudModel: {
        userId: this.userId,
        sourceIds: sourcesToDelete.map(source => source.cloudId)
      },
      reduxIds: sourcesToDelete.map(source => source.id)
    }));

    // Reset selection model
    this.selection = new SelectionModel<FluxSource>(true, []);
  }

  openWarningDialog(): void {
    const dialogRef = this.dialog.open(WarningComponent, {
      height: '210px',
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
