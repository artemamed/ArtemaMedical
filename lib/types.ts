export interface Attribute {
    size: number;
    sku: string;
    price: number;
    image: string;
  }
  
  export interface Product {
    slug: string;
    name: string;
    title: string;
    description: string;
    attributes: Attribute[];
  }
  
  export interface SubCategory {
    name: string;
    slug: string;
    metadata: unknown[];
  }  
  export interface ProductResponse {
    subCategory: SubCategory;
    products: Product[];
  }
  
  