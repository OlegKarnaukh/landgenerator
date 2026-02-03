'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface FAQ {
  question: string;
  answer: string;
}

interface FAQData {
  title?: string;
  faqs?: FAQ[];
  questions?: FAQ[]; // Alternative field name from AI
}

export function FAQSection({ data }: { data: FAQData }) {
  // Support both 'faqs' and 'questions' field names
  const items = data.faqs || data.questions || [];

  return (
    <section className="py-20 md:py-28 bg-gray-50">
      <div className="container mx-auto px-4">
        {data.title && (
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              {data.title}
            </h2>
          </div>
        )}

        <div className="max-w-3xl mx-auto">
          {items.map((faq, index) => (
            <FAQItem key={index} faq={faq} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQItem({ faq }: { faq: FAQ }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-200">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-6 flex items-center justify-between text-left"
      >
        <span className="text-lg font-medium text-gray-900 pr-8">
          {faq.question}
        </span>
        <ChevronDown
          className={`h-5 w-5 text-gray-500 transition-transform ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      <div
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? 'max-h-96 pb-6' : 'max-h-0'
        }`}
      >
        <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
      </div>
    </div>
  );
}
