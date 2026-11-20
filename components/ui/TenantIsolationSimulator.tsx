"use client";

import React, { useState } from "react";
import { Shield } from "lucide-react";

type Tenant = "org_alpha" | "org_beta";

interface Row {
  id: string;
  tenant_id: Tenant;
  record_name: string;
  classification: "Restricted" | "Confidential";
}

const ALL_DATABASE_ROWS: Row[] = [
  { id: "rec_101", tenant_id: "org_alpha", record_name: "Q4 Customer Agent Config", classification: "Confidential" },
  { id: "rec_102", tenant_id: "org_alpha", record_name: "Alpha Inngest Webhook Secret", classification: "Restricted" },
  { id: "rec_201", tenant_id: "org_beta", record_name: "Support Automation Pipeline", classification: "Confidential" },
  { id: "rec_202", tenant_id: "org_beta", record_name: "Beta Enterprise Workflow Runs", classification: "Restricted" },
];

export default function TenantIsolationSimulator() {
  const [activeTenant, setActiveTenant] = useState<Tenant>("org_alpha");

  const visibleRows = ALL_DATABASE_ROWS.filter(
    (row) => row.tenant_id === activeTenant
  );

  return (
    <div className="rounded-[--radius-feature] border border-[--border-strong] bg-[--bg-surface-2] p-5 sm:p-6 font-mono text-xs">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[--border-hairline] pb-4">
        <div className="flex items-center gap-2 text-[--text-primary]">
          <Shield size={16} className="text-[--status-live]" />
          <span className="font-bold tracking-tight">PostgreSQL Row-Level Security (RLS) Simulator</span>
        </div>
        <span className="rounded-[--radius-pill] border border-[--border-hairline] bg-[--bg-surface-3] px-2.5 py-0.5 text-[10px] text-[--text-tertiary]">
          Illustrative simulation
        </span>
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <span className="text-[--text-secondary]">Active Tenant Session:</span>
        <div
          role="group"
          aria-label="Select active tenant session"
          className="inline-flex rounded-[--radius-control] border border-[--border-hairline] bg-[--bg-surface-1] p-1"
        >
          <button
            type="button"
            aria-pressed={activeTenant === "org_alpha"}
            onClick={() => setActiveTenant("org_alpha")}
            className={`rounded-[--radius-control] px-3 py-1 text-xs font-semibold transition-colors motion-reduce:transition-none cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[--focus-ring] ${
              activeTenant === "org_alpha"
                ? "bg-[--accent] text-[--accent-ink]"
                : "text-[--text-secondary] hover:text-[--text-primary]"
            }`}
          >
            Tenant: org_alpha
          </button>
          <button
            type="button"
            aria-pressed={activeTenant === "org_beta"}
            onClick={() => setActiveTenant("org_beta")}
            className={`rounded-[--radius-control] px-3 py-1 text-xs font-semibold transition-colors motion-reduce:transition-none cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[--focus-ring] ${
              activeTenant === "org_beta"
                ? "bg-[--accent] text-[--accent-ink]"
                : "text-[--text-secondary] hover:text-[--text-primary]"
            }`}
          >
            Tenant: org_beta
          </button>
        </div>
      </div>

      <div className="mt-4 rounded-[--radius-card] border border-[--border-hairline] bg-[--bg-surface-1] p-3 text-[11px] text-[--text-tertiary]">
        <code>
          SELECT * FROM workflow_records WHERE tenant_id = current_setting(&apos;app.current_tenant_id&apos;);
        </code>
      </div>

      <div className="mt-4 overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-[--border-hairline] text-[10px] text-[--text-tertiary] uppercase">
              <th className="py-2 px-3">Record ID</th>
              <th className="py-2 px-3">Tenant Boundary</th>
              <th className="py-2 px-3">Workflow Asset</th>
              <th className="py-2 px-3">Isolation Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[--border-hairline]/50">
            {visibleRows.map((row) => (
              <tr key={row.id} className="text-[11px]">
                <td className="py-2.5 px-3 text-[--text-primary] font-medium">{row.id}</td>
                <td className="py-2.5 px-3 text-[--status-live]">{row.tenant_id}</td>
                <td className="py-2.5 px-3 text-[--text-secondary]">{row.record_name}</td>
                <td className="py-2.5 px-3">
                  <span className="inline-flex items-center gap-1 text-[10px] text-[--status-live]">
                    <span className="h-1.5 w-1.5 rounded-full bg-[--status-live]" />
                    RLS Enforced
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="mt-4 text-[11px] leading-relaxed text-[--text-tertiary]">
        Cross-tenant queries are blocked at the database engine level. Switching the active tenant session recalculates the query filter mathematically without relying on application WHERE clauses.
      </p>
    </div>
  );
}
