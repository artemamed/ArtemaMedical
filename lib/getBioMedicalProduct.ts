import { BioMedicalDetails } from "@/constant/BiomedicalEquipments";

export const FetchBioMedicalData = (productSlug: string) => {
  const results = BioMedicalDetails.filter(
    (EachProduct) => EachProduct.key == productSlug
  );
  return results[0];
};
