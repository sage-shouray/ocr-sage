"use client";

import { useRef, useState } from "react";
import {
  acceptedFormats,
  documentTypeOptions,
  documentMix,
  exceptionItems,
  extractionFieldSets,
  invoiceSummary,
  kpiCards,
  recentActivity,
  sampleDocumentText,
  stages,
  throughputTrends,
  validationChecks,
} from "@/components/ocr/mock-data";
import type { DocumentType, Severity, TrendPoint, VolumeBreakdown, WorkflowStage } from "@/components/ocr/types";
import {
  AppShell,
  EmptyState,
  FieldGroup,
  IconCalendar,
  IconChevronDown,
  IconDownload,
  IconRefresh,
  KpiCard,
  PageTopBar,
  SectionCard,
  SectionHeader,
  StatusBadge,
  Stepper,
  ValidationChecklist,
  type ViewMode,
} from "@/components/ocr/ui";

/* ─── Helpers ────────────────────────────────────────────────────────────── */

function detectDocumentType(fileName: string): DocumentType {
  const lower = fileName.toLowerCase();
  if (lower.includes("statement") || lower.includes("bank"))
    return "Bank Statement";
  if (lower.includes("payment") || lower.includes("advice") || lower.includes("remittance"))
    return "Payment Advice";
  if (lower.includes("goods") || lower.includes("receipt") || lower.includes("grn"))
    return "Goods Receipt Invoice";
  if (lower.includes("freight") || lower.includes("shipment") || lower.includes("haul"))
    return "Freight Invoice";
  return "Vendor Invoice";
}

/* ─── Throughput Chart ───────────────────────────────────────────────────── */

function ThroughputChart({ data }: { data: TrendPoint[] }) {
  const PAD_L = 44;
  const PAD_R = 16;
  const PAD_T = 12;
  const PAD_B = 28;
  const W = 560;
  const H = 200;

  const plotW = W - PAD_L - PAD_R;
  const plotH = H - PAD_T - PAD_B;

  const maxVal = 1800;
  const ticks = [0, 400, 800, 1200, 1600];
  const groupW = plotW / data.length;
  const BAR_W = 9;
  const BAR_GAP = 4;

  const toY = (v: number) => PAD_T + plotH * (1 - v / maxVal);
  const toH = (v: number) => Math.max(2, plotH * (v / maxVal));

  return (
    <div>
      {/* Legend */}
      <div className="mb-4 flex items-center gap-5">
        <div className="flex items-center gap-1.5">
          <div className="h-2.5 w-2.5 rounded-sm bg-gray-200" />
          <span className="text-xs text-gray-500">Processed</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="h-2.5 w-2.5 rounded-sm bg-blue-600" />
          <span className="text-xs text-gray-500">Posted</span>
        </div>
      </div>
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full" aria-label="Monthly throughput chart">
        {/* Grid lines */}
        {ticks.map((tick) => (
          <line
            key={tick}
            x1={PAD_L}
            y1={toY(tick)}
            x2={W - PAD_R}
            y2={toY(tick)}
            stroke="#F3F4F6"
            strokeWidth={tick === 0 ? 1 : 1}
          />
        ))}
        {/* Y-axis labels */}
        {ticks.filter((t) => t > 0).map((tick) => (
          <text
            key={tick}
            x={PAD_L - 8}
            y={toY(tick) + 4}
            textAnchor="end"
            fontSize={10}
            fill="#9CA3AF"
          >
            {tick >= 1000 ? `${tick / 1000}k` : tick}
          </text>
        ))}
        {/* Bars */}
        {data.map((point, i) => {
          const cx = PAD_L + i * groupW + groupW / 2;
          const processedH = toH(point.processed);
          const postedH = toH(point.posted);
          return (
            <g key={point.label}>
              <rect
                x={cx - BAR_W - BAR_GAP / 2}
                y={toY(point.processed)}
                width={BAR_W}
                height={processedH}
                fill="#E5E7EB"
                rx={2}
              />
              <rect
                x={cx + BAR_GAP / 2}
                y={toY(point.posted)}
                width={BAR_W}
                height={postedH}
                fill="#1D4ED8"
                rx={2}
              />
              <text
                x={cx}
                y={H - 8}
                textAnchor="middle"
                fontSize={10}
                fill="#9CA3AF"
              >
                {point.label}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

/* ─── Invoice Mix Chart ──────────────────────────────────────────────────── */

const MIX_COLORS = ["#1D4ED8", "#0EA5E9", "#10B981", "#F59E0B"];

function InvoiceMixChart({ data }: { data: VolumeBreakdown[] }) {
  return (
    <div>
      {/* Stacked bar */}
      <div className="flex h-2.5 overflow-hidden rounded-full bg-gray-100">
        {data.map((item, i) => (
          <div
            key={item.label}
            style={{ width: `${item.share}%`, backgroundColor: MIX_COLORS[i] }}
          />
        ))}
      </div>
      {/* Breakdown */}
      <div className="mt-4 divide-y divide-gray-100">
        {data.map((item, i) => (
          <div key={item.label} className="flex items-center gap-3 py-2.5">
            <div
              className="h-2 w-2 flex-shrink-0 rounded-full"
              style={{ backgroundColor: MIX_COLORS[i] }}
            />
            <span className="flex-1 text-sm text-gray-700">{item.label}</span>
            <span className="text-sm text-gray-400">{item.value.toLocaleString()}</span>
            <span className="w-9 text-right text-sm font-semibold text-gray-900">{item.share}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Exceptions Table ───────────────────────────────────────────────────── */

const SEVERITY_STYLES: Record<Severity, string> = {
  critical: "bg-red-50 text-red-700 border-red-200",
  high: "bg-orange-50 text-orange-700 border-orange-200",
  medium: "bg-amber-50 text-amber-700 border-amber-200",
  low: "bg-gray-100 text-gray-600 border-gray-200",
};

const SEVERITY_LEFT: Record<Severity, string> = {
  critical: "border-l-2 border-l-red-500",
  high: "border-l-2 border-l-orange-400",
  medium: "border-l-2 border-l-amber-400",
  low: "",
};

function ExceptionsTable() {
  return (
    <div className="overflow-hidden">
      <table className="w-full text-sm" aria-label="Exceptions and bottlenecks">
        <thead>
          <tr className="border-b border-gray-200 bg-gray-50">
            <th className="px-4 py-2.5 text-left text-[11px] font-semibold uppercase tracking-wide text-gray-400">
              Issue
            </th>
            <th className="px-4 py-2.5 text-center text-[11px] font-semibold uppercase tracking-wide text-gray-400">
              Count
            </th>
            <th className="px-4 py-2.5 text-left text-[11px] font-semibold uppercase tracking-wide text-gray-400">
              Severity
            </th>
            <th className="px-4 py-2.5 text-left text-[11px] font-semibold uppercase tracking-wide text-gray-400">
              Recommended Action
            </th>
          </tr>
        </thead>
        <tbody>
          {exceptionItems.map((item) => (
            <tr
              key={item.issue}
              className={`border-b border-gray-100 last:border-0 transition-colors hover:bg-gray-50 ${SEVERITY_LEFT[item.severity]}`}
            >
              <td className="px-4 py-3 font-medium text-gray-900">{item.issue}</td>
              <td className="px-4 py-3 text-center">
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-gray-100 text-xs font-semibold text-gray-700">
                  {item.count}
                </span>
              </td>
              <td className="px-4 py-3">
                <span
                  className={`inline-flex rounded border px-2 py-0.5 text-[11px] font-medium capitalize ${SEVERITY_STYLES[item.severity]}`}
                >
                  {item.severity}
                </span>
              </td>
              <td className="px-4 py-3 text-gray-500">{item.action}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ─── Activity Table ─────────────────────────────────────────────────────── */

const ACTIVITY_DOT: Record<string, string> = {
  success: "bg-green-500",
  warning: "bg-amber-500",
  error: "bg-red-500",
  info: "bg-blue-500",
};

function ActivityTable() {
  return (
    <div className="overflow-hidden">
      <table className="w-full text-sm" aria-label="Recent activity feed">
        <thead>
          <tr className="border-b border-gray-200 bg-gray-50">
            <th className="px-4 py-2.5 text-left text-[11px] font-semibold uppercase tracking-wide text-gray-400">
              Time
            </th>
            <th className="px-4 py-2.5 text-left text-[11px] font-semibold uppercase tracking-wide text-gray-400">
              Event
            </th>
            <th className="px-4 py-2.5 text-left text-[11px] font-semibold uppercase tracking-wide text-gray-400">
              Document
            </th>
            <th className="px-4 py-2.5 text-left text-[11px] font-semibold uppercase tracking-wide text-gray-400">
              Status
            </th>
          </tr>
        </thead>
        <tbody>
          {recentActivity.map((event) => (
            <tr
              key={`${event.time}-${event.document}`}
              className="border-b border-gray-100 last:border-0 transition-colors hover:bg-gray-50"
            >
              <td className="px-4 py-2.5 font-mono text-xs text-gray-400">{event.time}</td>
              <td className="px-4 py-2.5 text-gray-700">{event.event}</td>
              <td className="px-4 py-2.5 font-mono text-xs font-medium text-blue-700">
                {event.document}
              </td>
              <td className="px-4 py-2.5">
                <div className="flex items-center gap-2">
                  <div className={`h-1.5 w-1.5 rounded-full ${ACTIVITY_DOT[event.status]}`} />
                  <span className="text-xs capitalize text-gray-600">{event.status}</span>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ─── Dashboard View ─────────────────────────────────────────────────────── */

function DashboardView() {
  return (
    <>
      <PageTopBar
        title="Invoice Processing"
        subtitle="Monitor processing performance and operational health"
        actions={
          <>
            <button
              type="button"
              className="flex items-center gap-1.5 rounded-md border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-600 shadow-[0_1px_2px_rgba(0,0,0,0.05)] transition-colors hover:bg-gray-50"
              aria-label="Select date range"
            >
              <IconCalendar size={12} />
              Last 90 days
              <IconChevronDown size={10} />
            </button>
            <button
              type="button"
              className="flex items-center gap-1.5 rounded-md border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-600 shadow-[0_1px_2px_rgba(0,0,0,0.05)] transition-colors hover:bg-gray-50"
              aria-label="Export data"
            >
              <IconDownload size={12} />
              Export
            </button>
            <button
              type="button"
              className="flex h-8 w-8 items-center justify-center rounded-md border border-gray-200 bg-white text-gray-400 shadow-[0_1px_2px_rgba(0,0,0,0.05)] transition-colors hover:bg-gray-50 hover:text-gray-600"
              aria-label="Refresh"
            >
              <IconRefresh size={14} />
            </button>
          </>
        }
      />

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-7xl space-y-5 p-6">

          {/* KPI Strip */}
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {kpiCards.map((card) => (
              <KpiCard key={card.label} {...card} />
            ))}
          </div>

          {/* Exceptions & Bottlenecks */}
          <SectionCard noPadding>
            <div className="border-b border-gray-100 px-5 py-4">
              <SectionHeader
                title="Exceptions & Bottlenecks"
                description="Issues requiring AP team attention before posting can proceed"
                action={
                  <StatusBadge label="42 open" tone="error" dot />
                }
              />
            </div>
            <ExceptionsTable />
          </SectionCard>

          {/* Analytics row */}
          <div className="grid gap-5 xl:grid-cols-[1.1fr_0.9fr]">
            {/* Throughput chart */}
            <SectionCard>
              <SectionHeader
                title="Processing Volume"
                description="Monthly invoices processed vs successfully posted to SAP"
              />
              <ThroughputChart data={throughputTrends} />
            </SectionCard>

            {/* Invoice mix */}
            <SectionCard>
              <SectionHeader
                title="Invoice Mix"
                description="Distribution by document type — last 90 days"
              />
              <InvoiceMixChart data={documentMix} />
            </SectionCard>
          </div>

          {/* Recent Activity */}
          <SectionCard noPadding>
            <div className="border-b border-gray-100 px-5 py-4">
              <SectionHeader
                title="Recent Activity"
                description="Live operational events from the AP processing pipeline"
              />
            </div>
            <ActivityTable />
          </SectionCard>

        </div>
      </div>
    </>
  );
}

/* ─── Process View ───────────────────────────────────────────────────────── */

function ProcessView() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadedFileName, setUploadedFileName] = useState<string>("");
  const [detectedType, setDetectedType] = useState<DocumentType | null>(null);
  const [selectedType, setSelectedType] = useState<DocumentType>("Vendor Invoice");
  const [currentStage, setCurrentStage] = useState<WorkflowStage>("upload");
  const [isExtracted, setIsExtracted] = useState(false);
  const [isReviewed, setIsReviewed] = useState(false);
  const [isValidated, setIsValidated] = useState(false);
  const [isPosted, setIsPosted] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(100);

  const canExtract = Boolean(uploadedFileName);
  const canReview = isExtracted && !isReviewed;
  const canValidate = isReviewed && !isValidated;
  const canPost = isValidated && !isPosted;

  const stageStates: Record<WorkflowStage, "done" | "active" | "upcoming"> = {
    upload: uploadedFileName ? "done" : "active",
    extraction: isExtracted ? "done" : currentStage === "extraction" ? "active" : "upcoming",
    review: isReviewed ? "done" : currentStage === "review" ? "active" : "upcoming",
    validation: isValidated ? "done" : currentStage === "validation" ? "active" : "upcoming",
    posting: isPosted ? "done" : currentStage === "posting" ? "active" : "upcoming",
  };

  const activeDocType = detectedType ?? selectedType;
  const previewText = activeDocType
    ? sampleDocumentText[activeDocType]
    : "Upload an invoice document to begin OCR processing.";

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadedFileName(file.name);
    setDetectedType(detectDocumentType(file.name));
    setCurrentStage("upload");
    setIsExtracted(false);
    setIsReviewed(false);
    setIsValidated(false);
    setIsPosted(false);
  }

  function handleExtract() {
    if (!canExtract) return;
    setIsExtracted(true);
    setCurrentStage("review");
  }

  function handleReview() {
    if (!canReview) return;
    setIsReviewed(true);
    setCurrentStage("validation");
  }

  function handleValidate() {
    if (!canValidate) return;
    setIsValidated(true);
    setCurrentStage("posting");
  }

  function handlePost() {
    if (!canPost) return;
    setIsPosted(true);
  }

  function handleReset() {
    setUploadedFileName("");
    setDetectedType(null);
    setCurrentStage("upload");
    setIsExtracted(false);
    setIsReviewed(false);
    setIsValidated(false);
    setIsPosted(false);
    setZoomLevel(100);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  // ── Determine primary CTA ──
  let ctaLabel: string;
  let ctaOnClick: () => void;
  let ctaIsDisabled: boolean;
  let ctaIsProminent: boolean;

  if (!uploadedFileName) {
    ctaLabel = "Run Extraction"; ctaOnClick = () => {}; ctaIsDisabled = true; ctaIsProminent = false;
  } else if (!isExtracted) {
    ctaLabel = "Run Extraction"; ctaOnClick = handleExtract; ctaIsDisabled = false; ctaIsProminent = false;
  } else if (!isReviewed) {
    ctaLabel = "Approve & Continue"; ctaOnClick = handleReview; ctaIsDisabled = false; ctaIsProminent = false;
  } else if (!isValidated) {
    ctaLabel = "Validate in SAP"; ctaOnClick = handleValidate; ctaIsDisabled = false; ctaIsProminent = false;
  } else if (!isPosted) {
    ctaLabel = "Post to SAP"; ctaOnClick = handlePost; ctaIsDisabled = false; ctaIsProminent = true;
  } else {
    ctaLabel = "Process New Invoice"; ctaOnClick = handleReset; ctaIsDisabled = false; ctaIsProminent = false;
  }

  // ── Center panel content (inline render helper, not a component) ──
  function renderCenterPanel() {
    if (!uploadedFileName) {
      return (
        <EmptyState
          onOpenPicker={() => fileInputRef.current?.click()}
          formats={acceptedFormats}
        />
      );
    }

    if (currentStage === "validation" || currentStage === "posting") {
      if (isPosted) {
        return (
          <div className="flex h-full items-center justify-center p-8">
            <div className="w-full max-w-md">
              {/* Success header */}
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 text-green-700">
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 9l4.5 4.5L15 5" />
                  </svg>
                </div>
                <div>
                  <div className="text-base font-semibold text-gray-900">Invoice Posted to SAP</div>
                  <div className="text-xs text-gray-500">Transaction committed successfully</div>
                </div>
              </div>

              {/* Posting details */}
              <div className="overflow-hidden rounded-lg border border-green-200 bg-green-50/50">
                {[
                  { label: "SAP Document Number", value: invoiceSummary.sapReference, mono: true },
                  { label: "Invoice Reference", value: invoiceSummary.invoiceNumber, mono: true },
                  { label: "Vendor", value: invoiceSummary.vendorName, mono: false },
                  { label: "Amount", value: `${invoiceSummary.currency} ${invoiceSummary.amount}`, mono: false },
                  { label: "Company Code", value: invoiceSummary.companyCode, mono: true },
                  { label: "Posting Date", value: "05-Jun-2026", mono: false },
                  { label: "Posted By", value: "System (OCR Automation)", mono: false },
                ].map((row, i, arr) => (
                  <div
                    key={row.label}
                    className={`flex items-center justify-between gap-4 px-4 py-3 ${i < arr.length - 1 ? "border-b border-green-100" : ""}`}
                  >
                    <span className="text-xs text-gray-500">{row.label}</span>
                    <span className={`text-sm font-medium text-gray-900 ${row.mono ? "font-mono" : ""}`}>
                      {row.value}
                    </span>
                  </div>
                ))}
              </div>

              <button
                type="button"
                onClick={handleReset}
                className="mt-5 w-full rounded-md border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
              >
                Process New Invoice
              </button>
            </div>
          </div>
        );
      }

      // Validation stage: show pre-flight checklist
      return (
        <div className="flex h-full flex-col overflow-y-auto p-6">
          <div className="mb-5">
            <div className="text-sm font-semibold text-gray-900">SAP Validation — Pre-flight Checklist</div>
            <div className="mt-0.5 text-xs text-gray-500">
              All checks must pass or be acknowledged before posting can proceed
            </div>
          </div>
          <ValidationChecklist checks={validationChecks} />

          {validationChecks.some((c) => c.status === "failed") && (
            <div className="mt-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3">
              <div className="text-xs font-semibold text-red-700">
                {validationChecks.filter((c) => c.status === "failed").length} blocking issue
                {validationChecks.filter((c) => c.status === "failed").length > 1 ? "s" : ""} detected
              </div>
              <div className="mt-0.5 text-xs text-red-600">
                Resolve all failed checks or obtain override approval before posting.
              </div>
            </div>
          )}
        </div>
      );
    }

    // Default: document preview
    return (
      <div className="flex h-full flex-col">
        {/* Document toolbar */}
        <div className="flex flex-shrink-0 items-center justify-between border-b border-gray-200 bg-white px-4 py-2">
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-400">Zoom:</span>
            <button
              type="button"
              onClick={() => setZoomLevel((z) => Math.max(50, z - 25))}
              className="flex h-6 w-6 items-center justify-center rounded border border-gray-200 text-xs text-gray-600 hover:bg-gray-50"
              aria-label="Zoom out"
            >
              −
            </button>
            <span className="w-10 text-center text-xs font-medium text-gray-700">{zoomLevel}%</span>
            <button
              type="button"
              onClick={() => setZoomLevel((z) => Math.min(200, z + 25))}
              className="flex h-6 w-6 items-center justify-center rounded border border-gray-200 text-xs text-gray-600 hover:bg-gray-50"
              aria-label="Zoom in"
            >
              +
            </button>
          </div>
          <div className="flex items-center gap-2">
            {isExtracted && (
              <StatusBadge label="Extraction complete" tone="success" dot />
            )}
            <span className="rounded border border-gray-200 px-2 py-0.5 text-[10px] font-medium text-gray-500">
              Page 1 / 1
            </span>
          </div>
        </div>

        {/* Document content */}
        <div className="flex-1 overflow-auto bg-gray-50 p-6">
          <div
            className="mx-auto rounded-lg border border-gray-200 bg-white shadow-[0_1px_3px_rgba(0,0,0,0.06)]"
            style={{ maxWidth: `${8 * zoomLevel}px`, minHeight: "480px" }}
          >
            <div className="border-b border-gray-100 px-5 py-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-gray-700">
                  {detectedType ?? "Document Preview"}
                </span>
                <span className="text-[10px] text-gray-400">{uploadedFileName}</span>
              </div>
            </div>
            <pre
              className="overflow-x-auto p-5 font-mono leading-7 text-gray-700 whitespace-pre-wrap"
              style={{ fontSize: `${Math.max(10, 12 * (zoomLevel / 100))}px` }}
            >
              {previewText}
            </pre>
          </div>
        </div>
      </div>
    );
  }

  // ── Right panel: extraction results ──
  const activeFields = extractionFieldSets[activeDocType];
  const fieldByLabel = new Map(activeFields.map((field) => [field.label, field]));
  const vendorFields = [
    {
      label: "Vendor Name",
      value:
        fieldByLabel.get("Vendor Name")?.value ??
        fieldByLabel.get("Supplier Name")?.value ??
        fieldByLabel.get("Customer Name")?.value ??
        fieldByLabel.get("Carrier Name")?.value ??
        "",
      confidence:
        fieldByLabel.get("Vendor Name")?.confidence ??
        fieldByLabel.get("Supplier Name")?.confidence ??
        fieldByLabel.get("Customer Name")?.confidence ??
        fieldByLabel.get("Carrier Name")?.confidence,
    },
    { label: "Vendor ID", value: fieldByLabel.get("Vendor ID")?.value ?? "", confidence: fieldByLabel.get("Vendor ID")?.confidence },
    { label: "Company Code", value: fieldByLabel.get("Company Code")?.value ?? "", confidence: fieldByLabel.get("Company Code")?.confidence },
  ];
  const invoiceFields = [
    {
      label: "Invoice Number",
      value: fieldByLabel.get("Invoice Number")?.value ?? fieldByLabel.get("Advice Number")?.value ?? "",
      confidence: fieldByLabel.get("Invoice Number")?.confidence ?? fieldByLabel.get("Advice Number")?.confidence,
    },
    {
      label: "Invoice Date",
      value: fieldByLabel.get("Invoice Date")?.value ?? fieldByLabel.get("Settlement Date")?.value ?? "",
      confidence: fieldByLabel.get("Invoice Date")?.confidence ?? fieldByLabel.get("Settlement Date")?.confidence,
    },
    { label: "Posting Date", value: fieldByLabel.get("Posting Date")?.value ?? "", confidence: fieldByLabel.get("Posting Date")?.confidence },
    { label: "PO Number", value: fieldByLabel.get("PO Number")?.value ?? "", confidence: fieldByLabel.get("PO Number")?.confidence },
  ];
  const financialFields = [
    { label: "Currency", value: fieldByLabel.get("Currency")?.value ?? "", confidence: fieldByLabel.get("Currency")?.confidence },
    {
      label: "Net Amount",
      value: fieldByLabel.get("Net Amount")?.value ?? fieldByLabel.get("Paid Amount")?.value ?? fieldByLabel.get("Line Haul")?.value ?? "",
      confidence: fieldByLabel.get("Net Amount")?.confidence ?? fieldByLabel.get("Paid Amount")?.confidence ?? fieldByLabel.get("Line Haul")?.confidence,
    },
    { label: "Tax Amount", value: fieldByLabel.get("Tax Amount")?.value ?? "", confidence: fieldByLabel.get("Tax Amount")?.confidence },
    { label: "Gross Amount", value: fieldByLabel.get("Gross Amount")?.value ?? "", confidence: fieldByLabel.get("Gross Amount")?.confidence },
  ];

  const avgConf = Math.round(activeFields.reduce((s, f) => s + f.confidence, 0) / activeFields.length);

  return (
    <>
      <PageTopBar
        title="Process Document"
        subtitle="Upload, extract, review, validate, and post SAP documents"
        actions={
          uploadedFileName ? (
            <button
              type="button"
              onClick={handleReset}
              className="rounded-md border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-600 transition-colors hover:bg-gray-50"
            >
              New Invoice
            </button>
          ) : null
        }
      />

      <input
        ref={fileInputRef}
        type="file"
        accept=".pdf,.txt,.jpeg,.jpg,.png"
        className="hidden"
        onChange={handleFileChange}
        aria-label="File upload input"
      />

      <div className="flex flex-1 overflow-hidden">

        {/* ── Left panel: Stepper ── */}
        <aside className="flex w-52 flex-shrink-0 flex-col overflow-y-auto border-r border-gray-200 bg-white px-4 pb-6 pt-5">
          <div className="mb-4 text-[11px] font-semibold uppercase tracking-widest text-gray-400">
            Workflow
          </div>
          <Stepper steps={stages} states={stageStates} />

          {uploadedFileName && (
            <div className="mt-auto pt-4">
              <div className="rounded-lg border border-gray-200 bg-gray-50 p-3">
                <div className="text-[10px] font-semibold uppercase tracking-wide text-gray-400">
                  Document
                </div>
                <div className="mt-1 truncate text-xs font-medium text-gray-900">
                  {uploadedFileName}
                </div>
                {detectedType && (
                  <div className="mt-1">
                    <StatusBadge label={detectedType} tone="blue" />
                  </div>
                )}
              </div>
            </div>
          )}
        </aside>

        {/* ── Center panel: Working area ── */}
        <main className="flex flex-1 flex-col overflow-hidden bg-gray-50">
          <div className="border-b border-gray-200 bg-white px-6 py-4">
            <div className="max-w-7xl">
              <div className="text-sm font-semibold text-gray-900">
                Choose the SAP document type to process
              </div>
              <p className="mt-1 text-xs text-gray-500">
                The AI extraction engine will use type-specific prompts and field mappings.
              </p>
              <div className="mt-3 max-h-52 overflow-y-auto pr-1">
                <div className="grid gap-3 xl:grid-cols-5">
                  {documentTypeOptions.map((option) => {
                    const isActive = selectedType === option.type;
                    return (
                      <button
                        key={option.type}
                        type="button"
                        onClick={() => {
                          setSelectedType(option.type);
                          setDetectedType(null);
                        }}
                        className={`rounded-2xl border p-3 text-left transition-all ${
                          isActive
                            ? "border-blue-500 bg-blue-50 shadow-[0_8px_24px_rgba(29,78,216,0.12)]"
                            : "border-gray-200 bg-white hover:border-blue-200 hover:bg-gray-50"
                        }`}
                      >
                        <div className="text-sm font-semibold text-gray-900">{option.label}</div>
                        <div className="mt-1 font-mono text-[11px] text-gray-400">{option.sapCode}</div>
                        <p className="mt-2 text-[11px] leading-4 text-gray-500">{option.description}</p>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
          {renderCenterPanel()}
        </main>

        {/* ── Right panel: Extraction results ── */}
        <aside className="flex w-72 flex-shrink-0 flex-col overflow-hidden border-l border-gray-200 bg-white">
          {/* Panel header */}
          <div className="flex flex-shrink-0 items-center justify-between border-b border-gray-100 px-4 py-3">
            <div>
              <div className="text-xs font-semibold text-gray-900">Extraction Results</div>
              {isExtracted && (
                <div className="mt-0.5 text-[10px] text-gray-400">
                  Avg. confidence: {avgConf}%
                </div>
              )}
            </div>
            {isExtracted && (
              <StatusBadge
                label={avgConf >= 95 ? "High" : avgConf >= 85 ? "Medium" : "Low"}
                tone={avgConf >= 95 ? "success" : avgConf >= 85 ? "warning" : "error"}
                dot
              />
            )}
          </div>

          {/* Fields */}
          <div className="flex-1 overflow-y-auto px-4 py-4">
            {!isExtracted ? (
              <div className="flex h-full flex-col items-center justify-center py-8 text-center">
                <div className="mb-2 text-2xl">📄</div>
                <div className="text-xs font-medium text-gray-500">No extraction results yet</div>
                <div className="mt-1 text-[11px] text-gray-400">
                  {uploadedFileName ? 'Click "Run Extraction" to start' : "Upload an invoice first"}
                </div>
              </div>
            ) : (
              <div className="space-y-5">
                <FieldGroup
                  title="Vendor Information"
                  fields={vendorFields}
                  editable={currentStage === "review"}
                />
                <FieldGroup
                  title="Invoice Information"
                  fields={invoiceFields}
                  editable={currentStage === "review"}
                />
                <FieldGroup
                  title="Financial Information"
                  fields={financialFields}
                  editable={currentStage === "review"}
                />

                {/* Confidence legend */}
                <div className="rounded-lg border border-gray-100 bg-gray-50 p-3">
                  <div className="mb-2 text-[10px] font-semibold uppercase tracking-wide text-gray-400">
                    Confidence
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-[11px] text-gray-500">
                      <span className="rounded bg-green-50 px-1.5 py-0.5 text-[10px] font-semibold text-green-700">95%+</span>
                      High confidence
                    </div>
                    <div className="flex items-center gap-2 text-[11px] text-gray-500">
                      <span className="rounded bg-amber-50 px-1.5 py-0.5 text-[10px] font-semibold text-amber-700">85–94%</span>
                      Review recommended
                    </div>
                    <div className="flex items-center gap-2 text-[11px] text-gray-500">
                      <span className="rounded bg-red-50 px-1.5 py-0.5 text-[10px] font-semibold text-red-700">&lt;85%</span>
                      Correction required
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Action Bar */}
          <div className="flex-shrink-0 border-t border-gray-200 p-4">
            {uploadedFileName && !isPosted && (
              <div className="mb-2 text-[10px] text-gray-400">
                {!isExtracted && "Step 1 of 4: Run OCR extraction"}
                {isExtracted && !isReviewed && "Step 2 of 4: Review extracted fields"}
                {isReviewed && !isValidated && "Step 3 of 4: Validate against SAP"}
                {isValidated && !isPosted && "Step 4 of 4: Post invoice to SAP"}
              </div>
            )}
            <button
              type="button"
              id="workflow-cta"
              onClick={ctaOnClick}
              disabled={ctaIsDisabled}
              className={`w-full rounded-md px-4 py-2.5 text-sm font-medium transition-colors ${
                ctaIsDisabled
                  ? "cursor-not-allowed bg-gray-100 text-gray-400"
                  : ctaIsProminent
                    ? "bg-blue-700 text-white hover:bg-blue-800"
                    : "border border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
              }`}
            >
              {ctaLabel}
            </button>
            {uploadedFileName && !isPosted && (
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="mt-2 w-full rounded-md px-4 py-2 text-xs font-medium text-gray-400 transition-colors hover:text-gray-600"
              >
                Replace document
              </button>
            )}
          </div>
        </aside>
      </div>
    </>
  );
}

/* ─── Root Component ─────────────────────────────────────────────────────── */

export function OcrDashboard() {
  const [activeView, setActiveView] = useState<ViewMode>("dashboard");

  return (
    <AppShell activeView={activeView} onViewChange={setActiveView}>
      {activeView === "dashboard" ? <DashboardView /> : <ProcessView />}
    </AppShell>
  );
}
