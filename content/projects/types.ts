export type NodeType = 'client' | 'service' | 'database' | 'ai' | 'queue' | 'auth';

export interface ArchitectureNode {
  id: string;
  label: string;
  sublabel: string;
  type: NodeType;
  tooltip: string;
  x: number; // percentage 0-100
  y: number; // percentage 0-100
}

export interface ArchitectureEdge {
  from: string;
  to: string;
  label?: string;
  dashed?: boolean;
}

export interface CaseFileEvidence {
  label: string;
  value: string;
  source: string;
  verifiedOn: string;
}

export interface CaseFileProject {
  slug: string;
  title: string;
  status: 'Live' | 'In Development';
  timeframe?: string;
  isLead?: boolean; // Sovereign leads and is visibly larger
  headline: string;
  builtBullets: [string, string, string]; // exactly 3 bullets
  decision: {
    title: string;
    description: string;
    tradeoff: string;
  };
  frontendNote?: {
    summary: string;
    filePath: string;
  };
  evidence: CaseFileEvidence[];
  links: {
    live: string;
    code: string;
    caseStudy: string;
  };
  stack: string[];
  summary?: string;
  problem?: string;
  constraints?: string[];
  whatNext?: string[];
  screenshot: {
    desktopWebp: string;
    desktopAvif: string;
    mobileWebp: string;
    mobileAvif: string;
    alt: string;
  };
  architecture: {
    title: string;
    flowDescription: string;
    nodes: ArchitectureNode[];
    edges: ArchitectureEdge[];
    requestPath: string[]; // for <ol> screen reader alternative
  };
}
