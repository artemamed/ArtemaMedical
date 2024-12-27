import type { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Biomedical Devices| Surgical Instruments| Artema Medical",
  description:
    "Artema Medical is committed to improving patient outcomes and supporting healthcare by providing biomedical devices and surgical instruments.",
};

export default function BioMedicalLayout({
  children,
}: { 
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
