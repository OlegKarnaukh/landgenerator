'use client';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { HelpCircle } from 'lucide-react';

interface Question {
  question: string;
  answer: string;
}

interface FAQData {
  title?: string;
  subtitle?: string;
  questions: Question[];
}

export function LocalFAQSection({ data }: { data: FAQData }) {
  return (
    <section className="py-20 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <HelpCircle className="w-8 h-8 text-blue-600" />
            </div>
            {data.title && (
              <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
                {data.title}
              </h2>
            )}
            {data.subtitle && (
              <p className="text-lg text-slate-600">{data.subtitle}</p>
            )}
          </div>

          {/* FAQ */}
          <Accordion type="single" className="space-y-3">
            {data.questions.map((item, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-white rounded-xl px-6 border border-slate-200"
              >
                <AccordionTrigger className="text-left font-semibold text-slate-800 hover:no-underline py-5">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-slate-600 pb-5">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
