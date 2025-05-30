'use client';

import * as React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

// FAQ data
const faqData = [
  {
    question: 'How do I know which supplements are right for me?',
    answer: 'We recommend starting with our essential supplements like multivitamins and consulting with your healthcare provider. You can also contact our expert support team for personalized recommendations based on your health goals and needs.'
  },
  {
    question: 'Are your supplements third-party tested?',
    answer: 'Yes, all our supplements undergo rigorous third-party testing for quality, purity, and potency. We partner with independent laboratories to ensure our products meet the highest standards of quality and safety.'
  },
  {
    question: 'How long does shipping take?',
    answer: 'Domestic orders typically arrive within 3-5 business days. International shipping times vary by location. All orders are processed within 24 hours of purchase, and you will receive tracking information via email.'
  },
  {
    question: 'What is your return policy?',
    answer: 'We offer a 30-day money-back guarantee on all our products. If you are not completely satisfied, you can return the unused portion for a full refund, minus shipping costs.'
  },
  {
    question: 'Are your supplements suitable for vegetarians/vegans?',
    answer: 'Many of our supplements are vegetarian and vegan-friendly. Each product page clearly indicates dietary compatibility. Look for the vegetarian/vegan icon or check the product description for details.'
  },
  {
    question: 'Do you offer international shipping?',
    answer: 'Yes, we ship to most countries worldwide. International shipping rates and delivery times vary by location. You can see exact shipping costs at checkout.'
  }
];

export default function FAQ() {
  return (
    <section className="bg-background py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqData.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent>
                  <p className="text-muted-foreground">{faq.answer}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
} 