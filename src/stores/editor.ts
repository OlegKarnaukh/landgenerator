'use client';

import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import type {
  Landing,
  LandingContent,
  LandingTheme,
  Section,
  SectionData,
  DEFAULT_THEME,
} from '@/types/landing';
import { generateId } from '@/lib/utils';

interface EditorState {
  // Current landing being edited
  landing: Landing | null;

  // UI State
  selectedSectionId: string | null;
  isPreviewMode: boolean;
  isSaving: boolean;
  hasUnsavedChanges: boolean;

  // History for undo/redo
  history: LandingContent[];
  historyIndex: number;

  // Actions
  setLanding: (landing: Landing) => void;
  updateLanding: (updates: Partial<Landing>) => void;

  // Section actions
  selectSection: (sectionId: string | null) => void;
  updateSection: (sectionId: string, data: Partial<SectionData>) => void;
  addSection: (type: Section['type'], afterSectionId?: string) => void;
  removeSection: (sectionId: string) => void;
  reorderSections: (sourceIndex: number, destinationIndex: number) => void;
  duplicateSection: (sectionId: string) => void;
  toggleSectionVisibility: (sectionId: string) => void;

  // Theme actions
  updateTheme: (updates: Partial<LandingTheme>) => void;

  // UI actions
  togglePreviewMode: () => void;
  setSaving: (isSaving: boolean) => void;
  markAsSaved: () => void;

  // History actions
  undo: () => void;
  redo: () => void;
  canUndo: () => boolean;
  canRedo: () => boolean;

  // Reset
  reset: () => void;
}

const DEFAULT_THEME_VALUES: LandingTheme = {
  primaryColor: '#3b82f6',
  secondaryColor: '#8b5cf6',
  backgroundColor: '#ffffff',
  textColor: '#1f2937',
  fontFamily: 'inter',
  borderRadius: 'md',
};

const initialState = {
  landing: null,
  selectedSectionId: null,
  isPreviewMode: false,
  isSaving: false,
  hasUnsavedChanges: false,
  history: [],
  historyIndex: -1,
};

export const useEditorStore = create<EditorState>()(
  immer((set, get) => ({
    ...initialState,

    setLanding: (landing) => {
      set((state) => {
        state.landing = landing;
        state.history = [landing.content];
        state.historyIndex = 0;
        state.hasUnsavedChanges = false;
        state.selectedSectionId = null;
      });
    },

    updateLanding: (updates) => {
      set((state) => {
        if (state.landing) {
          Object.assign(state.landing, updates);
          state.hasUnsavedChanges = true;
        }
      });
    },

    selectSection: (sectionId) => {
      set((state) => {
        state.selectedSectionId = sectionId;
      });
    },

    updateSection: (sectionId, data) => {
      set((state) => {
        if (!state.landing) return;

        const section = state.landing.content.sections.find((s) => s.id === sectionId);
        if (section) {
          Object.assign(section.data, data);
          state.hasUnsavedChanges = true;
          // Add to history
          pushHistory(state);
        }
      });
    },

    addSection: (type, afterSectionId) => {
      set((state) => {
        if (!state.landing) return;

        const newSection: Section = {
          id: generateId(),
          type,
          order: state.landing.content.sections.length,
          visible: true,
          data: getDefaultSectionData(type),
        };

        if (afterSectionId) {
          const index = state.landing.content.sections.findIndex(
            (s) => s.id === afterSectionId
          );
          if (index !== -1) {
            state.landing.content.sections.splice(index + 1, 0, newSection);
          } else {
            state.landing.content.sections.push(newSection);
          }
        } else {
          state.landing.content.sections.push(newSection);
        }

        // Reorder
        state.landing.content.sections.forEach((s, i) => {
          s.order = i;
        });

        state.hasUnsavedChanges = true;
        state.selectedSectionId = newSection.id;
        pushHistory(state);
      });
    },

    removeSection: (sectionId) => {
      set((state) => {
        if (!state.landing) return;

        state.landing.content.sections = state.landing.content.sections.filter(
          (s) => s.id !== sectionId
        );

        // Reorder
        state.landing.content.sections.forEach((s, i) => {
          s.order = i;
        });

        if (state.selectedSectionId === sectionId) {
          state.selectedSectionId = null;
        }

        state.hasUnsavedChanges = true;
        pushHistory(state);
      });
    },

    reorderSections: (sourceIndex, destinationIndex) => {
      set((state) => {
        if (!state.landing) return;

        const sections = state.landing.content.sections;
        const [removed] = sections.splice(sourceIndex, 1);
        sections.splice(destinationIndex, 0, removed);

        // Update order
        sections.forEach((s, i) => {
          s.order = i;
        });

        state.hasUnsavedChanges = true;
        pushHistory(state);
      });
    },

    duplicateSection: (sectionId) => {
      set((state) => {
        if (!state.landing) return;

        const section = state.landing.content.sections.find((s) => s.id === sectionId);
        if (!section) return;

        const duplicated: Section = {
          ...JSON.parse(JSON.stringify(section)),
          id: generateId(),
        };

        const index = state.landing.content.sections.findIndex(
          (s) => s.id === sectionId
        );
        state.landing.content.sections.splice(index + 1, 0, duplicated);

        // Reorder
        state.landing.content.sections.forEach((s, i) => {
          s.order = i;
        });

        state.hasUnsavedChanges = true;
        state.selectedSectionId = duplicated.id;
        pushHistory(state);
      });
    },

    toggleSectionVisibility: (sectionId) => {
      set((state) => {
        if (!state.landing) return;

        const section = state.landing.content.sections.find((s) => s.id === sectionId);
        if (section) {
          section.visible = !section.visible;
          state.hasUnsavedChanges = true;
        }
      });
    },

    updateTheme: (updates) => {
      set((state) => {
        if (state.landing) {
          state.landing.theme = { ...state.landing.theme, ...updates };
          state.hasUnsavedChanges = true;
        }
      });
    },

    togglePreviewMode: () => {
      set((state) => {
        state.isPreviewMode = !state.isPreviewMode;
        if (state.isPreviewMode) {
          state.selectedSectionId = null;
        }
      });
    },

    setSaving: (isSaving) => {
      set((state) => {
        state.isSaving = isSaving;
      });
    },

    markAsSaved: () => {
      set((state) => {
        state.hasUnsavedChanges = false;
      });
    },

    undo: () => {
      set((state) => {
        if (state.historyIndex > 0 && state.landing) {
          state.historyIndex--;
          state.landing.content = JSON.parse(
            JSON.stringify(state.history[state.historyIndex])
          );
          state.hasUnsavedChanges = true;
        }
      });
    },

    redo: () => {
      set((state) => {
        if (state.historyIndex < state.history.length - 1 && state.landing) {
          state.historyIndex++;
          state.landing.content = JSON.parse(
            JSON.stringify(state.history[state.historyIndex])
          );
          state.hasUnsavedChanges = true;
        }
      });
    },

    canUndo: () => get().historyIndex > 0,
    canRedo: () => get().historyIndex < get().history.length - 1,

    reset: () => {
      set(initialState);
    },
  }))
);

// Helper to push current state to history
function pushHistory(state: EditorState) {
  if (!state.landing) return;

  // Remove future history if we're not at the end
  state.history = state.history.slice(0, state.historyIndex + 1);

  // Add current content
  state.history.push(JSON.parse(JSON.stringify(state.landing.content)));
  state.historyIndex = state.history.length - 1;

  // Limit history size
  if (state.history.length > 50) {
    state.history = state.history.slice(-50);
    state.historyIndex = state.history.length - 1;
  }
}

// Default section data for new sections
function getDefaultSectionData(type: Section['type']): SectionData {
  const defaults: Record<Section['type'], SectionData> = {
    hero: {
      type: 'hero',
      headline: 'Your Headline Here',
      subheadline: 'Add a compelling subheadline that explains your value proposition',
      ctaText: 'Get Started',
      ctaUrl: '#signup',
      layout: 'split',
    },
    features: {
      type: 'features',
      title: 'Features',
      subtitle: 'Everything you need',
      features: [
        {
          id: generateId(),
          icon: 'Zap',
          title: 'Feature One',
          description: 'Describe this feature',
        },
        {
          id: generateId(),
          icon: 'Shield',
          title: 'Feature Two',
          description: 'Describe this feature',
        },
        {
          id: generateId(),
          icon: 'Rocket',
          title: 'Feature Three',
          description: 'Describe this feature',
        },
      ],
      layout: 'grid',
    },
    testimonials: {
      type: 'testimonials',
      title: 'What Our Customers Say',
      testimonials: [
        {
          id: generateId(),
          quote: 'This product changed everything for us.',
          author: 'John Doe',
          role: 'CEO',
          company: 'Acme Inc',
          rating: 5,
        },
      ],
      layout: 'grid',
    },
    pricing: {
      type: 'pricing',
      title: 'Simple Pricing',
      subtitle: 'Choose the plan that works for you',
      plans: [
        {
          id: generateId(),
          name: 'Starter',
          price: 9,
          currency: 'USD',
          features: ['Feature 1', 'Feature 2'],
          ctaText: 'Get Started',
          ctaUrl: '#signup',
        },
        {
          id: generateId(),
          name: 'Pro',
          price: 29,
          currency: 'USD',
          features: ['Everything in Starter', 'Feature 3', 'Feature 4'],
          highlighted: true,
          ctaText: 'Get Started',
          ctaUrl: '#signup',
        },
      ],
      billingPeriod: 'monthly',
    },
    cta: {
      type: 'cta',
      headline: 'Ready to get started?',
      subheadline: 'Join thousands of happy customers today.',
      ctaText: 'Start Free Trial',
      ctaUrl: '#signup',
      style: 'gradient',
    },
    faq: {
      type: 'faq',
      title: 'Frequently Asked Questions',
      faqs: [
        {
          id: generateId(),
          question: 'How does it work?',
          answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        },
      ],
    },
    gallery: {
      type: 'gallery',
      title: 'Gallery',
      images: [],
      layout: 'grid',
    },
    stats: {
      type: 'stats',
      title: 'By the Numbers',
      stats: [
        { id: generateId(), value: '10K+', label: 'Users' },
        { id: generateId(), value: '99%', label: 'Satisfaction' },
        { id: generateId(), value: '24/7', label: 'Support' },
      ],
      style: 'simple',
    },
    team: {
      type: 'team',
      title: 'Our Team',
      members: [],
    },
    contact: {
      type: 'contact',
      title: 'Contact Us',
      showForm: true,
      formFields: [
        { id: generateId(), type: 'text', label: 'Name', required: true },
        { id: generateId(), type: 'email', label: 'Email', required: true },
        { id: generateId(), type: 'textarea', label: 'Message', required: true },
      ],
    },
  };

  return defaults[type];
}
