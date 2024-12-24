"use client";

import { Button } from '@/components/ui/button'
import LayoutWrapper from '@/components/Wrapper/LayoutWrapper'
import Image from 'next/image'
import React from 'react'
import image from "@/public/assets/faqs.png"
import { useState } from 'react';
import Link from 'next/link';

const faqs = [
  {
    question: 'Does Artema provide any shipping services to its customers?',
    answer: 'Yes, Artema provides shipping services, but only upon the customer’s request with extra charges.',
  },
  {
    question: 'Is Artema responsible for any damage to the instrument?',
    answer: 'Yes, but only if the damage occurred within the company during manufacturing or final packaging. Once the instrument is dispatched, the company is not responsible. In both cases, the customer should provide proof of the claim.',
  },
  {
    question: 'Does the product price mentioned on the website include tax?',
    answer: 'Yes, tax is already included in the product description.',
  }, {
    question: 'Does Artema accept payments for the products only through a bank?',
    answer: 'Yes, the company only accepts payments officially made through the bank. Cash payments are not accepted in any condition.',
  }, {
    question: 'Does the company take responsibility for the loss in case of any disaster?',
    answer: 'Yes, the company should take responsibility for any loss, but only if it is the cause of the disaster. Otherwise, for all the social or natural circumstances that are beyond the control of the company, the customer should take responsibility.',
  }, {
    question: 'For how many days can the customer apply for a refund?',
    answer: 'A customer can apply for a refund within three working days, provided it is not against the company policy.',
  }, {
    question: 'Does the company provide services other than surgical instruments?',
    answer: 'Yes, the company also provides hospital furniture and physiotherapy instruments to its customers.',
  }
];

const Faqs = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (

    <LayoutWrapper className="min-h-screen pb-20">
      <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold mb-6 text-center mt-4 text-[#004040] md:py-8">
        Frequently Asked Questions
      </h2>
      <div className="flex flex-col md:flex-row md:px-6 lg:px-16 gap-2 md:gap-8">
        {/* Column for the Heading */}
        <div className="w-full md:w-1/3 flex flex-col items-center justify-center md:text-left">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-semibold leading-snug xl:leading-tight">
            Any Question? We Got You.
          </h2>


        </div>

        {/* Column for the FAQ Data */}
        <div className="w-full md:w-2/3 lg:px-4 space-y-6">
          {faqs.map((faq, index) => (
            <div key={index} className="border-b border-gray-200">
              <button
                className="flex justify-between items-center w-full py-3 text-left"
                onClick={() => toggleFAQ(index)}
              >
                <span className="text-base sm:text-lg font-medium text-gray-800">
                  {faq.question}
                </span>
                <span className="text-[#008080] text-lg sm:text-xl">
                  {openIndex === index ? '-' : '+'}
                </span>
              </button>
              {openIndex === index && faq.answer && (
                <p className="text-[#666666] text-sm sm:text-base mt-2 mb-2">{faq.answer}</p>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8">
        <div className="flex flex-col md:flex-row items-center justify-between rounded-xl shadow-lg bg-[#EDF8F833] p-4 md:p-6 lg:p-8">
          {/* Image Section */}
          <div className="w-full md:w-auto mb-6 md:mb-0 flex justify-center">
            <Image
              src={image}
              alt="Setroscope Icon"
              width={300}
              height={200}
              className="w-32 sm:w-40 md:w-48 xl:w-64 h-auto"
              priority
            />
          </div>

          {/* Content Section */}
          <div className="flex-1 text-center md:text-left md:ml-[4rem]">
            <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-5xl font-semibold text-teal-900">
              Still have a question?
            </h1>
            <p className="mt-2 text-gray-600 text-sm sm:text-base lg:max-w-lg">
              If you didn&apos;t find the answer you were looking for, feel free to reach out to our support team. We&apos;re here to help!
            </p>
            <Button className="mt-4 px-4 py-2 text-sm sm:text-base md:text-lg">
              <Link href="/contact" className="text-white">
                Contact Us
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </LayoutWrapper>

  )
}

export default Faqs