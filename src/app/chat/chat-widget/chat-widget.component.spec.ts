import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { ChatService } from '../chat.service';
import { ChatWidgetComponent } from './chat-widget.component';

describe('ChatWidgetComponent', () => {
  let fixture: ComponentFixture<ChatWidgetComponent>;
  let component: ChatWidgetComponent;
  let chatService: jasmine.SpyObj<ChatService>;

  beforeEach(() => {
    chatService = jasmine.createSpyObj<ChatService>('ChatService', ['sendMessage']);
    chatService.sendMessage.and.returnValue(of({ message: 'Mock response' }));

    TestBed.configureTestingModule({
      imports: [ChatWidgetComponent],
      providers: [
        {
          provide: ChatService,
          useValue: chatService,
        },
      ],
    });

    fixture = TestBed.createComponent(ChatWidgetComponent);
    component = fixture.componentInstance;
  });

  it('adds user and assistant messages when a message is sent', () => {
    component.draftMessage = 'Recommend a mystery book';
    component.sendMessage();

    expect(component.messages).toEqual([
      jasmine.objectContaining({
        role: 'assistant',
      }),
      jasmine.objectContaining({
        role: 'user',
        content: 'Recommend a mystery book',
      }),
      jasmine.objectContaining({
        role: 'assistant',
        content: 'Mock response',
      }),
    ]);
    expect(component.draftMessage).toBe('');
    expect(component.isWaitingForResponse).toBeFalse();
  });
});
