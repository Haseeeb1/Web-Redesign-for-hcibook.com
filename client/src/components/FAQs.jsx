import React from 'react'
import Path from './Path'

const FAQs = () => {
  return (
    <section className="flex flex-col items-center justify-center font-sub_heading pt-10 gap-10 p-10 md:p-10 dark:bg-slate-800 dark:text-darkModeTextClr">
      <div className="flex flex-col gap-6 md:w-1/2">
        <h1 className="text-4xl font-bold">FAQS</h1>
        <Path />
        
        <FAQAccordion />
      </div>
    </section>
  )
}

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"
  
import { faqs } from '@/data'

const FAQAccordion = () => {
    return(
        <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq) => (
                <AccordionItem value={faq.number}>
                <AccordionTrigger className="text-lg font-bold text-left">{faq.question}</AccordionTrigger>
                <AccordionContent className="text-base">{faq.answer}</AccordionContent>
                </AccordionItem>
            ))}
        </Accordion>
    )
}

export default FAQs