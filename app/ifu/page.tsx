import { Button } from "@/components/ui/button";
import LayoutWrapper from "@/components/Wrapper/LayoutWrapper";
import { FileText, ScrollText } from "lucide-react";
import React from "react";

interface GuidelineCardProps {
  title: string;
  description: string;
  pdfLink: string;
}

const GuidelineCard: React.FC<GuidelineCardProps> = ({
  title,
  description,
}) => {
  return (
    <div className="bg-white shadow-md rounded-xl p-6 space-y-4 flex flex-col min-h-[250px] sm:min-h-[300px] mb-5">
      <div className="text-[#666666] text-sm flex ml-auto justify-end -mb-3">
        <span className="mr-1">
          <ScrollText className="h-4 w-4" />
        </span>
        User Essentials
      </div>
      <h3 className="text-lg lg:text-xl font-semibold text-[#004040]">{title}</h3>
      <p className="text-sm lg:text-base text-[#666666] flex-grow">{description}</p>
      <div className="mt-auto">
        <Button variant="secondary" className="relative">
          View PDF
          <FileText className="h-4 w-4 ml-1" />
        </Button>
      </div>
    </div>
  );
};

const Ifu = () => {
  const guidelines = [
    {
      title: "Artema Instruments Care & Cleaning Instructions",
      description:
        "Provide essential guidelines for properly maintaining and cleaning your instruments to ensure optimal performance and longevity.",
      pdfLink: "#",
    },
    {
      title: "Recommendations for Decontamination and Sterilization",
      description:
        "Provide essential guidelines for properly maintaining your instruments.",
      pdfLink: "#",
    },
    {
      title: "Medical Spinal Punches",
      description:
        "Provide essential guidelines for properly maintaining and cleaning your instruments to ensure optimal performance and longevity.",
      pdfLink: "#",
    },
    {
      title: "Medical Reusable Instruments with Silicon Handles",
      description:
        "Provide essential guidelines for properly maintaining and cleaning your instruments to ensure optimal performance and longevity.",
      pdfLink: "#",
    },
    {
      title: "Medical Wire Guides With Extension",
      description:
        "Provide essential guidelines for properly maintaining and cleaning your instruments to ensure optimal performance and longevity.",
      pdfLink: "#",
    },
    {
      title: "Surgical Reusable Instruments",
      description:
        "Provide essential guidelines for properly maintaining and cleaning your instruments to ensure optimal performance and longevity.",
      pdfLink: "#",
    },
  ];

  return (
    <LayoutWrapper className="min-h-screen pb-[5rem]">
      <h1 className="text-2xl md:text-3xl lg:text-5xl font-semibold mb-6 text-center mt-[1rem] text-[#004040] md:py-[2rem]">
        User Guidelines
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-16 mt-[2rem]">
        {guidelines.map((guideline, index) => (
          <GuidelineCard
            key={index}
            title={guideline.title}
            description={guideline.description}
            pdfLink={guideline.pdfLink}
          />
        ))}
      </div>
    </LayoutWrapper>
  );
};

export default Ifu;
