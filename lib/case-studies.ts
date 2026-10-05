export const CASE_STUDIES = [
  {
    slug: 'devguard-ai',
    title: 'DevGuard AI',
    summary: 'A GitHub review workflow that collects static-analysis, vulnerability, and test evidence before producing review output.',
    problem: 'LLM-only code review can produce plausible but unverifiable comments. The review flow needed evidence collection and bounded failure behavior.',
    constraints: ['GitHub webhook delivery must be verified.', 'External model providers can rate-limit or fail.', 'Review output must remain tied to repository evidence.'],
    architecture: 'GitHub Webhook -> HMAC Verification -> AST/CVE/Test Evidence -> Model Router -> Review Comment',
    dataModel: 'Repository events are associated with review runs; each run records collected evidence, provider attempts, and the resulting review output.',
    decisions: ['Use a capped tool-calling loop so provider behavior cannot create an unbounded run.', 'Keep a deterministic path available when model providers are unavailable.', 'Verify webhook signatures before processing repository events.'],
    failureModes: ['Invalid webhook signatures are rejected.', 'Provider limits use the next configured path.', 'Evidence collection failures are surfaced instead of silently treated as successful review.'],
    result: 'The project demonstrates an evidence-first review architecture with explicit provider fallback and bounded orchestration.',
    lessons: 'AI features become easier to reason about when the deterministic evidence boundary is designed before the model prompt.',
  },
  {
    slug: 'edumethod-ai',
    title: 'EduMethod AI',
    summary: 'A learning workspace combining persistent learner context, pgvector retrieval, verification, and spaced repetition workflows.',
    problem: 'A stateless assistant cannot preserve learner context, and ungrounded answers are difficult to audit against course material.',
    constraints: ['Learner state and document context need consistent persistence.', 'Retrieval should remain close to the application data model.', 'Study workflows need deterministic scheduling rules.'],
    architecture: 'Syllabus Input -> Structured Content -> PostgreSQL/pgvector -> Learner Memory -> Verification -> Study Schedule',
    dataModel: 'Learner profiles, source documents, embeddings, memory records, and review schedules are modeled as related application data.',
    decisions: ['Use pgvector alongside PostgreSQL to keep application and retrieval data within one database boundary.', 'Separate generated responses from verification state.', 'Use SM-2 scheduling logic for repeatable review intervals.'],
    failureModes: ['Missing source context should prevent a grounded answer from being implied.', 'Verification state remains distinct from the generated response.', 'Upload and retrieval steps can report failure independently.'],
    result: 'The project presents a data-centered approach to AI learning workflows rather than treating chat history as the product model.',
    lessons: 'Persistence and verification are product capabilities, not optional metadata added after the model integration.',
  },
  {
    slug: 'chronicle',
    title: 'Chronicle',
    summary: 'A two-service publishing platform combining server-rendered public pages, email-verified accounts, and schema-guarded Gemini AI writing tools.',
    problem: 'Publishing apps with AI features usually trust model output blindly and skip operational basics: verified accounts, transactional email, crawlable rendering, and migration-safe deploys.',
    constraints: ['Free-tier hosting requires resilient cold-start handling and boot-time migrations.', 'LLM structured outputs can be malformed and must be schema-validated before reaching the editor.', 'Transactional email delivery must not block or crash core HTTP request paths.'],
    architecture: 'Next.js (Vercel) -> REST + JWT -> Express API (Render) -> PostgreSQL (Prisma) + Gemini 2.5 + Brevo Email',
    dataModel: 'Relational schema modeling users, auth tokens, articles, tags, comments, notifications, and audit events with Prisma ORM on PostgreSQL.',
    decisions: ['Treat the LLM as an untrusted dependency with JSON mode, Zod validation, and uniform failure handling.', 'Execute Prisma migrations at server boot time before opening the port to prevent schema drift outages.', 'Handle transactional email as a non-blocking asynchronous side effect with backoff retries.'],
    failureModes: ['Malformed AI responses trigger a safe 503 fallback instead of breaking the editor state.', 'Failed database migrations abort startup cleanly to prevent runtime P2021/P2022 500 errors.', 'Unreachable email provider logs retry telemetry without blocking user HTTP requests.'],
    result: 'A production-grade, two-service publishing platform deployed across Vercel and Render with verified accounts, crawlable SEO, and schema-guarded AI assistance.',
    lessons: 'Backend reliability and strict boundary validation matter more than raw prompt complexity when building production software.',
  },
] as const

export function getCaseStudy(slug: string) {
  return CASE_STUDIES.find((study) => study.slug === slug)
}