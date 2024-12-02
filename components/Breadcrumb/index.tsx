import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { House } from "lucide-react";


export default function BreadcrumbComponent() {
  return (
    <Breadcrumb className="mx-[1rem] lg:mx-[5rem] lg:-mb-[2rem] lg:mt-[2rem] ">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/"><House className="h-4 w-4" /></BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="/components">Product</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="/components">Orthopedic</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Sleeves & Drill</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
