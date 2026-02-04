'use client';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

interface Question {
  question: string;
  answer: string;
}

interface FAQData {
  title?: string;
  subtitle?: string;
  questions: Question[];
}

export function SaasFAQSection({ data }: { data: FAQData }) {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            {data.title && (
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                {data.title}
              </h2>
            )}
            {data.subtitle && (
              <p className="text-xl text-muted-foreground">{data.subtitle}</p>
            )}
          </div>

          {/* FAQ Accordion */}
          <Accordion type="single" className="space-y-4">
            {data.questions.map((item, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-muted/50 rounded-xl px-6 border-0"
              >
                <AccordionTrigger className="text-left font-semibold hover:no-underline py-5">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-5">
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
