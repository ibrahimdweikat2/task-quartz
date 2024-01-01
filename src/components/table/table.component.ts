import { SelectionModel } from '@angular/cdk/collections';
import { DecimalPipe, TitleCasePipe } from '@angular/common';
import { Component, TrackByFunction, computed, effect, signal,OnInit,ChangeDetectorRef, Input, SimpleChanges, OnChanges } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { radixCaretSort, radixChevronDown, radixDotsHorizontal } from '@ng-icons/radix-icons';
import { HlmButtonModule } from '@spartan-ng/ui-button-helm';
import { BrnCheckboxComponent } from '@spartan-ng/ui-checkbox-brain';
import { HlmCheckboxCheckIconComponent, HlmCheckboxDirective } from '@spartan-ng/ui-checkbox-helm';
import { HlmIconComponent, provideIcons } from '@spartan-ng/ui-icon-helm';
import { HlmInputDirective } from '@spartan-ng/ui-input-helm';
import { BrnMenuTriggerDirective } from '@spartan-ng/ui-menu-brain';
import { HlmMenuModule } from '@spartan-ng/ui-menu-helm';
import { BrnTableModule, PaginatorState, useBrnColumnManager } from '@spartan-ng/ui-table-brain';
import { HlmTableModule } from '@spartan-ng/ui-table-helm';
import { debounceTime, map } from 'rxjs';
import { IndexDBService } from '../../shared/service/index-db.service';
import {RouterLink } from '@angular/router';

export type Table={
  id:number;
  firstName:string;
  lastName:string;
  finalName:string;
  Age:number;
}



@Component({
  selector: 'table',
  standalone: true,
  imports: [
    FormsModule,

    BrnMenuTriggerDirective,
    HlmMenuModule,

    BrnTableModule,
    HlmTableModule,

    HlmButtonModule,

    DecimalPipe,
    TitleCasePipe,
    HlmIconComponent,
    HlmInputDirective,

    BrnCheckboxComponent,
    HlmCheckboxCheckIconComponent,
    HlmCheckboxDirective,
    RouterLink,
  ],
  providers: [provideIcons({ radixChevronDown, radixDotsHorizontal, radixCaretSort }),IndexDBService],
  host: {
    class: 'w-full',
  },
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})
export class TableComponent implements OnChanges{
  @Input() data:Table[]=[];
  private Data:Table[]=[];

  constructor(private indexDB:IndexDBService) {
    // needed to sync the debounced filter to the name filter, but being able to override the
    // filter when loading new users without debounce
    effect(() => this._emailFilter.set(this._debouncedFilter() ?? ''), { allowSignalWrites: true });
  }
  ngOnChanges(changes: SimpleChanges): void {
    if ('data' in changes) {
      this.Data = [...this.data];

      this._Table=signal([...this.Data])
    }else{
      this._Table=signal([...this.Data])
    }
  }

  async deleteElementById(id:number){
    await this.indexDB.deleteItemById(id);
    this.Data=this.Data.filter((data:Table)=> data.id !== id);
    this._Table.set([...this.Data]);
    // this.data=[...this.Data]
    // this.router.navigateByUrl('/',{skipLocationChange:true}).then(() => {
    //   this.router.navigate(['/']);
    // });
  }

  protected readonly _rawFilterInput = signal('');
  protected readonly _emailFilter = signal('');
  private readonly _debouncedFilter = toSignal(toObservable(this._rawFilterInput).pipe(debounceTime(300)));

  private readonly _displayedIndices = signal({ start: 0, end: 0 });
  protected readonly _availablePageSizes = [5, 10, 20, 10000];
  protected readonly _pageSize = signal(this._availablePageSizes[0]);

  private readonly _selectionModel = new SelectionModel<Table>(true);
  protected readonly _isPaymentSelected = (payment: Table) => this._selectionModel.isSelected(payment);
  protected readonly _selected = toSignal(this._selectionModel.changed.pipe(map((change) => change.source.selected)), {
    initialValue: [],
  });

  protected readonly _brnColumnManager = useBrnColumnManager({
    id:true,
    firstName: true,
    lastName: true,
    finalName: true,
    Age:true,
  });
  protected readonly _allDisplayedColumns = computed(() => [
    'select',
    ...this._brnColumnManager.displayedColumns(),
    'actions',
  ]);

  get TableData() : Table[] {
      return [
        ...this.Data
      ]
  }
  private  _Table = signal([...this.TableData]);
  private readonly _filteredPayments = computed(() => {
    const emailFilter = this._emailFilter()?.trim()?.toLowerCase();
    if (emailFilter && emailFilter.length > 0) {
      return this._Table().filter((u) => u.finalName.toLowerCase().includes(emailFilter));
    }
    return this._Table();
  });
  private readonly _emailSort = signal<'ASC' | 'DESC' | null>(null);
  protected readonly _filteredSortedPaginatedPayments = computed(() => {
    const sort = this._emailSort();
    const start = this._displayedIndices().start;
    const end = this._displayedIndices().end + 1;
    const payments = this._filteredPayments();
    if (!sort) {
      return payments.slice(start, end);
    }
    return [...payments]
      .sort((p1, p2) => (sort === 'ASC' ? 1 : -1) * p1.finalName.localeCompare(p2.finalName))
      .slice(start, end);
  });
  protected readonly _allFilteredPaginatedPaymentsSelected = computed(() =>
    this._filteredSortedPaginatedPayments().every((payment:Table) => this._selected().includes(payment)),
  );
  protected readonly _checkboxState = computed(() => {
    const noneSelected = this._selected().length === 0;
    const allSelectedOrIndeterminate = this._allFilteredPaginatedPaymentsSelected() ? true : 'indeterminate';
    return noneSelected ? false : allSelectedOrIndeterminate;
  });

  protected readonly _trackBy: TrackByFunction<Table> = (_: number, p: Table) => p.id;
  protected readonly _totalElements = computed(() => this._filteredPayments().length);
  protected readonly _onStateChange = ({ startIndex, endIndex }: PaginatorState) =>
    this._displayedIndices.set({ start: startIndex, end: endIndex });



  protected togglePayment(payment: Table) {
    this._selectionModel.toggle(payment);
  }

  protected handleHeaderCheckboxChange() {
    const previousCbState = this._checkboxState();
    if (previousCbState === 'indeterminate' || !previousCbState) {
      this._selectionModel.select(...this._filteredSortedPaginatedPayments());
    } else {
      this._selectionModel.deselect(...this._filteredSortedPaginatedPayments());
    }
  }

  protected handleEmailSortChange() {
    const sort = this._emailSort();
    if (sort === 'ASC') {
      this._emailSort.set('DESC');
    } else if (sort === 'DESC') {
      this._emailSort.set(null);
    } else {
      this._emailSort.set('ASC');
    }
  }
}
