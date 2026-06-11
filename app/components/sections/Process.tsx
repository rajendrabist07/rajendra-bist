import React from 'react'

export default function Process() {
  const columns = [
    { title: 'Do', items: ['Design new project layout', 'Write blog post draft'] },
    { title: 'Continue', items: ['Refactor ChatAgent', 'Polish project pages'] },
    { title: 'Uncomplete', items: ['Add tests', 'Deploy updates'] },
  ]

  return (
    <section className="py-16" id="process">
      <div className="mx-auto max-w-5xl px-6">
        <h2 className="mb-6 text-3xl font-semibold">Process</h2>
        <p className="mb-8 text-gray-300">My current workflow: things to do, continue, and uncomplete items.</p>

        <div className="grid gap-6 sm:grid-cols-3">
          {columns.map((col) => (
            <div key={col.title} className="rounded-lg border border-gray-800 bg-[#05050a] p-4">
              <h3 className="mb-3 text-xl font-medium">{col.title}</h3>
              <ul className="space-y-2">
                {col.items.map((it) => (
                  <li key={it} className="flex items-start gap-3">
                    <span className="mt-1 h-3 w-3 rounded-full bg-indigo-500" />
                    <span className="text-gray-200">{it}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
