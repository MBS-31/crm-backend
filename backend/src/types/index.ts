export type UserRole =
  | "SUPER ADMIN"
  | "SALES OPS"
  | "MANAGER"
  | "EXECUTIVE"
  | "READONLY";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  title: string;
  department: string;
}

export interface Organization {
  id: string;
  name: string;
  plan: "Enterprise Plan" | "Growth Plan" | "Starter Plan";
  activeUsers: number;
  region: string;
}

export type LeadTier = "HOT" | "WARM" | "COLD";
export type LeadStatus = "NEW" | "CONTACTED" | "QUALIFIED" | "NURTURING" | "UNQUALIFIED";

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  title: string;
  status: LeadStatus;
  score: number; // 0-100
  tier: LeadTier;
  fitWeight: number; // %
  engagementWeight: number; // %
  intentWeight: number; // %
  uncontactedDays: number;
  value: number; // INR
  assignedTo: string;
  lastActivity: string;
  notes?: string;
  industry?: string;
}

export type SentimentType = "Positive" | "Neutral" | "Negative" | "At Risk";
export type ChurnRisk = "Low" | "Medium" | "High" | "Critical";
export type HealthStatus = "Healthy" | "Monitor" | "At Risk" | "Critical";

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  arr: number; // in INR e.g. 4800000 = ₹48L
  healthScore: number; // 0-100
  sentiment: SentimentType;
  churnRisk: ChurnRisk;
  healthCategory: HealthStatus;
  nextBestAction: string;
  stage: "Onboarding" | "Active" | "Expansion" | "At-Risk";
  assignedRep: string;
  joinedDate: string;
  lastContact: string;
  tags: string[];
  relationships?: {
    deals: number;
    emails: number;
    whatsapp: number;
    calls: number;
    tasks: number;
    documents: number;
  };
}

export type DealStage =
  | "DISCOVERY"
  | "PROPOSAL"
  | "NEGOTIATION"
  | "CLOSED WON"
  | "CLOSED LOST";

export type DealRisk = "LOW" | "MEDIUM" | "HIGH";

export interface Deal {
  id: string;
  title: string;
  company: string;
  customerName: string;
  customerId: string;
  amount: number; // INR
  stage: DealStage;
  risk: DealRisk;
  closeDate: string;
  probability: number; // 0 - 100
  owner: string;
  aiInsight: string;
  recommendedAction: string;
  createdAt: string;
}

export interface RadarItem {
  id: string;
  category: "hot_lead" | "at_risk_deal" | "upsell_candidate" | "churn_alert" | "overdue_followup";
  title: string;
  subtitle: string;
  value?: string;
  riskLevel?: "critical" | "warning" | "high_positive" | "info";
  entityId: string;
  entityType: "lead" | "deal" | "customer" | "task";
  actionText: string;
}

export interface RadarMetrics {
  hotLeadsCount: number;
  atRiskDealsCount: number;
  upsellCandidatesCount: number;
  churnAlertsCount: number;
  overdueFollowupsCount: number;
  items: RadarItem[];
}

export type CommChannel = "all" | "whatsapp" | "email" | "sms" | "calls";

export interface ChatMessage {
  id: string;
  channel: "whatsapp" | "email" | "sms" | "call" | "calls";
  sender: "customer" | "rep" | "ai_agent";
  senderName: string;
  content: string;
  timestamp: string;
  status: "sent" | "delivered" | "read";
  attachments?: { name: string; size: string; type: string }[];
}

export interface Conversation {
  id: string;
  contactId: string;
  contactName: string;
  company: string;
  channel: "whatsapp" | "email" | "sms" | "calls";
  lastMessage: string;
  unreadCount: number;
  timestamp: string;
  status: "active" | "waiting" | "resolved";
  messages: ChatMessage[];
}

export interface CallRecording {
  id: string;
  contactName: string;
  customerId: string;
  company: string;
  repName: string;
  duration: number; // in seconds
  timestamp: string;
  audioUrl: string;
  minioKey: string;
  sentiment: "Positive" | "Neutral" | "Negative";
  talkRatio: number; // e.g. 42
  listenRatio: number; // e.g. 58
  silenceCount: number;
  aiSummary: string;
  recommendedNextStep: string;
  transcript: {
    time: string;
    speaker: "Sales Rep" | "Customer";
    text: string;
  }[];
  actionItems: {
    id: string;
    text: string;
    completed: boolean;
  }[];
}

export interface SalesRepCoaching {
  id: string;
  name: string;
  avatar: string;
  quotaPacing: number; // %
  talkRatio: number;
  listenRatio: number;
  objectionHandling: number; // %
  rating: number; // 1-5
  strengths: string[];
  weaknesses: string[];
  coachingRecommendations: string[];
  recentCallsCount: number;
  winRate: number;
}

export interface AIAgentPlanStep {
  stepNumber: number;
  title: string;
  description: string;
  status: "pending" | "running" | "completed" | "failed";
  auditDetail?: string;
}

export interface AIAgentExecution {
  id: string;
  prompt: string;
  status: "planning" | "ready_to_approve" | "executing" | "completed" | "failed";
  planSteps: AIAgentPlanStep[];
  auditLogs: { timestamp: string; message: string; type: "info" | "action" | "success" }[];
  summary?: string;
}

export type WorkflowNodeType = "Trigger" | "Condition" | "AI" | "Action";

export interface WorkflowNode {
  id: string;
  type: WorkflowNodeType;
  title: string;
  description: string;
  config: Record<string, any>;
  x: number;
  y: number;
  status?: "idle" | "running" | "success" | "skipped";
}

export interface WorkflowEdge {
  id: string;
  source: string;
  target: string;
  label?: string;
}

export interface Workflow {
  id: string;
  name: string;
  description: string;
  triggerEvent: string;
  status: "active" | "draft" | "paused";
  nodes: WorkflowNode[];
  edges: WorkflowEdge[];
  lastRun?: string;
  runCount: number;
}

export interface SimulatorInput {
  leadVolume: number;
  conversionRate: number; // e.g. 12 (%)
  avgDealSize: number; // in INR e.g. 500000
}

export interface SimulatorProjection {
  projectedRevenue: number;
  expectedWins: number;
  conversionPercent: number;
  previousRevenue: number;
  deltaPercent: number;
  monthlyProjections: { month: string; projected: number; target: number }[];
}

export interface RolePermissionMatrix {
  resource: string;
  view: boolean;
  create: boolean;
  edit: boolean;
  delete: boolean;
}

export interface AuditLogItem {
  id: string;
  user: string;
  userRole: string;
  action: string;
  entity: string;
  timestamp: string;
  ip: string;
  status: "success" | "warning" | "error";
  details: string;
}

export interface InfraService {
  name: "PostgreSQL" | "Redis" | "MinIO" | "Worker Queue" | "API Gateway" | "AI Inference Core";
  status: "Healthy" | "Degraded" | "Offline";
  latency: string;
  uptime: string;
  memoryUsage: string;
  details: string;
}

export interface StorageMetrics {
  totalStorageBytes: number;
  usedBytes: number;
  callRecordingsBytes: number;
  attachmentsBytes: number;
  callRecordingsCount: number;
  attachmentsCount: number;
  recentUploads: {
    id: string;
    filename: string;
    bucket: string;
    size: string;
    uploadedAt: string;
    key: string;
  }[];
}

export interface CRMNotification {
  id: string;
  title: string;
  description: string;
  type:
    | "new_lead"
    | "deal_risk"
    | "churn_alert"
    | "whatsapp_message"
    | "call_completed"
    | "agent_completed"
    | "workflow_failed"
    | "task_overdue";
  timestamp: string;
  read: boolean;
  actionUrl?: string;
}
