import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { SharedModule } from '../shared/shared.module';
import { ChatRoutingModule } from './chat-routing.module';
import { ChatComponent } from './chat.component';

@NgModule({
  declarations: [ChatComponent],
  imports: [
    ChatRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
  ],
})
export class ChatModule {}
