import { NgModule } from '@angular/core';
import { ChatWidgetComponent } from './chat-widget/chat-widget.component';

@NgModule({
  imports: [ChatWidgetComponent],
  exports: [ChatWidgetComponent],
})
export class ChatModule {}
