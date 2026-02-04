'use client';

import { SaasTemplate } from './saas';
import { LifestyleTemplate } from './lifestyle';
import { LocalTemplate } from './local';
import { TemplateId, detectTemplate } from './types';

interface Section {
  id: string;
  type: string;
  order?: number;
  data: Record<string, any>;
}

interface LandingData {
  template?: TemplateId;
  title?: string;
  sections: Section[];
  description?: string; // Used to auto-detect template
}

interface TemplateRendererProps {
  data: LandingData;
}

// Template components map
const TEMPLATES: Record<TemplateId, React.ComponentType<{ sections: Section[] }>> = {
  saas: SaasTemplate,
  lifestyle: LifestyleTemplate,
  local: LocalTemplate,
  corporate: LocalTemplate, // Fallback to local for now
  creative: SaasTemplate,   // Fallback to saas for now
};

export function TemplateRenderer({ data }: TemplateRendererProps) {
  // Determine which template to use
  let templateId: TemplateId = data.template || 'local';

  // If no template specified but we have a description, auto-detect
  if (!data.template && data.description) {
    templateId = detectTemplate(data.description);
  }

  // Get the template component
  const TemplateComponent = TEMPLATES[templateId] || LocalTemplate;

  // Sort sections by order
  const sortedSections = [...data.sections].sort((a, b) =>
    (a.order || 0) - (b.order || 0)
  );

  return <TemplateComponent sections={sortedSections} />;
}

export { detectTemplate };
