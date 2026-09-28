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
    slug: 'socratic-ai',
    title: 'SocraticAI',
    summary: 'A guided learning assistant that uses constrained responses and saved sessions to reinforce reasoning instead of answer dumping.',
    problem: 'Direct answers can shorten a student’s path to a result while weakening their understanding of the underlying reasoning.',
    constraints: ['The assistant must preserve a guided interaction style.', 'Sessions need to survive across visits.', 'Model behavior remains probabilistic and needs explicit boundaries.'],
    architecture: 'Student Prompt -> Response Constraints -> Guided Model Response -> MongoDB Session History',
    dataModel: 'Sessions contain user prompts, assistant responses, and timestamps for continuity across interactions.',
    decisions: ['Use prompt constraints and a controlled temperature range as behavioral inputs, not guarantees.', 'Persist sessions in MongoDB for continuity.', 'Keep the interface focused on incremental questioning.'],
    failureModes: ['The model can still fail and must be treated as probabilistic.', 'Storage failures should not be represented as durable session success.', 'Out-of-scope questions are redirected to portfolio information.'],
    result: 'The project explores how interaction design and persistence can support guided learning with a general-purpose model.',
    lessons: 'A good AI product contract describes the desired behavior and its failure modes without claiming certainty the model cannot provide.',
  },
] as const

export function getCaseStudy(slug: string) {
  return CASE_STUDIES.find((study) => study.slug === slug)
}