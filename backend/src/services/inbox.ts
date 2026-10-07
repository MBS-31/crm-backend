import { apiFetch } from "./apiClient";
import { mockConversations } from "@/data/mockData";
import { Conversation, ChatMessage } from "@/types";

export const inboxService = {
  getConversations: async (channel?: string): Promise<Conversation[]> => {
    const list = channel && channel !== "all"
      ? mockConversations.filter((c) => c.channel === channel)
      : mockConversations;
    return apiFetch<Conversation[]>("/inbox/conversations", {}, list);
  },
  sendMessage: async (
    conversationId: string,
    content: string,
    channel: string
  ): Promise<ChatMessage> => {
    const newMsg: ChatMessage = {
      id: `msg_${Date.now()}`,
      channel: channel as any,
      sender: "rep",
      senderName: "Rahul Sharma",
      content,
      timestamp: "Just now",
      status: "delivered",
    };
    return apiFetch<ChatMessage>(
      `/inbox/conversations/${conversationId}/messages`,
      { method: "POST", body: JSON.stringify({ content, channel }) },
      newMsg
    );
  },
  generateAIDraft: async (context: string, tone = "professional"): Promise<string> => {
    return apiFetch<{ draft: string }>(
      "/inbox/ai-draft",
      { method: "POST", body: JSON.stringify({ context, tone }) },
      {
        draft: `Dear Rahul,\n\nFollowing our call earlier today, I have conferred with our leadership team regarding your 250 enterprise seats at ABC Technologies. We would be delighted to offer a 2-year commitment at a 12% executive discount, which will also bundle our Autonomous AI Agent automation workflows.\n\nPlease find the updated pricing schedule and SLA terms attached. Let me know if you would like a brief sync with our CFO this Thursday.\n\nWarm regards,\nRahul Sharma\nVP of Revenue & AI Ops | LOGIP`,
      }
    ).then((res) => res.draft);
  },
};
