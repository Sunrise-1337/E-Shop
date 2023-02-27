import { EventEmitter, OnInit, Output } from '@angular/core';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { FilterValues } from 'src/app/interfaces/filterValues';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-filtering',
  templateUrl: './filtering.component.html',
  styleUrls: ['./filtering.component.scss']
})
export class FilteringComponent implements OnInit {
  categories$!: Observable<string[]>;
  minValue: number = 0;
  maxValue: number = 1000;
  currentCategory: string = '';
  @Output() sendInfo: EventEmitter<FilterValues> = new EventEmitter();

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.categories$ = this.api.getCategories()
  }

  updateRequest(): void {
    this.sendInfo.emit({
      minValue: this.minValue,
      maxValue: this.maxValue,
      category: this.currentCategory,
    })
  }
}

