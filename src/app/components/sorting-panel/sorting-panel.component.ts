import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-sorting-panel',
  templateUrl: './sorting-panel.component.html',
  styleUrls: ['./sorting-panel.component.scss']
})
export class SortingPanelComponent {
  @Output() updateSorting: EventEmitter<string> = new EventEmitter();
  @Output() updateAmount: EventEmitter<number> = new EventEmitter();
  displayEls: number =  10;
  sorting: string = 'A-Z'

  changeSorting(name: string): void {
    this.sorting = name
    this.updateSorting.emit(name)
  }

  changeAmountEls(amount: number): void {
    this.displayEls = amount
    this.updateAmount.emit(amount)
  }
}
