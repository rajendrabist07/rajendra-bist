"use client";

import React, { useState } from "react";
import { Shield, Database, Users } from "lucide-react";

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
    <div className="rounded-2xl border border-[--border-strong] bg-[--bg-surface-2] p-5 sm:p-6 font-mono text-xs">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[--border-subtle] pb-4">
        <div className="flex items-center gap-2 text-[--text-primary]">
          <Shield size={16} className="text-[#34D8B0]" />
          <span className="font-bold tracking-tight">PostgreSQL Row-Level Security (RLS) Simulator</span>
        </div>
        <span className="rounded-full border border-[--border-subtle] bg-white/[0.03] px-2.5 py-0.5 text-[10px] text-[--text-tertiary]">
          Illustrative Simulation
        </span>
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <span className="text-[--text-secondary]">Active Tenant Session:</span>
        <div className="inline-flex rounded-lg border border-[--border-subtle] bg-[--bg-surface] p-1">
          <button
            type="button"
            onClick={() => setActiveTenant("org_alpha")}
            className={`rounded-md px-3 py-1 text-xs font-semibold transition-colors cursor-pointer ${
              activeTenant === "org_alpha"
                ? "bg-[#FF7A33] text-[#050608]"
                : "text-[--text-secondary] hover:text-[--text-primary]"
            }`}
          >
            Tenant: org_alpha
          </button>
          <button
            type="button"
            onClick={() => setActiveTenant("org_beta")}
            className={`rounded-md px-3 py-1 text-xs font-semibold transition-colors cursor-pointer ${
              activeTenant === "org_beta"
                ? "bg-[#FF7A33] text-[#050608]"
                : "text-[--text-secondary] hover:text-[--text-primary]"
            }`}
          >
            Tenant: org_beta
          </button>
        </div>
      </div>

      <div className="mt-4 rounded-xl border border-[--border-subtle] bg-[--bg-surface] p-3 text-[11px] text-[--text-tertiary]">
        <code>
          SELECT * FROM workflow_records WHERE tenant_id = current_setting(&apos;app.current_tenant_id&apos;);
        </code>
      </div>

      <div className="mt-4 overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-[--border-subtle] text-[10px] text-[--text-tertiary] uppercase">
              <th className="py-2 px-3">Record ID</th>
              <th className="py-2 px-3">Tenant Boundary</th>
              <th className="py-2 px-3">Workflow Asset</th>
              <th className="py-2 px-3">Isolation Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[--border-subtle]/50">
            {visibleRows.map((row) => (
              <tr key={row.id} className="text-[11px]">
                <td className="py-2.5 px-3 text-[--text-primary] font-medium">{row.id}</td>
                <td className="py-2.5 px-3 text-[#34D8B0]">{row.tenant_id}</td>
                <td className="py-2.5 px-3 text-[--text-secondary]">{row.record_name}</td>
                <td className="py-2.5 px-3">
                  <span className="inline-flex items-center gap-1 text-[10px] text-[#34D8B0]">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#34D8B0]" />
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
