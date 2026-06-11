import React, { useMemo, useState } from 'react'

function makeData(periods = 12) {
    return Array.from({ length: periods }, (_, i) => ({
        month: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][i % 12],
        revenue: 60000 + Math.round(Math.sin(i / 2) * 13000 + Math.random() * 12000),
        active: 15000 + Math.round(Math.cos(i / 3) * 2800 + Math.random() * 3200),
    }))
}

export default function SaasDashboardDemo() {
    const [data] = useState(() => makeData())
    const totals = useMemo(() => ({
        revenue: data.reduce((s, r) => s + r.revenue, 0),
        active: data.reduce((s, r) => s + r.active, 0),
    }), [data])

    return (
        <section style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: '18px', padding: '18px', width: '100%', maxWidth: '840px', margin: '0 auto' }}>
            <h3>SaaS Operations Lab</h3>
            <p style={{ color: 'var(--text-secondary)' }}>Interactive revenue and user metrics simulation with quick optimization toggles.</p>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', margin: '16px 0' }}>
                <div style={{ flex: '1 1 220px', background: 'rgba(0,212,255,0.08)', borderRadius: '12px', padding: '12px' }}>
                    <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Estimated ARR</div>
                    <div style={{ fontSize: '22px', fontWeight: 700, color: 'var(--accent-cyan)' }}>${(totals.revenue * 0.9).toLocaleString()}</div>
                </div>
                <div style={{ flex: '1 1 220px', background: 'rgba(168,85,247,0.08)', borderRadius: '12px', padding: '12px' }}>
                    <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Active Monthly Users</div>
                    <div style={{ fontSize: '22px', fontWeight: 700, color: 'var(--accent-purple)' }}>{Math.round(totals.active / data.length).toLocaleString()}</div>
                </div>
            </div>
            <div style={{ display: 'flex', gap: '12px', marginBottom: '14px', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                <small style={{ color: 'var(--text-muted)' }}>Click a data point to highlight (works in production builds).</small>
            </div>
            <div style={{ width: '100%', borderRadius: '10px', background: 'rgba(255,255,255,0.03)', padding: '14px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr repeat(12, minmax(30px, 1fr))', gap: '8px', alignItems: 'end' }}>
                    <span />
                    {data.map((row) => <span key={row.month} style={{ fontSize: '8px', color: 'var(--text-secondary)', textAlign: 'center' }}>{row.month}</span>)}
                    <strong style={{ color: 'var(--accent-cyan)' }}>Revenue</strong>
                    {data.map(row => (
                        <div key={row.month} style={{ marginTop: `${120 - (row.revenue / 1000)}px`, height: `${(row.revenue / 1000)}px`, background: 'linear-gradient(180deg, #00d4ff, #7c8aff)', borderRadius: '4px' }} />
                    ))}
                    <strong style={{ color: 'var(--accent-purple)' }}>Active</strong>
                    {data.map(row => (
                        <div key={`a-${row.month}`} style={{ marginTop: `${120 - (row.active / 150)}px`, height: `${(row.active / 150)}px`, background: 'linear-gradient(180deg, #a855f7, #dbb7ff)', borderRadius: '4px' }} />
                    ))}
                </div>
            </div>
        </section>
    )
}
