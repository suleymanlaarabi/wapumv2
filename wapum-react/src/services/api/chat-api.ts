import { BACKEND_API_URL } from "../../data/dev.variable";
import {
  CreateConversationResponse,
  GetConversationMessagesResponse,
  GetConversationsResponse,
  SendChatResponse,
} from "../../wapum-types/chat/Response";
import { fetchWithAuth } from "./auth-api";

export const createConversation = async (recipientId: string) => {
  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  const response = await fetchWithAuth(
    BACKEND_API_URL + "chat/create-conversation",
    {
      method: "POST",
      headers,
      body: JSON.stringify({ recipientId }),
    }
  );
  const data = await response.json();
  if (!response.ok) throw new Error(data.message);
  return data as CreateConversationResponse;
};

export const getConversations = async () => {
  const response = await fetchWithAuth(
    BACKEND_API_URL + "chat/get-conversations"
  );
  const data = await response.json();
  if (!response.ok) throw new Error(data.message);
  return data as GetConversationsResponse;
};

export const getConversationChats = async (
  conversationId: string,
  page: number
): Promise<GetConversationMessagesResponse> => {
  const response = await fetchWithAuth(
    BACKEND_API_URL + "chat/get-conversation/" + conversationId + "/" + page
  );
  const data = await response.json();
  if (!response.ok) throw new Error(data.message);
  return data;
};

export const sendChat = async (
  conversationId: string,
  content: string
): Promise<SendChatResponse> => {
  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  const response = await fetchWithAuth(
    BACKEND_API_URL + "chat/send-chat/" + conversationId,
    {
      method: "POST",
      headers,
      body: JSON.stringify({ content }),
    }
  );
  const data = await response.json();
  if (!response.ok) throw new Error(data.message);
  return data;
};
