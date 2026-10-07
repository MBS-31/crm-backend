-- ============================================================================
-- CRM Backend Initial Seed Telemetry Data
-- ============================================================================

INSERT INTO organizations (id, name, plan, active_users, region)
VALUES 
  ('org_abc', 'ABC Technologies Ltd', 'Enterprise Plan', 84, 'India (Mumbai)'),
  ('org_global', 'Global Enterprise Corp', 'Enterprise Plan', 240, 'India (Bengaluru)'),
  ('org_demo', 'Demo Organization', 'Growth Plan', 12, 'India (Delhi)')
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  plan = EXCLUDED.plan,
  active_users = EXCLUDED.active_users,
  region = EXCLUDED.region;

INSERT INTO users (id, organization_id, name, email, role, avatar, title, department)
VALUES 
  ('usr_rahul', 'org_abc', 'Rahul Sharma', 'rahul.sharma@logip.ai', 'SUPER ADMIN', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150', 'VP of Revenue & AI Ops', 'Global Sales Operations')
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  email = EXCLUDED.email,
  role = EXCLUDED.role;

INSERT INTO customers (id, organization_id, name, email, phone, company, arr, health_score, sentiment, churn_risk, health_category, next_best_action, stage, assigned_rep_name, tags)
VALUES
  ('cust_rahul', 'org_abc', 'Rahul Sharma', 'rahul@abctech.in', '+91 98201 44521', 'ABC Technologies', 4800000, 88, 'Positive', 'Low', 'Healthy', 'Propose annual enterprise expansion', 'Active', 'Rahul Sharma', ARRAY['Enterprise', 'SaaS', 'Q3 Renewal']),
  ('cust_2', 'org_abc', 'Priya Patel', 'priya@infoway.com', '+91 98334 11223', 'Infoway Systems', 3200000, 64, 'Neutral', 'Medium', 'Monitor', 'Schedule review for declining usage', 'Expansion', 'Vikram Sen', ARRAY['Mid-Market', 'Fintech']),
  ('cust_3', 'org_abc', 'Amit Desai', 'amit@cloudnexus.io', '+91 98110 99887', 'CloudNexus Labs', 7500000, 41, 'Negative', 'High', 'At Risk', 'Immediate executive sponsor check-in', 'At-Risk', 'Pooja Iyer', ARRAY['Strategic', 'Cloud'])
ON CONFLICT (id) DO UPDATE SET
  arr = EXCLUDED.arr,
  health_score = EXCLUDED.health_score,
  sentiment = EXCLUDED.sentiment,
  churn_risk = EXCLUDED.churn_risk;

INSERT INTO customer_relationships (customer_id, deals_count, emails_count, whatsapp_count, calls_count, tasks_count, documents_count)
VALUES
  ('cust_rahul', 3, 14, 28, 6, 4, 3),
  ('cust_2', 1, 8, 12, 3, 2, 1),
  ('cust_3', 2, 22, 18, 9, 7, 5)
ON CONFLICT (customer_id) DO UPDATE SET
  deals_count = EXCLUDED.deals_count,
  emails_count = EXCLUDED.emails_count,
  whatsapp_count = EXCLUDED.whatsapp_count;

INSERT INTO leads (id, organization_id, name, email, phone, company, title, status, score, tier, fit_weight, engagement_weight, intent_weight, uncontacted_days, value, assigned_to_name, last_activity)
VALUES
  ('lead_priya', 'org_abc', 'Priya Patel', 'priya.patel@tataglobal.com', '+91 98201 11223', 'Tata Global Logistics', 'VP of Technology', 'NEW', 94, 'HOT', 92, 95, 96, 0, 7500000, 'Rahul Sharma', 'Requested SOC2 compliance docs'),
  ('lead_rohit', 'org_abc', 'Rohit Verma', 'rohit.v@hclfintech.in', '+91 98102 33445', 'HCL FinTech Solutions', 'Head of Revenue Ops', 'CONTACTED', 87, 'HOT', 88, 85, 88, 1, 5200000, 'Vikram Sen', 'Attended product demo'),
  ('lead_ananya', 'org_abc', 'Ananya Iyer', 'ananya@zenithcloud.io', '+91 98450 55667', 'Zenith Cloud Networks', 'Director of Engineering', 'QUALIFIED', 78, 'WARM', 80, 75, 80, 2, 3800000, 'Pooja Iyer', 'Pricing breakdown shared')
ON CONFLICT (id) DO UPDATE SET
  score = EXCLUDED.score,
  tier = EXCLUDED.tier,
  value = EXCLUDED.value;

INSERT INTO deals (id, organization_id, customer_id, title, company, customer_name, amount, stage, risk, close_date, probability, owner_name, ai_insight, recommended_action)
VALUES
  ('deal_1', 'org_abc', 'cust_rahul', 'Enterprise AI Automation Suite', 'ABC Technologies', 'Rahul Sharma', 4800000, 'NEGOTIATION', 'LOW', '25 Oct 2026', 85, 'Rahul Sharma', 'High executive engagement; legal review pending.', 'Send closing contract with revised SLA terms.'),
  ('deal_2', 'org_abc', 'cust_2', 'Multi-Tenant Cloud Infrastructure', 'Infoway Systems', 'Priya Patel', 3200000, 'PROPOSAL', 'MEDIUM', '12 Nov 2026', 60, 'Vikram Sen', 'Procurement requested volume discount tier.', 'Schedule call with VP Finance to finalize tier.'),
  ('deal_3', 'org_abc', 'cust_3', 'Global Telecom Routing Gateway', 'CloudNexus Labs', 'Amit Desai', 7500000, 'DISCOVERY', 'HIGH', '30 Dec 2026', 35, 'Pooja Iyer', 'Competitor offering trial sandbox.', 'Offer custom proof-of-concept sprint.')
ON CONFLICT (id) DO UPDATE SET
  amount = EXCLUDED.amount,
  stage = EXCLUDED.stage,
  probability = EXCLUDED.probability;

INSERT INTO radar_items (id, category, title, subtitle, value, risk_level, entity_id, entity_type, action_text)
VALUES
  ('rad_1', 'hot_lead', 'Tata Global Logistics (₹75L)', 'Score 94 • Inbound interest in SOC2 compliance', '₹75,00,000', 'high_positive', 'lead_priya', 'lead', 'Dispatch Priority Follow-up'),
  ('rad_2', 'churn_alert', 'CloudNexus Labs (₹75L ARR)', 'Health dropped to 41 • Last touchpoint > 14 days ago', '₹75,00,000', 'critical', 'cust_3', 'customer', 'Trigger Exec Intervention'),
  ('rad_3', 'at_risk_deal', 'Infoway Systems Migration', 'Procurement stalled on discounting negotiation', '₹32,00,000', 'warning', 'deal_2', 'deal', 'Schedule Finance Alignment')
ON CONFLICT (id) DO NOTHING;

INSERT INTO audit_logs (id, user_name, user_role, action, entity, ip_address, status, details)
VALUES
  ('aud_1', 'Rahul Sharma', 'SUPER ADMIN', 'STAGE_TRANSITION', 'Deal: Enterprise AI Suite', '192.168.1.101', 'success', 'Shifted from PROPOSAL to NEGOTIATION'),
  ('aud_2', 'System AI', 'AI AGENT', 'HEALTH_SCORE_UPDATE', 'Customer: CloudNexus', '127.0.0.1', 'warning', 'Health decayed to 41 due to lack of usage')
ON CONFLICT (id) DO NOTHING;
