import { PROJECTS } from '../content/facts.ts';

function checkEvidence() {
  console.log('🔍 Checking evidence sources for all projects...');

  let totalEvidence = 0;
  let errors = 0;

  for (const project of PROJECTS) {
    if (project.draft) continue;

    if (!Array.isArray(project.evidence) || project.evidence.length === 0) {
      console.warn(`⚠️ Warning: Project "${project.title}" has no evidence items.`);
    }

    for (const item of project.evidence || []) {
      totalEvidence++;
      if (!item.source || typeof item.source !== 'string' || item.source.trim().length === 0) {
        console.error(`❌ Error in project "${project.title}": Evidence "${item.label}" is missing a source!`);
        errors++;
      } else {
        console.log(`✅ [${project.title}] Evidence verified: "${item.label}" -> "${item.value}" (source: ${item.source})`);
      }
    }
  }

  if (errors > 0) {
    console.error(`❌ Evidence source check failed with ${errors} violation(s). Every evidence item must have a non-empty source.`);
    process.exit(1);
  }

  console.log(`✅ Evidence check passed: ${totalEvidence} verified evidence items across all projects.`);
}

checkEvidence();
