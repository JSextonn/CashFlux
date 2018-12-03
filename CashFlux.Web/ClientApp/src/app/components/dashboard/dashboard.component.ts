import { Component, AfterViewInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { Chart } from 'chart.js';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { FluxTableModel, selectFluxTableModels } from "../../redux/reducers/flux.reducer";
import { AppState } from "../../redux/app.state";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements AfterViewInit, OnDestroy {
  comparisonChart: Chart;
  categoryChart: Chart;
  totalCashChart: Chart;

  private fluxesSubscription: Subscription;

  constructor(private _store: Store<AppState>, private cdr: ChangeDetectorRef) { }

  ngAfterViewInit() {
    // Initialize charts
    this.buildComparisonChart();
    this.buildTotalCashChart();
    this.buildCategoryChart();

    // Populate charts with data and rerender on data change.
    this.fluxesSubscription = this._store.select(selectFluxTableModels).subscribe((fluxes: FluxTableModel[]) => {
      // Flux comparison and total cash charts
      const fluxGroupByDate = this.groupFluxesByDate(fluxes);

      this.updateComparisonChart(fluxGroupByDate);
      this.updateTotalCashChart(fluxGroupByDate);

      // Category summary chart
      const fluxGroupByCategory = this.groupFluxesByCategory(fluxes);
      this.updateCategoryChart(fluxGroupByCategory);
    });

    this.cdr.detectChanges();
  }

  ngOnDestroy(): void {
    this.fluxesSubscription.unsubscribe();
  }

  private buildComparisonChart(): void {
    this.comparisonChart = new Chart('comparisonCanvas', {
      type: 'bar',
      data: {
        labels: [],
        datasets: [{
          type: 'line',
          label: 'Total',
          fill: false,
          backgroundColor: 'blue',
          borderColor: 'blue',
          data: [],
        }, {
          type: 'bar',
          label: 'In Fluxes',
          backgroundColor: 'green',
          borderColor: 'green',
          data: [],
          fill: false,
        }, {
          type: 'bar',
          label: 'Out Fluxes',
          fill: false,
          backgroundColor: 'red',
          borderColor: 'red',
          data: [],
        }]
      },
      options: {
        title: {
          display: true,
          text: 'Flux Summary',
          fontSize: 24
        },
        tooltips: {
          mode: 'index',
          intersect: false
        },
        hover: {
          mode: 'nearest',
          intersect: true
        },
        scales: {
          xAxes: [{
            display: true,
            scaleLabel: {
              display: true,
              labelString: 'Date'
            }
          }],
          yAxes: [{
            display: true,
            scaleLabel: {
              display: true,
              labelString: 'Amount'
            }
          }]
        }
      }
    });
  }

  private updateComparisonChart(fluxGroupByDate: Map<string, FluxAmountGroup>): void {
    this.comparisonChart.data.labels = Array.from(fluxGroupByDate.keys());

    // Cash total dataset
    this.comparisonChart.data.datasets[0].data = DashboardComponent.getRollingCashTotal(Array.from(fluxGroupByDate.values()));

    // Influx dataset
    this.comparisonChart.data.datasets[1].data =
      Array.from(fluxGroupByDate.values())
        .map(value => value.inFluxSum);

    // Outflux dataset
    this.comparisonChart.data.datasets[2].data =
      Array.from(fluxGroupByDate.values())
        .map(value => value.outFluxSum)
        .map(sum => Math.abs(sum));

    this.comparisonChart.update();
  }

  private buildTotalCashChart(): void {
    this.totalCashChart = new Chart('totalCashCanvas', {
      type: 'line',
      data: {
        labels: [],
        datasets: [{
          type: 'line',
          label: 'Total Cash',
          fill: false,
          backgroundColor: 'blue',
          borderColor: 'blue',
          data: [],
        }]
      },
      options: {
        title: {
          display: true,
          text: 'Total Cash Summary',
          fontSize: 24
        },
        tooltips: {
          mode: 'index',
          intersect: false
        },
        hover: {
          mode: 'nearest',
          intersect: true
        },
        scales: {
          xAxes: [{
            display: true,
            scaleLabel: {
              display: true,
              labelString: 'Date'
            }
          }],
          yAxes: [{
            display: true,
            scaleLabel: {
              display: true,
              labelString: 'Amount'
            }
          }]
        }
      }
    });
  }

  private updateTotalCashChart(fluxGroupByDate: Map<string, FluxAmountGroup>): void {
    this.totalCashChart.data.labels = Array.from(fluxGroupByDate.keys());
    this.totalCashChart.data.datasets[0].data = DashboardComponent.getRollingCashTotal(Array.from(fluxGroupByDate.values()));
    this.totalCashChart.update();
  }

  private buildCategoryChart(): void {
    this.categoryChart = new Chart('categoryCanvas', {
      type: 'pie',
      data: {
        datasets: [{
          data: [],
          backgroundColor: [],
          label: 'Flux Categories'
        }],
        labels: []
      },
      options: {
        title: {
          display: true,
          text: 'Category Summary',
          fontSize: 24
        },
        responsive: true
      },
    });
  }

  private updateCategoryChart(fluxGroupByCategory: Map<string, FluxAmountGroup>): void {
    this.categoryChart.data.labels = Array.from(fluxGroupByCategory.keys());

    // Summation of categories
    this.categoryChart.data.datasets[0].data =
      Array.from(fluxGroupByCategory.values())
        .map(value => value.fluxSumDifference);

    // Background color assignment
    for (let i = 0; i < this.categoryChart.data.datasets[0].data.length; i++) {
      this.categoryChart.data.datasets[0].backgroundColor[i] =
        this.categoryChart.data.datasets[0].data[i] >= 0 ? 'green' : 'red';
    }

    this.categoryChart.update();
  }

  private groupFluxesByCategory(fluxes: FluxTableModel[]): Map<string, FluxAmountGroup> {
    const group = new Map<string, FluxAmountGroup>();

    fluxes.forEach(flux => {
      if (group.has(flux.category)) {
        group.get(flux.category).addFlux(flux.amount);
      } else {
        group.set(flux.category, new FluxAmountGroup(flux.amount));
      }
    });

    return group;
  }

  /**
   * Group fluxes by date they occur and the value of the flux amount.
   *
   * @param fluxes The fluxes that will be grouped.
   * @returns Map<string, FluxAmountFluxAmountGroup> The grouped fluxes by date.
   */
  private groupFluxesByDate(fluxes: FluxTableModel[]): Map<string, FluxAmountGroup> {
    const group = new Map<string, FluxAmountGroup>();

    fluxes.forEach((flux: FluxTableModel) => {
      const localDateString = flux.timeCreated.toLocaleDateString('en', {
        year: 'numeric', month: 'short', day: 'numeric'
      });

      if (group.has(localDateString)) {
        group.get(localDateString).addFlux(flux.amount);
      } else {
        group.set(localDateString, new FluxAmountGroup(flux.amount));
      }
    });

    return group;
  }

  private static getRollingCashTotal(groups: FluxAmountGroup[]): number[] {
    const rollingTotals = [];

    if (groups.length === 0) {
      return rollingTotals;
    }

    rollingTotals.push(groups[0].fluxSumDifference);
    for (let i = 1; i < groups.length; i++) {
      rollingTotals.push(rollingTotals[i - 1] + groups[i].fluxSumDifference);
    }

    return rollingTotals;
  }
}

// Used to group in and out fluxes by a fluxes amount real value.
class FluxAmountGroup {
  private _inFluxes: number[] = [];
  private _outFluxes: number[] = [];

  constructor(...amounts: number[]) {
    amounts.forEach(amount => this.addFlux(amount));
  }

  get inFluxes(): number[] {
    return this._inFluxes;
  }

  get outFluxes(): number[] {
    return this._outFluxes;
  }

  get inFluxSum(): number {
    return this._inFluxes.length > 0 ? this._inFluxes.reduce((a, c) => a + c) : 0;
  }

  get outFluxSum(): number {
    return this._outFluxes.length > 0 ? this._outFluxes.reduce((a, c) => a + c) : 0;
  }

  get fluxSumDifference(): number {
    return this.inFluxSum + this.outFluxSum;
  }

  addFlux(amount: number): void {
    if (amount >= 0) {
      this._inFluxes.push(amount);
    } else {
      this._outFluxes.push(amount);
    }
  }
}
