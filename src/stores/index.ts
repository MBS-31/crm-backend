import { create } from "zustand";
import { User, Organization, CRMNotification, Conversation, ChatMessage } from "@/types";
import { currentUser, organizations, mockNotifications, mockConversations } from "@/data/mockData";

// 1. Auth Store
interface AuthState {
  user: User;
  setUser: (user: User) => void;
}
export const useAuthStore = create<AuthState>((set) => ({
  user: currentUser,
  setUser: (user) => set({ user }),
}));

// 2. Organization Store
interface OrganizationState {
  currentOrg: Organization;
  organizations: Organization[];
  setOrganization: (org: Organization) => void;
}
export const useOrganizationStore = create<OrganizationState>((set) => ({
  currentOrg: organizations[0],
  organizations,
  setOrganization: (currentOrg) => set({ currentOrg }),
}));

// 3. UI Store (Theme, Global search dialog, Softphone modal, Modals)
interface UIState {
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  isSoftphoneOpen: boolean;
  setIsSoftphoneOpen: (open: boolean) => void;
  softphoneContact: { name: string; company: string; phone: string } | null;
  openSoftphoneWith: (contact: { name: string; company: string; phone: string }) => void;
  activeTimeframe: "Today" | "This Week" | "This Month" | "This Quarter" | "Custom";
  setActiveTimeframe: (timeframe: "Today" | "This Week" | "This Month" | "This Quarter" | "Custom") => void;
}
export const useUIStore = create<UIState>((set) => ({
  isSearchOpen: false,
  setIsSearchOpen: (isSearchOpen) => set({ isSearchOpen }),
  isSoftphoneOpen: false,
  setIsSoftphoneOpen: (isSoftphoneOpen) => set({ isSoftphoneOpen }),
  softphoneContact: null,
  openSoftphoneWith: (contact) =>
    set({ isSoftphoneOpen: true, softphoneContact: contact }),
  activeTimeframe: "This Month",
  setActiveTimeframe: (activeTimeframe) => set({ activeTimeframe }),
}));

// 4. Sidebar Store (collapse, mobile drawer)
interface SidebarState {
  isCollapsed: boolean;
  isMobileOpen: boolean;
  toggleCollapse: () => void;
  setMobileOpen: (open: boolean) => void;
}
export const useSidebarStore = create<SidebarState>((set) => ({
  isCollapsed: false,
  isMobileOpen: false,
  toggleCollapse: () => set((state) => ({ isCollapsed: !state.isCollapsed })),
  setMobileOpen: (isMobileOpen) => set({ isMobileOpen }),
}));

// 5. Copilot Store (panel open, messages, streaming status)
export interface CopilotMessage {
  id: string;
  sender: "user" | "copilot";
  text: string;
  timestamp: string;
  suggestedActions?: string[];
  contextEntity?: { type: string; id: string; name: string };
}

interface CopilotState {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  isStreaming: boolean;
  messages: CopilotMessage[];
  addMessage: (msg: CopilotMessage) => void;
  setStreaming: (isStreaming: boolean) => void;
  clearMessages: () => void;
}

export const useCopilotStore = create<CopilotState>((set) => ({
  isOpen: false,
  setIsOpen: (isOpen) => set({ isOpen }),
  isStreaming: false,
  messages: [
    {
      id: "cop_welcome",
      sender: "copilot",
      text: `Hello Rahul 👋 I'm your **LOGIP Customer Intelligence Copilot**.\n\nI can analyze customer dossiers, predict deal risks, audit call transcripts, or run autonomous follow-ups. Ask me anything about your CRM!`,
      timestamp: "Just now",
      suggestedActions: [
        "Tell me about Rahul before I call",
        "Which deals are at critical risk?",
        "Show today's top priorities",
      ],
    },
  ],
  addMessage: (msg) => set((state) => ({ messages: [...state.messages, msg] })),
  setStreaming: (isStreaming) => set({ isStreaming }),
  clearMessages: () => set({ messages: [] }),
}));

// 6. Notification Store
interface NotificationState {
  notifications: CRMNotification[];
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
}
export const useNotificationStore = create<NotificationState>((set) => ({
  notifications: mockNotifications,
  isOpen: false,
  setIsOpen: (isOpen) => set({ isOpen }),
  markAsRead: (id) =>
    set((state) => ({
      notifications: state.notifications.map((n) =>
        n.id === id ? { ...n, read: true } : n
      ),
    })),
  markAllAsRead: () =>
    set((state) => ({
      notifications: state.notifications.map((n) => ({ ...n, read: true })),
    })),
}));

// 7. Communication Store (selected conversation, channel filter)
interface CommunicationState {
  conversations: Conversation[];
  selectedConversationId: string;
  selectedChannel: "all" | "whatsapp" | "email" | "sms" | "calls";
  setSelectedConversationId: (id: string) => void;
  setSelectedChannel: (channel: "all" | "whatsapp" | "email" | "sms" | "calls") => void;
  addMessageToSelected: (msg: ChatMessage) => void;
}
export const useCommunicationStore = create<CommunicationState>((set) => ({
  conversations: mockConversations,
  selectedConversationId: mockConversations[0].id,
  selectedChannel: "all",
  setSelectedConversationId: (selectedConversationId) => set({ selectedConversationId }),
  setSelectedChannel: (selectedChannel) => set({ selectedChannel }),
  addMessageToSelected: (msg) =>
    set((state) => ({
      conversations: state.conversations.map((c) =>
        c.id === state.selectedConversationId
          ? {
              ...c,
              lastMessage: msg.content,
              timestamp: "Just now",
              messages: [...c.messages, msg],
            }
          : c
      ),
    })),
}));

// 8. Workflow Store (active visual canvas selection, simulation state)
interface WorkflowState {
  selectedNodeId: string | null;
  setSelectedNodeId: (id: string | null) => void;
  zoomLevel: number;
  setZoomLevel: (zoom: number) => void;
  isSimulating: boolean;
  setIsSimulating: (simulating: boolean) => void;
}
export const useWorkflowStore = create<WorkflowState>((set) => ({
  selectedNodeId: "node_1",
  setSelectedNodeId: (selectedNodeId) => set({ selectedNodeId }),
  zoomLevel: 100,
  setZoomLevel: (zoomLevel) => set({ zoomLevel }),
  isSimulating: false,
  setIsSimulating: (isSimulating) => set({ isSimulating }),
}));
