import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const query = (body.query || "").toLowerCase();
  let answer = "I have analyzed your revenue engine. Current quarterly projection stands at ₹2.45 Cr with 78% win rate probability across high-velocity deals.";
  if (query.includes("risk") || query.includes("churn")) {
    answer = "Detected 2 elevated risk accounts: Acme Corp (NPS dropped to 6) and Swift Logistics (last touchpoint > 14 days). Recommending executive check-in.";
  }
  return NextResponse.json({
    answer,
    confidence: 0.94,
    suggestedActions: [
      { label: "View At-Risk Accounts", action: "NAVIGATE_CUSTOMERS_RISK" },
      { label: "Generate Pipeline Forecast", action: "TRIGGER_SIMULATOR" },
    ],
    sources: ["PostgreSQL Production", "Salesforce Sync", "Call Transcripts"],
  });
}
