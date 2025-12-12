export type MessageRole = "user" | "assistant";

export interface Message {
  id: string;
  role: MessageRole;
  content: string;
  timestamp: Date;
}

export interface Conversation {
  id: string;
  title: string;
  messages: Message[];
  createdAt: Date;
  updatedAt: Date;
}

export interface ChatState {
  conversations: Conversation[];
  activeConversationId: string | null;
  isLoading: boolean;
}

export type ChatAction =
  | { type: "ADD_CONVERSATION"; payload: Conversation }
  | { type: "DELETE_CONVERSATION"; payload: string }
  | { type: "SET_ACTIVE_CONVERSATION"; payload: string | null }
  | { type: "ADD_MESSAGE"; payload: { conversationId: string; message: Message } }
  | { type: "UPDATE_CONVERSATION_TITLE"; payload: { id: string; title: string } }
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "LOAD_CONVERSATIONS"; payload: Conversation[] };

