export type DocumentType =
  | "Vendor Invoice"
  | "Payment Advice"
  | "Goods Receipt Invoice"
  | "Freight Invoice";

export type WorkflowStage =
  | "upload"
  | "extraction"
  | "review"
  | "validation"
  | "posting";

export type ExtractedField = {
  label: string;
  value: string;
  confidence: number;
  required?: boolean;
};

export type ValidationCheck = {
  name: string;
  status: "passed" | "warning" | "failed";
  detail: string;
};

export type InvoiceSummary = {
  invoiceNumber: string;
  vendorName: string;
  amount: string;
  currency: string;
  companyCode: string;
  postingDate: string;
  sapReference: string;
};

export type DashboardStat = {
  label: string;
  value: string;
  detail: string;
  tone?: "default" | "good" | "warn";
};

export type VolumeBreakdown = {
  label: string;
  value: number;
  share: number;
};

export type TrendPoint = {
  label: string;
  processed: number;
  posted: number;
  exceptions: number;
};

export type QueueItem = {
  label: string;
  count: number;
  helper: string;
};

export type ProcessStep = {
  id: WorkflowStage;
  label: string;
  helper: string;
};

export type ProcessAction = {
  label: string;
  variant?: "primary" | "secondary";
};

export type Severity = "critical" | "high" | "medium" | "low";

export type ExceptionItem = {
  issue: string;
  count: number;
  severity: Severity;
  action: string;
};

export type ActivityEvent = {
  time: string;
  event: string;
  document: string;
  status: "success" | "warning" | "error" | "info";
};

export type KpiCard = {
  label: string;
  value: string;
  delta: string;
  deltaDirection: "up" | "down" | "neutral";
  deltaTone: "positive" | "negative" | "neutral";
  detail: string;
};
