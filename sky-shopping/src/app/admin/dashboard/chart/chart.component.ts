import { Component, OnInit } from '@angular/core';
import * as memoizee from 'memoizee';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css'],
})
export class ChartComponent implements OnInit {
  framework: string = 'Angular';
  count: number = 0;

  constructor() {}

  ngOnInit(): void {}

  getTitle = memoizee((framework: string) => {
    console.log('Get Title');
    return framework.toUpperCase();
  });

  changeFramework = () => {
    if (this.framework === 'Angular') {
      this.framework = 'React';
    } else {
      this.framework = 'Angular';
    }
  };

  increaseCount = () => {
    this.count++;
  };
}
