import ScrollTop from "@/components/Buttons/ScrollTop";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQs|Surgical Instruments| Artema Medical",
  description: "FAQs section of Artema Medical, address common queries regarding our products, services, and policies to provide you with clear information.",
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
