import { SOVEREIGN_PROJECT } from './sovereign';
import { DEVGUARD_PROJECT } from './devguard-ai';
import { CHRONICLE_PROJECT } from './chronicle';
import { CaseFileProject } from './types';

export * from './types';
export { SOVEREIGN_PROJECT } from './sovereign';
export { DEVGUARD_PROJECT } from './devguard-ai';
export { CHRONICLE_PROJECT } from './chronicle';

export const CASE_FILES: CaseFileProject[] = [
  SOVEREIGN_PROJECT, // Sovereign leads and is visibly larger
  DEVGUARD_PROJECT,
  CHRONICLE_PROJECT,
];

export function getProjectBySlug(slug: string): CaseFileProject | undefined {
  return CASE_FILES.find((p) => p.slug === slug);
}
