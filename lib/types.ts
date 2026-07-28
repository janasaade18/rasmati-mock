// lib/types.ts
// Shape confirmed directly from GET /api/products on the live backend.

export interface Product {
    id: string;
    name: string;
    sku: string | null;
    slug: string;
    price: number;
    compareAtPrice: number | null;
    currency: string;
    inStock: boolean;
    stockQuantity: number;
    images: string[];
    category: string | null;
    categoryName: string | null;
    description: string;
    brand: string | null;
    brandName: string | null;
    collection: string | null;
    collectionName: string | null;
    color: string | null;
    specifications: Record<string, unknown>;
    dimensions: {
      length: number;
      width: number;
      height: number | null;
      unit: string;
    } | null;
    isFeatured: boolean;
    isBestseller: boolean;
    createdAt: string;
    updatedAt: string;
  }
  
  export interface ProductsResponse {
    success: boolean;
    data: {
      products: Product[];
      pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
        hasMore: boolean;
      };
    };
  }