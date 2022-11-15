import { select } from '@angular-redux/store';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { UserTokenPayload } from '../shared/types/auth';
import { WebsocketChat } from './chat.model';
import { ChatWebsocketService } from './chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent implements OnInit, OnDestroy {
  chatForm!: FormGroup;
  @select('user') user!: Observable<UserTokenPayload>;
  userSubscription!: Subscription;
  userEmail!: string;
  chatMessageList = [];

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly chatWebSocketService: ChatWebsocketService
  ) {}
  ngOnDestroy(): void {
    this.chatWebSocketService.closeWebSocketConnection();
    this.userSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.userSubscription = this.user.subscribe((res) => {
      this.userEmail = res ? res.email : '';
      if (this.userEmail !== '') {
        this.onInit();
      }
    });
    this.chatWebSocketService.openWebsocketConnection();
  }

  onInit = () => {
    this.chatForm = this.formBuilder.group({
      message: ['', [Validators.required]],
    });
  };

  onSubmit = (form: FormGroup) => {
    console.log(form.value);
    const chatMsg = new WebsocketChat(this.userEmail, form.value.message);
    this.chatWebSocketService.sendWebSocketMessage(chatMsg);
    this.chatForm.controls['message'].reset();
  };
}
