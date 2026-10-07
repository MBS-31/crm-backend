import { apiFetch } from "./apiClient";

export interface CopilotQueryResponse {
  answer: string;
  suggestedActions: string[];
  citations?: { title: string; link: string }[];
  contextEntity?: { type: string; id: string; name: string };
}

export const copilotService = {
  query: async (prompt: string, customerId?: string): Promise<CopilotQueryResponse> => {
    const fallbackAnswer = prompt.toLowerCase().includes("rahul")
      ? `### Customer Dossier: Rahul Sharma (ABC Technologies)
• **Current ARR**: ₹48,00,000 (Healthy, Expansion stage)
• **Relationship Sentiment**: Positive (Health Score 91/100)
• **Key Context**: Rahul reviewed the AI Copilot demo and PostgreSQL data residency compliance yesterday.
• **Critical Objection**: Concerned about per-seat cost scaling for 250 enterprise seats.
• **Recommended Next Step**: Offer a 2-year commitment bundling autonomous AI agents with an executive 12% discount.`
      : prompt.toLowerCase().includes("risk")
      ? `### AI Risk Briefing
• **West Corp India (Rohit Kumar)**: Health score dropped to 42. Uncontacted for 8 days. Competitor threat detected.
• **Apex Digital Cloud (Karan Mehta)**: Critical churn risk (Score 28). Negative sentiment on last 2 calls.
• **Global Tech Expansion Deal (₹85L)**: High closing risk due to 15% competitor discount offer.`
      : `### LOGIP Executive Summary
• **Total ARR**: ₹12.8 Cr (+18.4% YoY)
• **Pipeline Value**: ₹42.6 Cr across 128 active deals
• **Top Priority Today**: Follow up with Rahul Sharma (ABC Technologies) with revised multi-year proposal before 4 PM.`;

    const fallback: CopilotQueryResponse = {
      answer: fallbackAnswer,
      suggestedActions: [
        "Open Customer 360: Rahul Sharma",
        "Draft AI Follow-up Email",
        "View Opportunity Radar",
      ],
      citations: [
        { title: "Call Recording (04:32) - ABC Tech", link: "/calls" },
        { title: "Contract Proposal v2", link: "/deals" },
      ],
      contextEntity: { type: "customer", id: "cust_rahul", name: "Rahul Sharma" },
    };

    return apiFetch<CopilotQueryResponse>(
      "/copilot/query",
      {
        method: "POST",
        body: JSON.stringify({ prompt, customerId }),
      },
      fallback
    );
  },
};
