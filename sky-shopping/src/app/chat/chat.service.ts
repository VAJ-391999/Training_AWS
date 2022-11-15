import { Injectable } from '@angular/core';
import { WebsocketChat } from './chat.model';

@Injectable()
export class ChatWebsocketService {
  websocket!: WebSocket;
  websocketMessage: WebsocketChat[] = [];

  constructor() {}

  openWebsocketConnection = () => {
    console.log('openWebsocketConnection');
    this.websocket = new WebSocket('ws://localhost:4001');

    this.websocket.onopen = (e) => {
      console.log('onopen', e);
    };

    this.websocket.onmessage = (e) => {
      console.log('onmessage', e);
      const chatMsg = JSON.parse(e.data);
      this.websocketMessage.push(chatMsg);
    };

    this.websocket.onclose = (e) => {
      console.log('onclose', e);
    };
  };

  sendWebSocketMessage = (chatMsg: WebsocketChat) => {
    this.websocket.send(JSON.stringify(chatMsg));
    console.log('ChatMessage list', this.websocketMessage);
  };

  closeWebSocketConnection = () => {
    this.websocket.close();
  };
}
