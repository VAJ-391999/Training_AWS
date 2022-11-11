import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import {
  from,
  interval,
  of,
  Subscription,
  map,
  concatAll,
  concatMap,
  Observable,
  Subject,
  BehaviorSubject,
  ReplaySubject,
} from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth.service';
import { UserTokenPayload } from 'src/app/shared/types/auth';
import { ChartComponent } from './chart/chart.component';

export enum SubjectType {
  BEHAVIOR_SUBJECT = 'behaviorSubject',
  REPLAY_SUBJECT = 'replaySubject',
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit, OnDestroy, AfterViewInit {
  recentLoggedInUsersSubscription!: Subscription;
  recentLoggedInUserList: UserTokenPayload[] = [];
  videoStream: string[] = [];
  value!: number;
  power!: number;
  message: Observable<string> = of('Tina');
  chartTitle: string = '';
  userListSub!: any;
  userList: any[] = [];
  // @ViewChild('chart1') chart!: ElementRef;
  @ViewChildren(ChartComponent) chartList!: QueryList<ChartComponent>;

  users = [
    { id: 1, name: 'A' },
    { id: 2, name: 'B' },
    { id: 3, name: 'C' },
  ];

  constructor(private readonly authService: AuthService) {}
  ngAfterViewInit(): void {
    this.chartList.forEach((chart) => {
      console.log(chart);
    });
  }

  ngOnDestroy(): void {
    this.recentLoggedInUsersSubscription.unsubscribe();
  }

  ngOnInit(): void {
    const intervalData = interval(1000);
    const intervalDataSubscription = intervalData.subscribe((res) => {
      this.videoStream.push(`Video ${res}`);
    });
    setTimeout(() => {
      intervalDataSubscription.unsubscribe();
    }, 2000);
    this.recentLoggedInUsersSubscription =
      this.authService.recentLoggedInUser.subscribe({
        next: (res) => {
          console.log('Recent logged in user', res);
          this.recentLoggedInUserList.push(res);
        },
        complete: () => {
          console.log('complete');
        },
      });

    this.concatMapExample();
  }

  concatMapExample = () => {
    const source = from(['Tech', 'Comedy', 'News']);

    source.pipe(concatMap((res) => this.getData(res))).subscribe((data) => {
      console.log('DAta with concatAll', data);
    });
  };

  getData = (channelName: any) => {
    return of(channelName);
  };

  refresh = () => {
    this.users = [
      { id: 1, name: 'A' },
      { id: 2, name: 'B' },
      { id: 4, name: 'D' },
    ];
  };

  trackByUser = (index: number, item: any) => {
    return item.id;
  };

  changeSubject = (value: string) => {
    switch (value) {
      // @ts-ignore
      case SubjectType.BEHAVIOR_SUBJECT:
        console.log('behaviorSubject');
        const userListSubject = new BehaviorSubject<
          { id: number; name: string }[]
        >([]);
        userListSubject.next(this.users);
        userListSubject.subscribe((res) => {
          console.log(res);
          this.userList = res;
        });
      case SubjectType.REPLAY_SUBJECT:
        console.log('replaySubject');
        const userListReplaySubject = new ReplaySubject<{
          id: number;
          name: string;
        }>(2);
        this.users.forEach((user) => {
          userListReplaySubject.next(user);
        });
        userListReplaySubject.subscribe((res) => {
          console.log(res);
          // this.userList = res;
          this.userList.push(res);
        });
    }
  };
}
