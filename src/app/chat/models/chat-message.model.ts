export type ChatMessageRole = 'assistant' | 'user';

export interface ChatMessage {
  id: number;
  role: ChatMessageRole;
  content: string;
}
