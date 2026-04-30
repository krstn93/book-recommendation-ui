import { Injectable } from '@angular/core';
import { Observable, delay, of } from 'rxjs';

export interface ChatCompletionResponse {
  message: string;
}

const MockAgentResponses = [
  'I can help you find your next book. Tell me a genre, mood, or author you like.',
  'That sounds like a good reading direction. I would start by narrowing it by pace and tone.',
  'I am not connected to the recommendation Agent yet, but I can still help shape your request.',
  'Try asking for books by theme, reading level, favorite author, or how much time you have.',
  'Once the Agent integration is ready, this chat will send your message to the completion service.',
];

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  sendMessage(message: string): Observable<ChatCompletionResponse> {
    const response = this.getMockResponse(message);
    const latency = 500 + Math.floor(Math.random() * 650);

    return of({ message: response }).pipe(delay(latency));
  }

  private getMockResponse(message: string): string {
    const normalizedMessage = message.trim().toLowerCase();

    if (normalizedMessage.includes('recommend')) {
      return 'I can recommend books once the Agent is connected. For now, try adding a genre or author so the request is ready for the backend.';
    }

    if (normalizedMessage.includes('hello') || normalizedMessage.includes('hi')) {
      return 'Hi. Ask me for book ideas, reading lists, or help narrowing down what to read next.';
    }

    const index = Math.floor(Math.random() * MockAgentResponses.length);

    return MockAgentResponses[index];
  }
}
