import { create } from 'zustand';

export type RoleType = 'SUPER_ADMIN' | 'ADMIN' | 'MANAGER' | 'SALES_EXECUTIVE' | 'SUPPORT_USER';
export type ChannelType = 'ALL' | 'EMAIL' | 'WHATSAPP' | 'VOICE' | 'SMS';

interface LandingState {
  mobileNavOpen: boolean;
  setMobileNavOpen: (open: boolean) => void;
  activeRbacRole: RoleType;
  setActiveRbacRole: (role: RoleType) => void;
  activeChannel: ChannelType;
  setActiveChannel: (channel: ChannelType) => void;
  deployCopied: boolean;
  setDeployCopied: (copied: boolean) => void;
  demoModalOpen: boolean;
  setDemoModalOpen: (open: boolean) => void;
}

export const useLandingStore = create<LandingState>((set) => ({
  mobileNavOpen: false,
  setMobileNavOpen: (open) => set({ mobileNavOpen: open }),
  activeRbacRole: 'MANAGER',
  setActiveRbacRole: (role) => set({ activeRbacRole: role }),
  activeChannel: 'ALL',
  setActiveChannel: (channel) => set({ activeChannel: channel }),
  deployCopied: false,
  setDeployCopied: (copied) => set({ deployCopied: copied }),
  demoModalOpen: false,
  setDemoModalOpen: (open) => set({ demoModalOpen: open }),
}));
