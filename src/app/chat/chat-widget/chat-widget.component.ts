import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  ViewChild,
  inject,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { finalize } from 'rxjs';
import { ChatService } from '../chat.service';
import { ChatMessage } from '../models/chat-message.model';

@Component({
  selector: 'app-chat-widget',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './chat-widget.component.html',
  styleUrl: './chat-widget.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatWidgetComponent {
  @ViewChild('messageInput') private readonly messageInput?: ElementRef<HTMLInputElement>;

  private readonly chatService = inject(ChatService);
  private readonly changeDetectorRef = inject(ChangeDetectorRef);

  isOpen = false;
  isWaitingForResponse = false;
  draftMessage = '';
  messages: ChatMessage[] = [
    {
      id: 1,
      role: 'assistant',
      content: 'Hi. I can help with book recommendations and reading ideas.',
    },
  ];

  toggleChat(): void {
    this.isOpen = !this.isOpen;

    if (this.isOpen) {
      setTimeout(() => this.messageInput?.nativeElement.focus());
    }
  }

  closeChat(): void {
    this.isOpen = false;
  }

  sendMessage(): void {
    const content = this.draftMessage.trim();

    if (!content || this.isWaitingForResponse) {
      return;
    }

    this.messages = [
      ...this.messages,
      {
        id: Date.now(),
        role: 'user',
        content,
      },
    ];
    this.draftMessage = '';
    this.isWaitingForResponse = true;

    this.chatService
      .sendMessage(content)
      .pipe(
        finalize(() => {
          this.isWaitingForResponse = false;
          this.changeDetectorRef.markForCheck();
          setTimeout(() => this.messageInput?.nativeElement.focus());
        }),
      )
      .subscribe((response) => {
        this.messages = [
          ...this.messages,
          {
            id: Date.now() + 1,
            role: 'assistant',
            content: response.message,
          },
        ];
      });
  }
}
