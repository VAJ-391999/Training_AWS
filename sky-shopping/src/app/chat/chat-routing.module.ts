import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { ChatComponent } from './chat.component';

export const chatRoutes: Route[] = [
  {
    path: '',
    component: ChatComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(chatRoutes)],
  exports: [RouterModule],
})
export class ChatRoutingModule {}
