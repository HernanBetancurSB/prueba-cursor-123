"use client";

import { useReducer, useEffect, useCallback } from "react";
import { v4 as uuidv4 } from "uuid";
import { ChatState, ChatAction, Conversation, Message } from "@/types";
import { saveConversations, loadConversations } from "@/utils/storage";
import { generateAIResponse, generateConversationTitle } from "@/utils/aiResponses";

const initialState: ChatState = {
  conversations: [],
  activeConversationId: null,
  isLoading: false,
};

const chatReducer = (state: ChatState, action: ChatAction): ChatState => {
  switch (action.type) {
    case "ADD_CONVERSATION":
      return {
        ...state,
        conversations: [action.payload, ...state.conversations],
        activeConversationId: action.payload.id,
      };

    case "DELETE_CONVERSATION": {
      const filteredConversations = state.conversations.filter(
        (conv) => conv.id !== action.payload
      );
      const newActiveId =
        state.activeConversationId === action.payload
          ? filteredConversations[0]?.id || null
          : state.activeConversationId;

      return {
        ...state,
        conversations: filteredConversations,
        activeConversationId: newActiveId,
      };
    }

    case "SET_ACTIVE_CONVERSATION":
      return {
        ...state,
        activeConversationId: action.payload,
      };

    case "ADD_MESSAGE": {
      const { conversationId, message } = action.payload;
      return {
        ...state,
        conversations: state.conversations.map((conv) =>
          conv.id === conversationId
            ? {
                ...conv,
                messages: [...conv.messages, message],
                updatedAt: new Date(),
              }
            : conv
        ),
      };
    }

    case "UPDATE_CONVERSATION_TITLE":
      return {
        ...state,
        conversations: state.conversations.map((conv) =>
          conv.id === action.payload.id
            ? { ...conv, title: action.payload.title }
            : conv
        ),
      };

    case "SET_LOADING":
      return {
        ...state,
        isLoading: action.payload,
      };

    case "LOAD_CONVERSATIONS":
      return {
        ...state,
        conversations: action.payload,
        activeConversationId: action.payload[0]?.id || null,
      };

    default:
      return state;
  }
};

export const useChat = () => {
  const [state, dispatch] = useReducer(chatReducer, initialState);

  // Cargar conversaciones desde localStorage al inicio
  useEffect(() => {
    const stored = loadConversations();
    if (stored.length > 0) {
      dispatch({ type: "LOAD_CONVERSATIONS", payload: stored });
    }
  }, []);

  // Guardar conversaciones cuando cambien
  useEffect(() => {
    if (state.conversations.length > 0) {
      saveConversations(state.conversations);
    }
  }, [state.conversations]);

  const activeConversation = state.conversations.find(
    (conv) => conv.id === state.activeConversationId
  );

  const createConversation = useCallback((): string => {
    const newConversation: Conversation = {
      id: uuidv4(),
      title: "Nueva conversación",
      messages: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    dispatch({ type: "ADD_CONVERSATION", payload: newConversation });
    return newConversation.id;
  }, []);

  const deleteConversation = useCallback((id: string): void => {
    dispatch({ type: "DELETE_CONVERSATION", payload: id });
  }, []);

  const setActiveConversation = useCallback((id: string | null): void => {
    dispatch({ type: "SET_ACTIVE_CONVERSATION", payload: id });
  }, []);

  const sendMessage = useCallback(
    async (content: string): Promise<void> => {
      if (!content.trim()) return;

      let conversationId = state.activeConversationId;

      // Si no hay conversación activa, crear una nueva
      if (!conversationId) {
        const newConversation: Conversation = {
          id: uuidv4(),
          title: generateConversationTitle(content),
          messages: [],
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        dispatch({ type: "ADD_CONVERSATION", payload: newConversation });
        conversationId = newConversation.id;
      }

      // Agregar mensaje del usuario
      const userMessage: Message = {
        id: uuidv4(),
        role: "user",
        content: content.trim(),
        timestamp: new Date(),
      };

      dispatch({
        type: "ADD_MESSAGE",
        payload: { conversationId, message: userMessage },
      });

      // Actualizar título si es el primer mensaje
      const currentConversation = state.conversations.find(
        (conv) => conv.id === conversationId
      );
      if (currentConversation?.messages.length === 0) {
        dispatch({
          type: "UPDATE_CONVERSATION_TITLE",
          payload: { id: conversationId, title: generateConversationTitle(content) },
        });
      }

      // Simular respuesta de IA
      dispatch({ type: "SET_LOADING", payload: true });

      try {
        const aiResponse = await generateAIResponse(content);

        const assistantMessage: Message = {
          id: uuidv4(),
          role: "assistant",
          content: aiResponse,
          timestamp: new Date(),
        };

        dispatch({
          type: "ADD_MESSAGE",
          payload: { conversationId, message: assistantMessage },
        });
      } finally {
        dispatch({ type: "SET_LOADING", payload: false });
      }
    },
    [state.activeConversationId, state.conversations]
  );

  return {
    conversations: state.conversations,
    activeConversation,
    activeConversationId: state.activeConversationId,
    isLoading: state.isLoading,
    createConversation,
    deleteConversation,
    setActiveConversation,
    sendMessage,
  };
};

