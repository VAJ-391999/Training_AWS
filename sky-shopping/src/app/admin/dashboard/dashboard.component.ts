import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  from,
  interval,
  of,
  Subscription,
  map,
  concatAll,
  concatMap,
} from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth.service';
import { UserTokenPayload } from 'src/app/shared/types/auth';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  recentLoggedInUsersSubscription!: Subscription;
  recentLoggedInUserList: UserTokenPayload[] = [];
  videoStream: string[] = [];

  constructor(private readonly authService: AuthService) {}

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
}
