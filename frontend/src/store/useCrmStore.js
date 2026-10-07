import { create } from 'zustand';

export const useCrmStore = create((set, get) => ({
  // Navigation & View
  activeTab: 'dashboard',
  setActiveTab: (tab) => set({ activeTab: tab, isCopilotOpen: false }),

  // Multi-Tenant Org
  currentOrg: 'Acme Enterprise Corp',
  setOrg: (org) => set({ currentOrg: org }),
  availableOrgs: ['Acme Enterprise Corp', 'Apex Global Technologies', 'Stark Industries Local'],

  // 5-Tier RBAC Role
  currentRole: 'super_admin',
  setRole: (role) => set({ currentRole: role }),

  // Demo Mode
  demoMode: true,
  toggleDemoMode: () => set((state) => ({ demoMode: !state.demoMode })),

  // Modals & Drawers
  isCopilotOpen: false,
  setCopilotOpen: (open) => set({ isCopilotOpen: open }),
  isSearchOpen: false,
  setSearchOpen: (open) => set({ isSearchOpen: open }),
  isDialerOpen: false,
  setDialerOpen: (open) => set({ isDialerOpen: open }),
  isBenchmarkOpen: false,
  setBenchmarkOpen: (open) => set({ isBenchmarkOpen: open }),

  // Active Customer for Customer 360 View
  activeCustomerId: 'cust-1',
  setActiveCustomer: (id) => set({ activeCustomerId: id, activeTab: 'customer360', isCopilotOpen: false }),

  // Selected Lead for Lead Intelligence
  activeLeadId: 'lead-1',
  setActiveLead: (id) => set({ activeLeadId: id, activeTab: 'leads', isCopilotOpen: false }),

  // Global Notifications Count
  notificationsCount: 5,
  securityAlertsCount: 2,

  // Global Search Query
  searchQuery: '',
  setSearchQuery: (q) => set({ searchQuery: q }),

  // Copilot messages
  copilotMessages: [
    {
      id: 'msg-1',
      sender: 'ai',
      text: "Hello Margaret! I'm your CRM Intelligence Copilot. You have 4 deals at risk, 7 high-value leads requiring contact today, and 2 churn alerts. How can I assist you?",
      timestamp: '10:00 AM',
      actions: ['Review At-Risk Deals', 'Check Hot Leads', 'Summarize Customer 360 for Rahul'],
    },
  ],
  addCopilotMessage: (msg) =>
    set((state) => ({
      copilotMessages: [...state.copilotMessages, { id: `msg-${Date.now()}`, ...msg }],
    })),
}));
