import ScrollTop from "@/components/Buttons/ScrollTop";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Certification| Medical Equipment| Artema Medical",
  description: "The Artema Medical Certification page highlights an unwavering commitment to medical equipment quality, safety and regulatory compliance.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <div>{children}</div>
      <div className="z-50 fixed bottom-5 right-5  ">
        <ScrollTop />
      </div>
    </div>
  );
}
