export type CategoryId = 
  | 'rusticos'
  | 'acabado-fino'
  | 'porcelanato'
  | 'proyectos';

export interface Category {
  id: CategoryId;
  name: string;
  order: number;
  icon: string;
  tagline: string;
  image: string;
  itemCount: number;
  highlightText: string;
}

export interface Product {
  id: string;
  code: string;
  name: string;
  categoryId: CategoryId;
  categoryName: string;
  stoneType: string;
  finish: string;
  dimensions: string;
  weightApprox: string;
  cuttingTech: string;
  priceBs: number;
  isQuoteOnly?: boolean;
  image: string;
  description: string;
  badge?: string;
  inStock: boolean;
  features: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
  notes?: string;
}

export interface QuoteForm {
  fullName: string;
  phone: string;
  city: string;
  address: string;
  customNotes: string;
}
