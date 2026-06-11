import React, { useState } from 'react'

export default function ContactPage() {
    const [form, setForm] = useState({ name: '', email: '', message: '' })
    const [status, setStatus] = useState('')

    const onSubmit = async e => {
        e.preventDefault()
        setStatus('Sending…')

        const response = await fetch('http://localhost:4000/api/contact', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(form),
        })

        if (response.ok) {
            setStatus('Message submitted. Thank you!')
            setForm({ name: '', email: '', message: '' })
        } else {
            const error = await response.json()
            setStatus(error.error || 'Submission failed')
        }
    }

    return (
        <section style={{ padding: '120px 24px', maxWidth: '680px', margin: '0 auto' }}>
            <h1>Contact</h1>
            <p>Connect on full-stack architecture, scalable systems, and platform engineering.</p>
            <form onSubmit={onSubmit} style={{ display: 'grid', gap: '1rem' }}>
                <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Name" required />
                <input value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="Email" required type="email" />
                <textarea value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} placeholder="Message" required rows={6} />
                <button type="submit">Send Message</button>
            </form>
            <p>{status}</p>
        </section>
    )
}
