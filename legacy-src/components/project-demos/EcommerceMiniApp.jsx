import React, { useMemo, useState } from 'react'

const catalog = [
    { id: 'p-1', name: 'Performance Monitor', price: 78.99 },
    { id: 'p-2', name: 'UX Designer Toolkit', price: 29.99 },
    { id: 'p-3', name: 'Microservice Runner', price: 140.50 },
    { id: 'p-4', name: 'Infra Automation', price: 199.00 },
]

export default function EcommerceMiniApp() {
    const [cart, setCart] = useState({})

    const total = useMemo(() => Object.entries(cart).reduce((sum, [id, qty]) => {
        const product = catalog.find(p => p.id === id)
        return product ? sum + product.price * qty : sum
    }, 0), [cart])

    return (
        <section style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: '18px', padding: '18px', width: '100%', maxWidth: '840px', margin: '0 auto' }}>
            <h3>Shop Micro-SaaS Toolkit</h3>
            <p style={{ color: 'var(--text-secondary)' }}>Working e-commerce micro-interaction: add to cart, remove, and checkout flow.</p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '14px' }}>
                <div style={{ display: 'grid', gap: '10px' }}>
                    {catalog.map(product => {
                        const quantity = cart[product.id] || 0
                        return (
                            <article key={product.id} style={{ padding: '12px', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', background: 'rgba(255,255,255,0.02)' }}>
                                <h4 style={{ margin: '0 0 8px' }}>{product.name}</h4>
                                <p style={{ color: 'var(--text-secondary)' }}>${product.price.toFixed(2)}</p>
                                <button onClick={() => setCart(prev => ({ ...prev, [product.id]: (prev[product.id] || 0) + 1 }))} style={{ color: 'white', background: 'var(--accent-purple)', border: 'none', borderRadius: '8px', padding: '6px 10px', cursor: 'pointer' }}>Add to cart</button>
                                {quantity > 0 && <span style={{ marginLeft: '8px', color: 'var(--text-accent)' }}>({quantity} in cart)</span>}
                            </article>
                        )
                    })}
                </div>

                <aside style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', padding: '12px' }}>
                    <h4>Cart</h4>
                    {Object.keys(cart).length === 0 ? (
                        <p style={{ color: 'var(--text-muted)' }}>Your cart is empty.</p>
                    ) : (
                        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                            {Object.entries(cart).map(([id, qty]) => {
                                const product = catalog.find(p => p.id === id)
                                return (
                                    <li key={id} style={{ marginBottom: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <span>{product.name} × {qty}</span>
                                        <span>${(product.price * qty).toFixed(2)}</span>
                                        <button onClick={() => setCart(prev => {
                                            const copy = { ...prev }
                                            delete copy[id]
                                            return copy
                                        })} style={{ border: 'none', background: 'transparent', cursor: 'pointer', color: 'var(--accent-cyan)' }}>✕</button>
                                    </li>
                                )
                            })}
                        </ul>
                    )}
                    <p style={{ fontWeight: '700' }}>Total: ${total.toFixed(2)}</p>
                    <button
                        disabled={total <= 0}
                        onClick={() => setCart({})}
                        style={{
                            width: '100%',
                            background: total > 0 ? 'var(--accent-cyan)' : 'rgba(255,255,255,0.12)',
                            color: total > 0 ? '#000' : 'var(--text-muted)',
                            border: 'none',
                            borderRadius: '8px',
                            padding: '8px',
                            cursor: total > 0 ? 'pointer' : 'not-allowed',
                        }}
                    >Checkout</button>
                </aside>
            </div>
        </section>
    )
}
