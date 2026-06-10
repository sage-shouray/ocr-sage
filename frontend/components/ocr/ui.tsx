"use client";

import { type ReactNode } from "react";

/* ─── Icons ──────────────────────────────────────────────────────────────── */

export function IconDashboard({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="1.5" y="1.5" width="5.5" height="5.5" rx="1.25" />
      <rect x="9" y="1.5" width="5.5" height="5.5" rx="1.25" />
      <rect x="1.5" y="9" width="5.5" height="5.5" rx="1.25" />
      <rect x="9" y="9" width="5.5" height="5.5" rx="1.25" />
    </svg>
  );
}

export function IconFileText({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9.5 1.5H3.75A1.25 1.25 0 002.5 2.75v10.5A1.25 1.25 0 003.75 14.5h8.5a1.25 1.25 0 001.25-1.25V6L9.5 1.5z" />
      <path d="M9.5 1.5V6H13.5" />
      <path d="M5.5 9.5h5M5.5 12h3" />
    </svg>
  );
}

export function IconList({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <path d="M2.5 4h11M2.5 8h11M2.5 12h7" />
    </svg>
  );
}

export function IconBarChart({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="1.5" y="7" width="3" height="7.5" rx="0.5" />
      <rect x="6.5" y="4" width="3" height="10.5" rx="0.5" />
      <rect x="11.5" y="1.5" width="3" height="13" rx="0.5" />
    </svg>
  );
}

export function IconSettings({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="8" cy="8" r="2.5" />
      <path d="M8 1.5v1.25M8 13.25V14.5M14.5 8h-1.25M2.75 8H1.5M12.45 3.55l-.88.88M4.43 11.57l-.88.88M12.45 12.45l-.88-.88M4.43 4.43l-.88-.88" />
    </svg>
  );
}

export function IconCheck({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 7l3.5 3.5L12 3" />
    </svg>
  );
}

export function IconX({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M3 3l8 8M11 3l-8 8" />
    </svg>
  );
}

export function IconAlertTriangle({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 1.5L1 12.5h12L7 1.5z" />
      <path d="M7 5.5v3.5M7 10.5h.01" />
    </svg>
  );
}

export function IconArrowUp({ size = 12 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 10V2M2.5 5.5L6 2l3.5 3.5" />
    </svg>
  );
}

export function IconArrowDown({ size = 12 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 2v8M2.5 6.5L6 10l3.5-3.5" />
    </svg>
  );
}

export function IconUpload({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 13v3a1 1 0 01-1 1H4a1 1 0 01-1-1v-3" />
      <path d="M13.5 6.5L10 3l-3.5 3.5" />
      <path d="M10 3v10" />
    </svg>
  );
}

export function IconRefresh({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12.5 7a5.5 5.5 0 11-1.1-3.3" />
      <path d="M12.5 2.5V5H10" />
    </svg>
  );
}

export function IconDownload({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 1.5V9.5M4 6.5L7 9.5l3-3" />
      <path d="M1.5 11.5h11" />
    </svg>
  );
}

export function IconCalendar({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="1.5" y="2.5" width="11" height="10" rx="1.25" />
      <path d="M1.5 6h11M4.5 1.5v2M9.5 1.5v2" />
    </svg>
  );
}

export function IconChevronDown({ size = 12 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2.5 4.5L6 8l3.5-3.5" />
    </svg>
  );
}

export function IconLogout({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 2H2.5A1 1 0 001.5 3v8a1 1 0 001 1H5M9.5 4.5L12 7l-2.5 2.5M12 7H5.5" />
    </svg>
  );
}

/* ─── Status Badge ───────────────────────────────────────────────────────── */

export type BadgeTone = "default" | "success" | "warning" | "error" | "info" | "blue";

const BADGE_STYLES: Record<BadgeTone, string> = {
  default: "bg-gray-100 text-gray-600 border-gray-200",
  success: "bg-green-50 text-green-700 border-green-200",
  warning: "bg-amber-50 text-amber-700 border-amber-200",
  error: "bg-red-50 text-red-700 border-red-200",
  info: "bg-sky-50 text-sky-700 border-sky-200",
  blue: "bg-blue-50 text-blue-700 border-blue-200",
};

const BADGE_DOT: Record<BadgeTone, string> = {
  default: "bg-gray-400",
  success: "bg-green-500",
  warning: "bg-amber-500",
  error: "bg-red-500",
  info: "bg-sky-500",
  blue: "bg-blue-500",
};

export function StatusBadge({
  label,
  tone = "default",
  dot = false,
}: {
  label: string;
  tone?: BadgeTone;
  dot?: boolean;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded border px-2 py-0.5 text-xs font-medium leading-none ${BADGE_STYLES[tone]}`}
    >
      {dot && <span className={`h-1.5 w-1.5 flex-shrink-0 rounded-full ${BADGE_DOT[tone]}`} />}
      {label}
    </span>
  );
}

/* ─── Section Card ───────────────────────────────────────────────────────── */

export function SectionCard({
  children,
  className = "",
  noPadding = false,
}: {
  children: ReactNode;
  className?: string;
  noPadding?: boolean;
}) {
  return (
    <div
      className={`rounded-2xl border border-gray-200 bg-white shadow-[0_1px_2px_rgba(15,23,42,0.04)] ${noPadding ? "" : "p-5"} ${className}`}
    >
      {children}
    </div>
  );
}

/* ─── KPI Card ───────────────────────────────────────────────────────────── */

export function KpiCard({
  label,
  value,
  delta,
  deltaDirection,
  deltaTone,
  detail,
}: {
  label: string;
  value: string;
  delta: string;
  deltaDirection: "up" | "down" | "neutral";
  deltaTone: "positive" | "negative" | "neutral";
  detail: string;
}) {
  const trendCls =
    deltaTone === "positive"
      ? "text-green-600"
      : deltaTone === "negative"
        ? "text-red-600"
        : "text-gray-500";

  return (
    <div className="rounded-2xl border border-gray-200 bg-white px-4 py-3.5 shadow-[0_1px_2px_rgba(15,23,42,0.04)]">
      <div className="text-xs font-medium uppercase tracking-wide text-gray-400">{label}</div>
      <div className="mt-1.5 text-[22px] font-semibold leading-none tracking-tight text-gray-900">
        {value}
      </div>
      <div className={`mt-2 flex items-center gap-1 text-xs font-medium ${trendCls}`}>
        {deltaDirection === "up" ? (
          <IconArrowUp size={11} />
        ) : deltaDirection === "down" ? (
          <IconArrowDown size={11} />
        ) : null}
        <span>{delta}</span>
        <span className="font-normal text-gray-400">{detail}</span>
      </div>
    </div>
  );
}

/* ─── Section Header ─────────────────────────────────────────────────────── */

export function SectionHeader({
  title,
  description,
  action,
}: {
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <div className="mb-4 flex items-start justify-between gap-4">
      <div>
        <div className="text-sm font-semibold text-gray-900">{title}</div>
        {description && <div className="mt-0.5 text-xs text-gray-500">{description}</div>}
      </div>
      {action && <div className="flex-shrink-0">{action}</div>}
    </div>
  );
}

/* ─── Divider ────────────────────────────────────────────────────────────── */

export function Divider({ className = "" }: { className?: string }) {
  return <div className={`border-t border-gray-200 ${className}`} />;
}

/* ─── Vertical Stepper ───────────────────────────────────────────────────── */

export type StepState = "done" | "active" | "upcoming" | "failed";

export function Stepper({
  steps,
  states,
}: {
  steps: { id: string; label: string; helper: string }[];
  states: Record<string, StepState>;
}) {
  return (
    <ol className="space-y-0">
      {steps.map((step, index) => {
        const state = states[step.id] ?? "upcoming";
        const isLast = index === steps.length - 1;

        return (
          <li key={step.id} className="relative flex gap-3">
            {/* Connector */}
            {!isLast && (
              <div
                className={`absolute left-[15px] top-8 w-px ${state === "done" ? "bg-blue-200" : "bg-gray-200"}`}
                style={{ height: "calc(100% - 20px)" }}
              />
            )}

            {/* Indicator */}
            <div className="relative z-10 mt-0.5 flex-shrink-0">
              {state === "done" ? (
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-700 text-white">
                  <IconCheck size={12} />
                </div>
              ) : state === "active" ? (
                <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-blue-700 bg-white">
                  <div className="h-2.5 w-2.5 rounded-full bg-blue-700" />
                </div>
              ) : state === "failed" ? (
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-red-50 text-red-600 border border-red-200">
                  <IconX size={12} />
                </div>
              ) : (
                <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-gray-200 bg-white">
                  <div className="h-2.5 w-2.5 rounded-full bg-gray-200" />
                </div>
              )}
            </div>

            {/* Text */}
            <div className="min-w-0 pb-6 pt-0.5">
              <div
                className={`text-sm font-medium leading-tight ${
                  state === "active"
                    ? "text-blue-700"
                    : state === "done"
                      ? "text-gray-900"
                      : state === "failed"
                        ? "text-red-600"
                        : "text-gray-400"
                }`}
              >
                {step.label}
              </div>
              <div className="mt-0.5 text-xs leading-relaxed text-gray-400">{step.helper}</div>
            </div>
          </li>
        );
      })}
    </ol>
  );
}

/* ─── Field Group ────────────────────────────────────────────────────────── */

export function FieldGroup({
  title,
  fields,
  editable = false,
}: {
  title: string;
  fields: { label: string; value: string; confidence?: number }[];
  editable?: boolean;
}) {
  return (
    <div>
      <div className="mb-2 px-0 text-[11px] font-semibold uppercase tracking-[0.16em] text-gray-400">
        {title}
      </div>
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
        {fields.map((field, i) => {
          const conf = field.confidence ?? 100;
          const confCls =
            conf >= 95
              ? "text-green-700 bg-green-50"
              : conf >= 85
                ? "text-amber-700 bg-amber-50"
                : "text-red-700 bg-red-50";
          const leftBorder = conf < 85 ? "border-l-2 border-l-red-400" : conf < 95 ? "border-l-2 border-l-amber-400" : "";

          return (
            <div
              key={field.label}
              className={`flex items-start justify-between gap-3 px-4 py-3 ${leftBorder} ${
                i < fields.length - 1 ? "border-b border-gray-100" : ""
              }`}
            >
              <div className="min-w-0 flex-1">
                <div className="text-[11px] font-medium uppercase tracking-wide text-gray-400">
                  {field.label}
                </div>
                {editable ? (
                  <input
                    defaultValue={field.value || "—"}
                    className="mt-0.5 w-full bg-transparent text-sm font-medium text-gray-900 focus:outline-none"
                    aria-label={field.label}
                  />
                ) : (
                  <div className="mt-0.5 truncate text-sm font-medium text-gray-900">
                    {field.value || "—"}
                  </div>
                )}
              </div>
              {field.confidence !== undefined && (
                <span
                  className={`mt-1 flex-shrink-0 rounded px-1.5 py-0.5 text-[10px] font-semibold ${confCls}`}
                >
                  {field.confidence}%
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ─── Validation Checklist ───────────────────────────────────────────────── */

export function ValidationChecklist({
  checks,
}: {
  checks: { name: string; status: "passed" | "warning" | "failed"; detail: string }[];
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
      {checks.map((check, i) => (
        <div
          key={check.name}
          className={`flex items-start gap-3 px-4 py-4 ${
            i < checks.length - 1 ? "border-b border-gray-100" : ""
          } ${check.status === "failed" ? "bg-red-50/40" : check.status === "warning" ? "bg-amber-50/40" : ""}`}
        >
          <div className="mt-0.5 flex-shrink-0">
            {check.status === "passed" ? (
              <div className="flex h-5 w-5 items-center justify-center rounded-full bg-green-100 text-green-700">
                <IconCheck size={11} />
              </div>
            ) : check.status === "warning" ? (
              <div className="flex h-5 w-5 items-center justify-center rounded-full bg-amber-100 text-amber-700">
                <IconAlertTriangle size={11} />
              </div>
            ) : (
              <div className="flex h-5 w-5 items-center justify-center rounded-full bg-red-100 text-red-700">
                <IconX size={11} />
              </div>
            )}
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-sm font-medium text-gray-900">{check.name}</div>
            <div className="mt-0.5 text-xs leading-relaxed text-gray-500">{check.detail}</div>
          </div>
          <div className="ml-auto flex-shrink-0">
            {check.status === "passed" ? (
              <StatusBadge label="Passed" tone="success" />
            ) : check.status === "warning" ? (
              <StatusBadge label="Warning" tone="warning" />
            ) : (
              <StatusBadge label="Failed" tone="error" />
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

/* ─── Empty State ────────────────────────────────────────────────────────── */

export function EmptyState({
  onOpenPicker,
  formats,
}: {
  onOpenPicker: () => void;
  formats: string[];
}) {
  return (
    <div className="flex h-full flex-col items-center justify-center p-8 text-center">
      <button
        type="button"
        onClick={onOpenPicker}
        className="group flex w-72 flex-col items-center rounded-xl border-2 border-dashed border-gray-200 bg-white px-8 py-10 transition-colors hover:border-blue-300 hover:bg-blue-50/30"
        id="upload-zone"
        aria-label="Upload invoice document"
      >
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl border border-gray-200 bg-gray-50 text-gray-400 transition-colors group-hover:border-blue-200 group-hover:bg-blue-50 group-hover:text-blue-600">
          <IconUpload size={20} />
        </div>
        <div className="text-sm font-semibold text-gray-900">Upload invoice document</div>
        <div className="mt-1 text-xs text-gray-500">Drag and drop or click to browse</div>
        <div className="mt-4 flex flex-wrap justify-center gap-1.5">
          {formats.map((f) => (
            <span key={f} className="rounded border border-gray-200 bg-gray-50 px-2 py-0.5 text-[10px] font-medium text-gray-500">
              {f}
            </span>
          ))}
        </div>
      </button>
      <p className="mt-4 max-w-xs text-xs text-gray-400">
        Supports vendor invoices, goods receipt invoices, payment advice, and freight bills
      </p>
    </div>
  );
}

/* ─── Page Top Bar ───────────────────────────────────────────────────────── */

export function PageTopBar({
  title,
  subtitle,
  actions,
}: {
  title: string;
  subtitle?: string;
  actions?: ReactNode;
}) {
  return (
    <header className="flex h-16 flex-shrink-0 items-center justify-between border-b border-gray-200/80 bg-white/95 px-6 backdrop-blur">
      <div className="flex items-center gap-3">
        <div>
          <h1 className="text-sm font-semibold tracking-wide text-gray-900">{title}</h1>
          {subtitle && <p className="text-xs text-gray-500">{subtitle}</p>}
        </div>
      </div>
      {actions && <div className="flex items-center gap-2">{actions}</div>}
    </header>
  );
}

/* ─── Sidebar ────────────────────────────────────────────────────────────── */

export type ViewMode = "dashboard" | "process";

const NAV_ITEMS: { id: ViewMode; label: string; icon: ReactNode }[] = [
  { id: "dashboard", label: "Dashboard", icon: <IconDashboard /> },
  { id: "process", label: "Process Document", icon: <IconFileText /> },
];

const STATIC_NAV = [
  { label: "Queue", icon: <IconList /> },
  { label: "Reports", icon: <IconBarChart /> },
  { label: "Settings", icon: <IconSettings /> },
];

function Sidebar({
  activeView,
  onViewChange,
}: {
  activeView: ViewMode;
  onViewChange: (v: ViewMode) => void;
}) {
  return (
    <aside className="flex w-56 flex-shrink-0 flex-col border-r border-gray-200 bg-white">
      {/* Logo */}
      <div className="flex h-16 flex-shrink-0 items-center border-b border-gray-200 bg-white px-3">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/sage-logo.png"
          alt="Sage Technologies"
          className="h-10 w-auto object-contain object-left"
          style={{ maxWidth: "180px" }}
        />
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-0.5 p-2 pt-3">
        <div className="mb-1.5 px-2 text-[10px] font-semibold uppercase tracking-widest text-gray-400">
          Workspace
        </div>
        {NAV_ITEMS.map((item) => {
          const isActive = activeView === item.id;
          return (
            <button
              key={item.id}
              id={`sidebar-nav-${item.id}`}
              type="button"
              onClick={() => onViewChange(item.id)}
              className={`flex w-full items-center gap-2.5 rounded-md px-2.5 py-2 text-sm font-medium transition-colors ${
                isActive
                  ? "bg-blue-50 text-blue-700"
                  : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
              }`}
            >
              <span className={`flex-shrink-0 ${isActive ? "text-blue-700" : "text-gray-400"}`}>
                {item.icon}
              </span>
              {item.label}
              {item.id === "process" && (
                <span className="ml-auto rounded bg-gray-100 px-1.5 py-0.5 text-[10px] font-medium text-gray-500">
                  New
                </span>
              )}
            </button>
          );
        })}

        <div className="mb-1.5 mt-4 px-2 text-[10px] font-semibold uppercase tracking-widest text-gray-400">
          Tools
        </div>
        {STATIC_NAV.map((item) => (
          <button
            key={item.label}
            type="button"
            className="flex w-full items-center gap-2.5 rounded-md px-2.5 py-2 text-sm font-medium text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-900"
          >
            <span className="flex-shrink-0 text-gray-400">{item.icon}</span>
            {item.label}
          </button>
        ))}
      </nav>

      {/* User footer */}
      <div className="border-t border-gray-200 p-3">
        <div className="flex items-center gap-2.5 rounded-md px-2 py-1.5 text-sm">
          <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 text-xs font-semibold text-blue-700">
            AP
          </div>
          <div className="min-w-0 flex-1">
            <div className="truncate text-xs font-medium text-gray-900">AP Analyst</div>
            <div className="truncate text-[10px] text-gray-400">Shared Services</div>
          </div>
        </div>
      </div>
    </aside>
  );
}

/* ─── App Shell ──────────────────────────────────────────────────────────── */

export function AppShell({
  activeView,
  onViewChange,
  children,
}: {
  activeView: ViewMode;
  onViewChange: (v: ViewMode) => void;
  children: ReactNode;
}) {
  return (
    <div className="flex h-screen overflow-hidden bg-[linear-gradient(180deg,#f8fafc_0%,#f1f5f9_100%)]">
      <Sidebar activeView={activeView} onViewChange={onViewChange} />
      <div className="flex flex-1 flex-col overflow-hidden">{children}</div>
    </div>
  );
}
