import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css'],
})
export class LoaderComponent implements OnInit {
  loader!: Observable<boolean>;

  constructor(private readonly store: Store<any>) {}

  ngOnInit(): void {
    this.loader = this.store.select((state) => state.loader.isOn);
  }
}
