import type {
  ActivityEvent,
  DashboardStat,
  DocumentType,
  ExceptionItem,
  ExtractedField,
  InvoiceSummary,
  KpiCard,
  ProcessAction,
  ProcessStep,
  QueueItem,
  TrendPoint,
  ValidationCheck,
  VolumeBreakdown,
} from "@/components/ocr/types";

export const supportedTypes: DocumentType[] = [
  "Vendor Invoice",
  "Payment Advice",
  "Goods Receipt Invoice",
  "Freight Invoice",
];

export const acceptedFormats = ["PDF", "TXT", "JPEG", "PNG"];

export const dashboardStats: DashboardStat[] = [
  { label: "Invoices processed", value: "12,486", detail: "Last 90 days", tone: "default" },
  { label: "Posted to SAP", value: "11,942", detail: "95.6% auto-cleared", tone: "good" },
  { label: "Pending review", value: "318", detail: "Awaiting AP action", tone: "warn" },
  { label: "Average confidence", value: "96.8%", detail: "Header field OCR avg.", tone: "good" },
];

export const kpiCards: KpiCard[] = [
  {
    label: "Total Processed",
    value: "12,486",
    delta: "+8.4%",
    deltaDirection: "up",
    deltaTone: "positive",
    detail: "vs prior 90 days",
  },
  {
    label: "Posted to SAP",
    value: "11,942",
    delta: "+7.1%",
    deltaDirection: "up",
    deltaTone: "positive",
    detail: "95.6% posting rate",
  },
  {
    label: "Pending Review",
    value: "318",
    delta: "\u221212%",
    deltaDirection: "down",
    deltaTone: "positive",
    detail: "vs prior period",
  },
  {
    label: "Exception Queue",
    value: "42",
    delta: "+4",
    deltaDirection: "up",
    deltaTone: "negative",
    detail: "needs attention",
  },
  {
    label: "OCR Accuracy",
    value: "96.8%",
    delta: "+0.3pp",
    deltaDirection: "up",
    deltaTone: "positive",
    detail: "header field avg.",
  },
];

export const throughputTrends: TrendPoint[] = [
  { label: "Jan", processed: 1180, posted: 1098, exceptions: 38 },
  { label: "Feb", processed: 1212, posted: 1154, exceptions: 29 },
  { label: "Mar", processed: 1265, posted: 1209, exceptions: 45 },
  { label: "Apr", processed: 1320, posted: 1261, exceptions: 33 },
  { label: "May", processed: 1388, posted: 1324, exceptions: 41 },
  { label: "Jun", processed: 1476, posted: 1402, exceptions: 42 },
];

export const documentMix: VolumeBreakdown[] = [
  { label: "Vendor Invoices", value: 7428, share: 59 },
  { label: "Goods Receipt", value: 2263, share: 18 },
  { label: "Payment Advice", value: 1684, share: 13 },
  { label: "Freight Invoices", value: 1111, share: 10 },
];

export const exceptionItems: ExceptionItem[] = [
  { issue: "Tax validation failures", count: 14, severity: "critical", action: "Review tax codes in SAP FI" },
  { issue: "Vendor master mismatches", count: 9, severity: "high", action: "Confirm vendor ID mapping" },
  { issue: "Duplicate invoice alerts", count: 11, severity: "high", action: "Cross-check prior postings" },
  { issue: "Missing PO references", count: 8, severity: "medium", action: "Request PO from procurement" },
];

export const recentActivity: ActivityEvent[] = [
  { time: "09:41", event: "Invoice uploaded", document: "INV-2026-00451", status: "info" },
  { time: "09:38", event: "SAP posting successful", document: "INV-2026-00449", status: "success" },
  { time: "09:32", event: "Review completed", document: "INV-2026-00447", status: "success" },
  { time: "09:28", event: "Validation failure", document: "INV-2026-00445", status: "error" },
  { time: "09:21", event: "SAP posting successful", document: "INV-2026-00443", status: "success" },
  { time: "09:15", event: "Low confidence \u2014 flagged", document: "INV-2026-00441", status: "warning" },
  { time: "09:08", event: "SAP posting successful", document: "INV-2026-00439", status: "success" },
  { time: "08:55", event: "Review completed", document: "INV-2026-00437", status: "success" },
];

export const operationalQueues: QueueItem[] = [
  { label: "Validation blockers", count: 42, helper: "Failed tax, vendor, duplicate, or posting-block checks" },
  { label: "Review corrections", count: 113, helper: "Invoices with low-confidence fields" },
  { label: "Ready to post", count: 163, helper: "Validated invoices awaiting SAP posting" },
];

export const stages: ProcessStep[] = [
  { id: "upload", label: "Upload", helper: "Select or drop an invoice file" },
  { id: "extraction", label: "Extract", helper: "OCR field mapping" },
  { id: "review", label: "Review", helper: "Verify extracted values" },
  { id: "validation", label: "Validate", helper: "SAP rules check" },
  { id: "posting", label: "Post", helper: "Submit to SAP" },
];

export const processActions: Record<DocumentType, ProcessAction[]> = {
  "Vendor Invoice": [
    { label: "Use sample vendor invoice", variant: "secondary" },
    { label: "Paste or upload document", variant: "secondary" },
    { label: "Extract invoice fields", variant: "primary" },
  ],
  "Payment Advice": [
    { label: "Use sample payment advice", variant: "secondary" },
    { label: "Paste or upload remittance", variant: "secondary" },
    { label: "Extract payment details", variant: "primary" },
  ],
  "Goods Receipt Invoice": [
    { label: "Use sample GR invoice", variant: "secondary" },
    { label: "Paste or upload GR document", variant: "secondary" },
    { label: "Extract GR-linked fields", variant: "primary" },
  ],
  "Freight Invoice": [
    { label: "Use sample freight invoice", variant: "secondary" },
    { label: "Paste or upload freight bill", variant: "secondary" },
    { label: "Extract logistics charges", variant: "primary" },
  ],
};

export const sampleDocumentText: Record<DocumentType, string> = {
  "Vendor Invoice": `VENDOR INVOICE

Vendor: Global Source Logistics GmbH
Vendor ID: VND-10924
Invoice No: INV-2026-00451
Invoice Date: 2026-06-01
PO No: 4500039281
GRN No: 5000941128
Company Code: DE01

Bill To: Sage Technologies Shared Services

Description            Qty   UOM   Rate      Amount
Freight Handling        1    AU    8,240.00  8,240.00
Warehouse Surcharge     1    AU    7,360.00  7,360.00

Net Amount: 15,600.00
Tax Amount: 1,248.00
Gross Amount: 16,848.00
Currency: EUR`,
  "Payment Advice": `PAYMENT ADVICE

Customer: Northline Industrial Partners
Advice No: PA-2026-00218
Settlement Date: 2026-06-03
Reference Invoice: INV-2026-00451
Paid Amount: 16,848.00
Currency: EUR
Bank Reference: PAY-884201`,
  "Goods Receipt Invoice": `GOODS RECEIPT INVOICE

Supplier: EuroMach Components
Invoice No: GRI-2026-00113
PO No: 4500081212
GRN No: 5000948811
Plant: BER1
Received Qty: 128
Net Amount: 42,540.00
Currency: EUR`,
  "Freight Invoice": `FREIGHT INVOICE

Carrier: SwiftHaul Europe
Invoice No: FR-2026-00088
Shipment Ref: SHP-21093
Route: Hamburg \u2192 Munich
Fuel Surcharge: 620.00
Line Haul: 4,180.00
Gross Amount: 4,800.00
Currency: EUR`,
};

export const extractionFields: ExtractedField[] = [
  { label: "Invoice Number", value: "INV-2026-00451", confidence: 98, required: true },
  { label: "Vendor Name", value: "Global Source Logistics GmbH", confidence: 96, required: true },
  { label: "Vendor ID", value: "VND-10924", confidence: 94, required: true },
  { label: "Invoice Date", value: "2026-06-01", confidence: 97, required: true },
  { label: "Posting Date", value: "2026-06-04", confidence: 95, required: true },
  { label: "PO Number", value: "4500039281", confidence: 92 },
  { label: "GRN Number", value: "5000941128", confidence: 91 },
  { label: "Tax Amount", value: "1,248.00", confidence: 93 },
  { label: "Net Amount", value: "15,600.00", confidence: 97, required: true },
  { label: "Gross Amount", value: "16,848.00", confidence: 98, required: true },
  { label: "Currency", value: "EUR", confidence: 99, required: true },
  { label: "Company Code", value: "DE01", confidence: 95, required: true },
  { label: "Cost Center", value: "OPS-2040", confidence: 88 },
  { label: "Payment Terms", value: "NET30", confidence: 90 },
];

export const validationChecks: ValidationCheck[] = [
  {
    name: "Vendor master lookup",
    status: "passed",
    detail: "Vendor ID matches active SAP vendor master and bank profile.",
  },
  {
    name: "Duplicate invoice detection",
    status: "warning",
    detail: "A similar invoice number exists for the same vendor in the last 90 days; review recommended.",
  },
  {
    name: "PO and goods receipt match",
    status: "passed",
    detail: "PO quantity, GRN receipt, and invoice line totals reconcile within tolerance.",
  },
  {
    name: "Tax code validation",
    status: "passed",
    detail: "Detected tax amount aligns with the assigned SAP tax code for company code DE01.",
  },
  {
    name: "Posting block review",
    status: "failed",
    detail: "Cost center OPS-2040 needs finance approval before posting can continue.",
  },
];

export const invoiceSummary: InvoiceSummary = {
  invoiceNumber: "INV-2026-00451",
  vendorName: "Global Source Logistics GmbH",
  amount: "16,848.00",
  currency: "EUR",
  companyCode: "DE01",
  postingDate: "2026-06-04",
  sapReference: "1900004721",
};
