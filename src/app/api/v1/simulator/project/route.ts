import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const discountDelta = body.discountDelta || 0;
  const hiringDelta = body.hiringDelta || 0;
  const baseRevenue = 28500000;
  const projectedRevenue = Math.round(baseRevenue * (1 + (hiringDelta * 0.08) - (discountDelta * 0.005)));
  return NextResponse.json({
    baseRevenue,
    projectedRevenue,
    variancePercent: Math.round(((projectedRevenue - baseRevenue) / baseRevenue) * 100),
    winRateImpactPercent: discountDelta > 0 ? 4.5 : -2.1,
    timelineMonths: ["Month 1", "Month 2", "Month 3", "Month 4", "Month 5", "Month 6"],
    projectedCurve: [28500000, 31000000, 34500000, 38000000, 42000000, projectedRevenue],
    recommendationSummary: "Increasing sales reps by +2 while preserving sub-10% discounting optimizes gross margins and yields fastest payback cycle.",
  });
}
